import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";

export default function Home() {
  return (

    //Equipe FrontEnd
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
      </div>
      <div className={styles.item}>
        <Image src={"/hero.png"} width={1000} height={500} alt="" className={styles.img} />
      </div>
    </div>
  );
}