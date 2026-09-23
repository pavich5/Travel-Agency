import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { auth } from "@clerk/nextjs";
import { authConfigured } from "@/app/lib/config";
import { offers, money, destinations } from "@/app/lib/catalog";
const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(5000),
      }),
    )
    .min(1)
    .max(20),
});
export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json(
        { error: "Please send a short travel question." },
        { status: 400 },
      );
    const messages = parsed.data.messages;
    const last =
      messages.filter((m) => m.role === "user").at(-1)?.content || "";
    if (!last)
      return NextResponse.json(
        { error: "Tell us what kind of trip you’re looking for." },
        { status: 400 },
      );
    if (
      process.env.OPENAI_API_KEY &&
      !process.env.OPENAI_API_KEY.includes("your-") &&
      authConfigured &&
      auth().userId
    ) {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        timeout: 25000,
        maxRetries: 1,
      });
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        max_tokens: 650,
        messages: [
          {
            role: "system",
            content: `You are Globetrotter's concise travel planning assistant. Never claim to reserve a trip, verify live availability, or process payment. The catalog is sample inventory; prices are EUR per package plus 10% taxes. Do not invent offers. Suggest checking offer details. Catalog: ${offers.map((o) => `${o.hotelCity}, ${o.country}: ${o.hotelName}, ${o.duration}, ${o.totalCost} EUR for ${o.person} travelers`).join("; ")}`,
          },
          ...messages,
        ],
      });
      return NextResponse.json({
        output: {
          role: "assistant",
          content:
            completion.choices[0].message.content ||
            "Try exploring our destinations for inspiration.",
        },
        mode: "ai",
      });
    }
    const query = last.toLowerCase();
    const country = destinations.find((d) =>
      query.includes(d.name.toLowerCase()),
    );
    const budgetMatch = query.match(
      /(?:under|below|budget|less than)\s*[€$]?\s*([\d,]+)/,
    );
    const budget = budgetMatch
      ? Number(budgetMatch[1].replace(/,/g, ""))
      : Infinity;
    const winter = /mountain|snow|ski|alps/.test(query);
    const beach = /beach|sunny|sea|coast/.test(query);
    const matches = offers
      .filter(
        (o) =>
          (!country || o.country === country.name) &&
          o.totalCost <= budget &&
          (!winter || o.season === "Winter") &&
          (!beach ||
            ["Greece", "Thailand", "Mexico", "Portugal"].includes(o.country)),
      )
      .sort((a, b) => a.totalCost - b.totalCost)
      .slice(0, 3);
    const content = matches.length
      ? `Here are a few ideas from our sample collection${country ? ` in ${country.name}` : ""}:\n\n${matches.map((o) => `• ${o.hotelName}, ${o.hotelCity}, ${o.country}\n  ${o.duration} · ${money(o.totalCost)} per package for ${o.person} traveler${o.person === 1 ? "" : "s"} · ${o.mealPlan}`).join("\n\n")}\n\nPrices exclude 10% taxes and fees. Browse all trips below to review dates, inclusions, and cancellation policies. Tell me a destination or budget to narrow it down.`
      : `There isn’t a trip matching all of those preferences in our sample collection yet. Try a wider budget or a destination such as Greece, Italy, Switzerland, or Thailand.`;
    return NextResponse.json({
      output: { role: "assistant", content },
      mode: "catalog",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof SyntaxError
            ? "That message could not be read."
            : "The planner is temporarily unavailable. Please try again, or explore the trip collection.",
      },
      { status: error instanceof SyntaxError ? 400 : 502 },
    );
  }
}
