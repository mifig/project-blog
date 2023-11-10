import fs from 'fs';
import { Feed } from "feed";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";

export async function GET() {
  const url = "localhost:3000";
  
  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to Blogs & Bolgs",
    id: url,
    link: url,
    feedLinks: {
      rss2: `${url}/rss.xml`
    },
  };
  
  const feed = new Feed(feedOptions);
  
  const blogPosts = await getBlogPostList();

  for (const post of blogPosts) {
    const blogPost = await loadBlogPost(post.slug);
    feed.addItem({
      title: blogPost.frontmatter.title,
      id: `${url}/${post.slug}`,
      link: `${url}/${post.slug}`,
      description: blogPost.frontmatter.abstract,
      date: new Date(blogPost.frontmatter.publishedOn),
    })
  };

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml" 
    }
  })
};

