import { notFound } from "next/navigation";
import { findOffer } from "@/app/lib/catalog";
import OfferDetail from "@/app/Components/travel/OfferDetail";
export default function OfferPage({ params }: { params: { id: string } }) {
  const offer = findOffer(params.id);
  if (!offer) notFound();
  return <OfferDetail offer={offer} />;
}
