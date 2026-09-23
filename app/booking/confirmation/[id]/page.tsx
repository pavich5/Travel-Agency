import { notFound } from "next/navigation";
import { findOffer } from "@/app/lib/catalog";
import BookingForm from "@/app/Components/travel/BookingForm";
export default function CheckoutPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { packages?: string };
}) {
  const offer = findOffer(params.id);
  if (!offer) notFound();
  const count = Number(searchParams.packages || 1);
  const initialPackages =
    Number.isInteger(count) && count >= 1 && count <= 4 ? count : 1;
  const key = process.env.STRIPE_SECRET_KEY || "";
  const configured = !!key && !key.includes("your_");
  return (
    <BookingForm
      offer={offer}
      initialPackages={initialPackages}
      checkoutReady={configured}
      testMode={!configured || key.startsWith("sk_test_")}
    />
  );
}
