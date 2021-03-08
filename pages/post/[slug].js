import { useRouter } from "next/router";
import { getAllPostsMappedBySlug, getAllSlugs } from "../api/posts";
import ReactMarkdown from 'react-markdown'
import NavBar from "../../components/navbar";
import styles from "../../styles/Post.module.css";

const Post = ({ md, date }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={styles.container}>
      <NavBar/>
      <code className={styles.slug}>/post/{slug}</code>
      <p>{date}</p>
      <ReactMarkdown>
        {md}
      </ReactMarkdown>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const post = getAllPostsMappedBySlug()[params.slug];
  return {
    props: {
      md: post.markdownBody,
      date: post.frontMatter.date
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllSlugs().map((slug) => ({
    params: { slug: slug },
  }));

  return {
    paths: paths,
    fallback: false, // See the "fallback" section below
  };
}

export default Post;
