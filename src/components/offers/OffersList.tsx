"use client";

import { OfferCard } from "./OfferCard";
import { useOffers } from "@/hooks/useOffers";
import { useCartStore } from "@/stores/cartStore";
import styles from "./OffersList.module.css";

export function OffersList() {
  const { data: offers, isPending, isError } = useOffers();
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  if (isPending) {
    return <p>Carregando ofertas...</p>;
  }

  if (isError) {
    return (
      <p role="alert">
        Não foi possível carregar as ofertas. Tente novamente.
      </p>
    );
  }

  if (!offers?.length) {
    return <p>Nenhuma oferta disponível no momento.</p>;
  }

  return (
    <section className={styles.list} aria-label="Ofertas disponíveis">
      {offers.map((offer) => {
        const isInCart = items.some((item) => item.id === offer.id);

        return (
          <OfferCard
            key={offer.id}
            offer={offer}
            onAddToCart={addItem}
            isInCart={isInCart}
          />
        );
      })}
    </section>
  );
}