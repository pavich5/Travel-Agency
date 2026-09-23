import Link from "next/link";
import Icon from "../travel/Icon";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top shell">
        <div className="footer-intro">
          <Link href="/" className="brand">
            <Icon name="globe" size={28} />
            globetrotter.
          </Link>
          <p>
            A little further from the everyday.
            <br />A little closer to the extraordinary.
          </p>
          <Link href="/contact" className="footer-contact">
            Let’s plan something good <Icon name="arrowUp" size={17} />
          </Link>
        </div>
        <div>
          <h3>Go somewhere</h3>
          <Link href="/offers">All trips</Link>
          <Link href="/vacation/Greece">Greek getaways</Link>
          <Link href="/vacation/Italy">Discover Italy</Link>
          <Link href="/vacation/list/Winter">Winter escapes</Link>
        </div>
        <div>
          <h3>Get inspired</h3>
          <Link href="/blogs">Travel journal</Link>
          <Link href="/ai">Your AI trip planner</Link>
          <Link href="/about">Our story</Link>
          <Link href="/saved">Your saved trips</Link>
        </div>
        <div>
          <h3>Here to help</h3>
          <Link href="/contact">Contact & FAQs</Link>
          <Link href="/trips">My bookings</Link>
          <Link href="/terms">Booking terms</Link>
          <Link href="/privacy">Privacy policy</Link>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>
          © {new Date().getFullYear()} Globetrotter. Made for the curious.
        </span>
        <span>
          English <span className="footer-divider">/</span> EUR €{" "}
          <Icon name="globe" size={15} />
        </span>
      </div>
    </footer>
  );
}
