import { Button } from "antd";
import styles from "../../page.module.css";
import {  Key } from "react";
import Link from "next/link";

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  slug: string;
}

interface BlogSectionProps {
  blogPosts: BlogPost[];
}

const BlogSection = ({ blogPosts }: BlogSectionProps): JSX.Element => {
  return (
    <div className={styles.blogSection}>
      <div className={styles.blogPosts}>
        <h2>Latest Blog Posts</h2>
        {blogPosts.map((post: BlogPost, index: Key) => (
          <div key={index} className={styles.blogPost}>
            <img src={post.image} alt={post.title} />
            <div className={styles.blogPostContent}>
              <div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
              <div style={{ padding: "15px" }}>
                <Link target="_blank" href={post.slug}>
                  <Button type="primary">Read more</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
