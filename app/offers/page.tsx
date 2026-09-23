import OfferExplorer from "../Components/travel/OfferExplorer";
export const metadata = { title: "Explore trips" };
export default function OffersPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  return (
    <OfferExplorer
      key={JSON.stringify(searchParams)}
      initialCountry={searchParams.country}
      initialQuery={searchParams.q}
      initialSeason={searchParams.season}
      initialMonth={searchParams.month}
    />
  );
}
