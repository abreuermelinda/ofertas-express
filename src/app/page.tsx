import { CartLink } from "@/components/cart/CartLink";
import { OffersList } from "@/components/offers/OffersList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Ofertas Express</h1>
            <p className={styles.subtitle}>Renegocie com desconto</p>
          </div>
          <CartLink />
        </header>

        <OffersList />
      </section>
    </main>
  );
}