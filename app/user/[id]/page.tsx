import MyTrips from "@/app/Components/travel/MyTrips";
// The server always loads the authenticated user's records, never the URL user's records.
export default function ProfilePage() {
  return <MyTrips />;
}
