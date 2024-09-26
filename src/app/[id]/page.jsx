import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import connect from "@/utils/db";
import Post from "@/models/Post";
import ManagePostButtons from "@/components/ManagePostButtons/ManagePostButtons";
import Link from "next/link";


const SinglePostPage = async ({ params }) => {
  const { id } = params;

  try {
    await connect();
    const post = await Post.findById(id);

    if (!post) {
      return notFound();
    }

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <h1 className={styles.title}>{post.title}</h1>
            {/* <p className={styles.desc}>{post.desc}</p> */}
            <div className={styles.author}>
              {/* <Image
                src={post.img}
                alt={post.title}
                width={40}
                height={40}
                className={styles.avatar}
              /> */}
              <Link href={`/posts/${post.name}`}>
                <span className={styles.username}><strong>Author:</strong> {post.name}</span>
              </Link>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={post.img}
              alt={post.title}
              fill={true}
              className={styles.image}
              // objectFit="cover"
            />
          </div>
        </div>
        <div className={styles.content}>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <ManagePostButtons username={post.name} postId={id}/>
        </div>
      
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error)
    return notFound();
  }
};

export default SinglePostPage
