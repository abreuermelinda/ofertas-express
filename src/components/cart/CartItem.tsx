import type { Offer } from "@/types/offer";
import styles from "./CartItem.module.css";

type CartItemProps = {
  offer: Offer;
  onRemove: (offerId: string) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function CartItem({
  offer,
  onRemove,
}: CartItemProps) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        ▤
      </div>

      <div className={styles.info}>
        <h2 className={styles.name}>{offer.name}</h2>

        <span className={styles.label}>Oferta</span>

        <strong className={styles.amount}>
          {currencyFormatter.format(offer.offerAmount)}
        </strong>
      </div>

      <button
        type="button"
        className={styles.removeButton}
        onClick={() => onRemove(offer.id)}
        aria-label={`Remover ${offer.name} do carrinho`}
      >
        ×
      </button>
    </article>
  );
}