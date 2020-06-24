import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/post";

export default function Post() {
  return <Layout></Layout>;
}

export function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    params: {
      paths,
      fallback: false,
    },
  };
}

export async function getStaticProps() {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
