import Link from "next/link";
import styles from "./post-item.module.css";
import Image from "next/image";

export default function PostItem({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <li className={styles.post}>
      <Link href={`/posts/${post.slug}`}>
        <div className={styles.image}>
          <Image
            src={imagePath}
            width={300}
            height={200}
            alt={post.title}
            layout="responsive"
          />
        </div>
        <div className={styles.content}>
          <h3>{post.title}</h3>
          <time datetime="">{formattedDate}</time>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
