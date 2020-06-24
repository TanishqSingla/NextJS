import Layout from "../../components/layout";
import { getAllPostIds } from "../../lib/post";

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
