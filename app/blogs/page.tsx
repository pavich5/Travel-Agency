import Link from "next/link";
import { travelExperiences } from "../mocks/data";
import TravelImage from "../Components/travel/TravelImage";
import Icon from "../Components/travel/Icon";
export const metadata = { title: "The travel journal" };
export default function JournalPage() {
  return (
    <main className="shell journal-page">
      <div className="page-top">
        <p className="eyebrow">POSTCARDS, NOT CHECKLISTS</p>
        <h1>
          A few stories for <em>the road.</em>
        </h1>
        <p>
          Slow mornings, unexpected turns, and places worth getting lost in. A
          little inspiration for wherever you’re going next.
        </p>
      </div>
      <div className="journal-grid">
        {travelExperiences.map((story) => (
          <Link
            className="journal-card"
            key={story.id}
            href={`/blogs/${story.id}`}
          >
            <div className="journal-image">
              <TravelImage src={story.image} alt={story.destination} />
              <span>
                <Icon name="arrowUp" size={20} />
              </span>
            </div>
            <p className="journal-meta">
              {story.category}
              <span>{story.readTime}</span>
            </p>
            <h3>{story.title}</h3>
            <p style={{ fontSize: 16, color: "var(--muted)", marginTop: 12 }}>
              {story.excerpt}
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 15 }}>
              Words by {story.author}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
