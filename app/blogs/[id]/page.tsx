import Link from "next/link";
import { notFound } from "next/navigation";
import { travelExperiences } from "@/app/mocks/data";
import TravelImage from "@/app/Components/travel/TravelImage";
import Icon from "@/app/Components/travel/Icon";
export default function StoryPage({ params }: { params: { id: string } }) {
  const story = travelExperiences.find((s) => s.id === params.id);
  if (!story) notFound();
  return (
    <main className="shell section">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/blogs">The travel journal</Link>
        <Icon name="chevron" size={12} />
        <span>{story.category}</span>
      </nav>
      <TravelImage
        className="article-cover"
        src={story.image}
        alt={story.destination}
        eager
      />
      <article className="article-content">
        <p className="eyebrow">
          {story.category} · {story.readTime}
        </p>
        <h1>{story.title}</h1>
        <p style={{ fontSize: 18 }}>{story.excerpt}</p>
        <div className="article-meta">
          <strong>{story.author}</strong>
          <span>{story.role}</span>
          <span>{story.publishedAt}</span>
        </div>
        {story.story.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        <div className="included-grid" style={{ marginBlock: 30 }}>
          {story.highlights.map((highlight) => (
            <span key={highlight}>
              <Icon name="check" size={16} />
              {highlight}
            </span>
          ))}
        </div>
        <Link href="/offers" className="button button-green">
          Find your own story <Icon name="arrow" size={17} />
        </Link>
        <Link href="/blogs" className="text-link" style={{ marginLeft: 20 }}>
          More from the journal
        </Link>
      </article>
    </main>
  );
}
