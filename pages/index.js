import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getAllPosts } from "./api/posts";
import Link from "next/link";
import NavBar from "../components/navbar";

export async function getStaticProps(context) {
  return { props: { posts: getAllPosts() } };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <NavBar />
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Posts</h1>
        <p>({posts.length})</p>
        {posts.map((post) => {
          return (
            <Link href={"/post/" + post.frontMatter.slug} passHref={true}>
              <div key={post.frontMatter.title} className="post-list-item">
                <p className="post-list-item--title">{post.frontMatter.title}</p>
                <p className="post-list-item--date">{post.frontMatter.date}</p>
                <p className="post-list-item--excerpt">{post.frontMatter.excerpt}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <footer className={styles.footer}>Made with Next JS</footer>
    </div>
  );
}
