import BookingResult from "@/app/Components/travel/BookingResult";
export default function ConfirmedPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { session_id?: string };
}) {
  return (
    <BookingResult offerId={params.id} sessionId={searchParams.session_id} />
  );
}
