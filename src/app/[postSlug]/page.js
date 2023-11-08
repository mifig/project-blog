import React from 'react';
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';
const DivisionGroupsDemo = React.lazy(() => import('@/components/DivisionGroupsDemo/DivisionGroupsDemo'));
const CircularColorsDemo = React.lazy(() => import('@/components/CircularColorsDemo/CircularColorsDemo'));

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const {frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract
  };
}

async function BlogPost({params}) {
  const {frontmatter, content} = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote 
          source={content} 
          components={{DivisionGroupsDemo, CodeSnippet, CircularColorsDemo}}
        />
      </div>
    </article>
  );
}

export default BlogPost;
