import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { CompassOutlined, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { travelExperiences } from "../mocks/data";
import "./page.styles.css";

const Blogs = () => {
  return (
    <div className="experiencesPage">
      <section className="experiencesHero">
        <p className="experiencesEyebrow">Travel Experiences</p>
        <h1>Stories that feel like a modern travel magazine, not a feed.</h1>
        <p className="experiencesLead">
          Editorial-style destination notes, practical trip insights, and polished inspiration for your next booking.
        </p>
        <div className="experiencesStats">
          <div>
            <strong>{travelExperiences.length}</strong>
            <span>featured stories</span>
          </div>
          <div>
            <strong>12</strong>
            <span>destinations covered</span>
          </div>
          <div>
            <strong>Weekly</strong>
            <span>fresh inspiration</span>
          </div>
        </div>
      </section>

      <section className="experiencesGrid">
        {travelExperiences.map((experience) => (
          <article key={experience.id} className="experienceCard">
            <Link href={`/blogs/${experience.id}`} className="experienceImageWrap">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="experienceImage"
              />
            </Link>
            <div className="experienceBody">
              <div className="experienceMetaRow">
                <span className="experienceBadge">{experience.category}</span>
                <span className="experienceRead">{experience.readTime}</span>
              </div>
              <h2>{experience.title}</h2>
              <p className="experienceExcerpt">{experience.excerpt}</p>
              <div className="experienceAuthor">
                <div className="experienceAvatar">{experience.author.charAt(0)}</div>
                <div>
                  <strong>{experience.author}</strong>
                  <span>{experience.role}</span>
                </div>
              </div>
              <div className="experienceFooter">
                <div className="experienceSignals">
                  <span><HeartOutlined /> {experience.likes}</span>
                  <span><MessageOutlined /> {experience.comments}</span>
                  <span><CompassOutlined /> Curated</span>
                </div>
                <Link href={`/blogs/${experience.id}`}>
                  <Button type="primary">Read Story</Button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Blogs;
