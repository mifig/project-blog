import React from 'react';
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation'

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo"
import CircularColorsDemo from '@/components/CircularColorsDemo';

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const {frontmatter } = await loadBlogPost(params.postSlug) || {};

  if (!frontmatter) {
    return {
      title: "404 - Not found",
      description: "Page not found."
    }
  }

  return {
    title: frontmatter.title,
    description: frontmatter.abstract
  };
}

async function BlogPost({params}) {
  const {frontmatter, content} = await loadBlogPost(params.postSlug) || {};

  if (!frontmatter) {
    notFound()
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote 
          source={content} 
          components={{
            pre: CodeSnippet, 
            DivisionGroupsDemo, 
            CircularColorsDemo
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
