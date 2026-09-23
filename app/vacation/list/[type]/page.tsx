import { notFound } from "next/navigation";
import OfferExplorer from "@/app/Components/travel/OfferExplorer";
export default function SeasonPage({ params }: { params: { type: string } }) {
  const season = ["Summer", "Winter", "Easter", "Spring"].find(
    (s) => s.toLowerCase() === params.type.toLowerCase(),
  );
  if (!season) notFound();
  return <OfferExplorer initialSeason={season} />;
}
