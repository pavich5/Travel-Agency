import Link from "next/link";
import Icon from "./Components/travel/Icon";
export default function NotFound() {
  return (
    <main className="shell section">
      <div className="empty-state">
        <Icon name="compass" size={40} />
        <p className="eyebrow">A SMALL DETOUR</p>
        <h2>This place is off our map.</h2>
        <p>
          The page or trip you’re looking for isn’t available. There are still
          plenty of good places to go.
        </p>
        <Link className="button button-green" href="/offers">
          Explore our trips <Icon name="arrow" size={17} />
        </Link>
      </div>
    </main>
  );
}
