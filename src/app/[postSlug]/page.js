import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo/DivisionGroupsDemo';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';

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
          components={{DivisionGroupsDemo, CodeSnippet}}
        />
      </div>
    </article>
  );
}

export default BlogPost;
