import Stripe from "stripe";
import { z } from "zod";
export const checkoutSchema = z.object({
  offerId: z.number().int().positive(),
  packages: z.number().int().min(1).max(4),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9 ()-]{6,30}$/, "Enter a valid phone number."),
  notes: z.string().trim().max(400).optional().default(""),
  acceptedTerms: z.literal(true),
});
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("your_"))
    throw new Error("Payments are not configured.");
  return new Stripe(key);
}
export function bookingsEnabled() {
  const key = process.env.STRIPE_SECRET_KEY || "";
  return !!key && !key.includes("your_");
}
