import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  //Get file names under /posts
  const fileNames = fs.readdirSync(postDirectory);
  const allPostData = fileNames.map((fileName) => {
    //Remove '.md' extenstion to get file name
    const id = fileName.replace(/\.md$/, "");

    //Read Markdown file as string
    const fullPath = path.join(postDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    //Use gray-matter to pass the post meta data section
    const matterResult = matter(fileContent);
    //Combine data with id
    return {
      id,
      ...matterResult.data,
    };
  });
  //Sort by date
  return allPostData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
