"use client";

import Link from "next/link";

import { useCartStore } from "@/stores/cartStore";
import { CartItem } from "./CartItem";
import styles from "./CartContent.module.css";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function CartContent() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const total = items.reduce(
    (sum, item) => sum + item.offerAmount,
    0
  );

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.content}>
          <Link
            href="/"
            className={styles.backLink}
            aria-label="Voltar para ofertas"
          >
            ←
          </Link>

          <h1 className={styles.title}>Seu carrinho</h1>

          <div className={styles.emptyState}>
            <p>Seu carrinho está vazio.</p>
            <Link href="/" className={styles.returnButton}>
              Ver ofertas
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Link
            href="/"
            className={styles.backLink}
            aria-label="Voltar para ofertas"
          >
            ←
          </Link>

          <div>
            <h1 className={styles.title}>Seu carrinho</h1>
            <p className={styles.subtitle}>
              Confira suas ofertas selecionadas.
            </p>
          </div>
        </header>

        <section
          className={styles.items}
          aria-label="Ofertas selecionadas"
        >
          {items.map((item) => (
            <CartItem
              key={item.id}
              offer={item}
              onRemove={removeItem}
            />
          ))}
        </section>

        <div className={styles.total}>
          <span>Total</span>
          <strong>{currencyFormatter.format(total)}</strong>
        </div>

        <Link href="/checkout" className={styles.checkoutButton}>
          Ir para o checkout
        </Link>
      </div>
    </main>
  );
}