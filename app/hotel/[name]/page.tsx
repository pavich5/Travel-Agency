import { notFound } from "next/navigation";
import { offers } from "@/app/lib/catalog";
import OfferDetail from "@/app/Components/travel/OfferDetail";
export default function HotelPage({ params }: { params: { name: string } }) {
  const offer = offers.find(
    (o) =>
      o.hotelName.toLowerCase() ===
      decodeURIComponent(params.name).toLowerCase(),
  );
  if (!offer) notFound();
  return <OfferDetail offer={offer} hotelView />;
}
