"use client";

import Link from "next/link";

import { useCartStore } from "@/stores/cartStore";

import styles from "./CartLink.module.css";

export function CartLink() {
  const itemCount = useCartStore((state) => state.items.length);

  return (
    <Link
      href="/cart"
      className={styles.cartLink}
      aria-label={`Carrinho com ${itemCount} oferta${
        itemCount === 1 ? "" : "s"
      }`}
    >
      <span aria-hidden="true">🛒</span>

      {itemCount > 0 && (
        <span className={styles.badge}>{itemCount}</span>
      )}
    </Link>
  );
}