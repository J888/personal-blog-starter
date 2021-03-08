// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";
import FrontMatter from "front-matter";

export const getAllPosts = () => {
  const postsFolderPath = path.join(process.cwd(), "_posts");
  const posts = fs.readdirSync(postsFolderPath);
  posts.forEach((fileName, index) => {
    const fullPath = postsFolderPath + "/" + fileName;
    let contents = fs.readFileSync(fullPath, "utf8");
    contents = FrontMatter(contents);
    contents["attributes"]["date"] = new Date(contents["attributes"]["date"]).toLocaleString()
    posts[index] = {
      frontMatter: contents["attributes"],
      markdownBody: contents["body"],
      filename: fileName,
    };
  });
  return posts;
};

export const getAllPostsMappedBySlug = () => {
  let postsMappedBySlug = {};
  getAllPosts().forEach((post) => {
    postsMappedBySlug[post.frontMatter.slug] = post;
  });
  return postsMappedBySlug;
};

export const getAllSlugs = () => {
  return getAllPosts().map(post => post.frontMatter.slug)
}

// GET endpoint
export default async (req, res) => {
  res.status(200).json(getAllPosts());
};
