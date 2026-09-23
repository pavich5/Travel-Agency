import { notFound } from "next/navigation";
import OfferExplorer from "@/app/Components/travel/OfferExplorer";
import { destinations } from "@/app/lib/catalog";
export default function DestinationPage({
  params,
}: {
  params: { name: string };
}) {
  const name = decodeURIComponent(params.name);
  const destination = destinations.find(
    (d) =>
      d.name.toLowerCase() === name.toLowerCase() ||
      (name === "France-Paris" && d.name === "France"),
  );
  if (!destination) notFound();
  return <OfferExplorer initialCountry={destination.name} />;
}
