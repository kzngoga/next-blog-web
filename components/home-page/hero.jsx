import Image from "next/image";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/doe.jpg"
          alt="An image showing John Doe"
          width={600}
          height={600}
        />
      </div>
      <h1>Hi, I'm John Doe</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular or React.
      </p>
    </section>
  );
}
