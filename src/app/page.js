import React from 'react';

import { getBlogPostList } from "@/helpers/file-helpers";
import BlogSummaryCard from '@/components/BlogSummaryCard';
import { BLOG_TITLE } from '@/constants';

import styles from './homepage.module.css';

export const metadata = {
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript"
} 

async function Home() {
  const blogPosts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      {blogPosts.map((blogPost) => {
          return (
            <BlogSummaryCard
              key={blogPost.slug}
              slug={blogPost.slug}
              title={blogPost.title}
              abstract={blogPost.abstract}
              publishedOn={blogPost.publishedOn}
            />
          )
        })
      }
    </div>
  );
}

export default Home;
