import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "posts");

//getting posts sorted by date for home page
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

//getting ids for [id].js
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

//getting respective post data for [id].js
export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  //use gray matter to parse the post metadata content
  const matterResult = matter(fileContents);

  //use remark to convert markdown to html string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  //Combine data with id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
