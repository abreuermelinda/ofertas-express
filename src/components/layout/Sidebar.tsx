"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";

import styles from "./Sidebar.module.css";

export function Sidebar() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.items.length);

  const isOffersActive = pathname === "/";
  const isCartActive = pathname === "/cart";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2 className={styles.title}>Ofertas Express</h2>
        <p className={styles.subtitle}>Renegocie com desconto</p>
      </div>

      <nav className={styles.nav} aria-label="Navegação principal">
        <Link
          href="/"
          className={`${styles.link} ${isOffersActive ? styles.active : ""}`}
          aria-current={isOffersActive ? "page" : undefined}
        >
          Ofertas
        </Link>
        <Link
          href="/cart"
          className={`${styles.link} ${isCartActive ? styles.active : ""}`}
          aria-current={isCartActive ? "page" : undefined}
        >
          Carrinho
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>
      </nav>
    </aside>
  );
}
