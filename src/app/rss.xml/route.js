import fs from 'fs';
import { Feed } from "feed";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";

export async function generateRSSFeed() {
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

  (blogPosts).forEach((post) => {
    const blogPost = loadBlogPost(post.slug);
    feed.addItem({
      title: blogPost.frontmatter.title,
      id: `${url}/${post.slug}`,
      description: blogPost.frontmatter.abstract,
      date: new Date(blogPost.frontmatter.publishedOn),
    })
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());

  return new Response(feed.xml({ident: true}), {
    headers: {
      "Content-Type": "application/xml" 
    }
  })
};

