import Link from "next/link";
import Icon from "../Components/travel/Icon";
import TravelImage from "../Components/travel/TravelImage";
export const metadata = { title: "Our story" };
export default function AboutPage() {
  return (
    <main className="shell">
      <section className="about-hero">
        <TravelImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85"
          alt="A mountain landscape waiting to be explored"
          eager
        />
        <div>
          <p className="eyebrow light">FOR THE CURIOUS AT HEART</p>
          <h1>
            A little further from
            <br />
            <em>the everyday.</em>
          </h1>
        </div>
      </section>
      <section className="why-section section">
        <div>
          <p className="eyebrow">HELLO. WE’RE GLOBETROTTER.</p>
          <h2>
            Travel should feel
            <br />
            like a possibility.
            <br />
            <em>Not a project.</em>
          </h2>
        </div>
        <div>
          <p style={{ color: "var(--muted)", fontSize: 16 }}>
            We’re here for the first glimpse of a new city, the long lunch that
            becomes the whole afternoon, and the view that makes you put your
            phone away.
          </p>
          <p style={{ color: "var(--muted)", fontSize: 16, marginTop: 20 }}>
            Globetrotter brings destinations, stays, and experiences together in
            one place. Our aim is simple: make the planning feel lighter, so the
            journey can mean more.
          </p>
          <Link href="/offers" className="text-link" style={{ marginTop: 25 }}>
            Find your kind of journey <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>
      <section className="section about-values" style={{ paddingTop: 0 }}>
        {[
          {
            icon: "compass",
            title: "Chosen with curiosity",
            text: "A collection of city breaks, coastlines, and mountain stays, with room for your own discoveries.",
          },
          {
            icon: "shield",
            title: "Clear from the start",
            text: "See your stay, activities, transport, cancellation policy, and total price before you commit.",
          },
          {
            icon: "heart",
            title: "At your own pace",
            text: "Save the trips you love, find inspiration in our journal, and book when the time feels right.",
          },
        ].map((value) => (
          <div key={value.title}>
            <Icon name={value.icon} size={28} />
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
