import type { Offer } from "@/types/offer";
import styles from "./OfferCard.module.css";

type OfferCardProps = {
  offer: Offer;
  isInCart?: boolean;
  onAddToCart?: (offer: Offer) => void;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function OfferCard({ offer, isInCart = false, onAddToCart }: OfferCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{offer.name}</h2>

        {offer.discountPercentage !== undefined && (
          <span
            className={styles.discount}
            aria-label={`${offer.discountPercentage}% de desconto`}
          >
            {offer.discountPercentage}% off
          </span>
        )}
      </div>

      <div className={styles.values}>
        <div className={styles.valueGroup}>
          <span className={styles.label}>Dívida</span>
          <strong className={styles.originalAmount}>
            {currencyFormatter.format(offer.originalAmount)}
          </strong>
        </div>

        <div className={styles.valueGroup}>
          <span className={styles.label}>Oferta</span>
          <strong className={styles.offerAmount}>
            {currencyFormatter.format(offer.offerAmount)}
          </strong>
        </div>
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={() => onAddToCart?.(offer)}
        disabled={isInCart}
      >
        {isInCart ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
      </button>
    </article>
  );
}