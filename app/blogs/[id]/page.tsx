import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, CompassOutlined, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { travelExperiences } from "@/app/mocks/data";
import styles from "./page.module.css";

const StoryPage = ({ params }: { params: { id: string } }) => {
  const story = travelExperiences.find((item) => item.id === params.id);

  if (!story) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href="/blogs" className={styles.backLink}>
          <ArrowLeftOutlined /> Back to stories
        </Link>
      </div>

      <article className={styles.storyCard}>
        <div className={styles.heroImageWrap}>
          <Image
            src={story.image}
            alt={story.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className={styles.heroImage}
          />
        </div>

        <div className={styles.storyBody}>
          <div className={styles.metaRow}>
            <span className={styles.badge}>{story.category}</span>
            <span className={styles.readTime}>{story.readTime}</span>
          </div>

          <h1>{story.title}</h1>
          <p className={styles.lead}>{story.excerpt}</p>

          <div className={styles.infoGrid}>
            <div>
              <strong>{story.destination}</strong>
              <span><CompassOutlined /> Destination</span>
            </div>
            <div>
              <strong>{story.publishedAt}</strong>
              <span><CalendarOutlined /> Timing</span>
            </div>
            <div>
              <strong>{story.likes} saves</strong>
              <span><HeartOutlined /> Reader interest</span>
            </div>
            <div>
              <strong>{story.comments} notes</strong>
              <span><MessageOutlined /> Discussion</span>
            </div>
          </div>

          <div className={styles.highlights}>
            {story.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>

          <div className={styles.authorBlock}>
            <div className={styles.avatar}>{story.author.charAt(0)}</div>
            <div>
              <strong>{story.author}</strong>
              <p>{story.role}</p>
            </div>
          </div>

          <div className={styles.storyContent}>
            {story.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href="/blogs">
              <Button type="primary">More Stories</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default StoryPage;
