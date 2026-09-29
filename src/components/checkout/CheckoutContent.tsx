"use client";

import Link from "next/link";
import { useState } from "react";

import { useCartStore } from "@/stores/cartStore";
import { useCheckoutFeatureFlag } from "@/hooks/useCheckoutFeatureFlag";
import { useCheckout } from "@/hooks/useCheckout";
import type { PaymentMethod } from "@/types/checkout";

import styles from "./CheckoutContent.module.css";


const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});


export function CheckoutContent() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const checkoutMutation = useCheckout();

  const {
    data: featureFlag,
    isPending,
    isError,
  } = useCheckoutFeatureFlag();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("pix");

  const total = items.reduce(
    (sum, item) => sum + item.offerAmount,
    0
  );

  const checkoutV2 =
    !isPending && !isError && featureFlag?.checkoutV2 === true;

  function handleConfirmCheckout() {
  const payload = {
    offerIds: items.map((item) => item.id),
    ...(checkoutV2 && {
      paymentMethod,
    }),
  };

  checkoutMutation.mutate(payload, {
    onSuccess: () => {
      clearCart();
    },
  });
}

const checkoutSucceeded = checkoutMutation.isSuccess;

if (checkoutSucceeded) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <section className={styles.success}>
          <h1>Acordo confirmado!</h1>

          <p>
            Seu acordo foi confirmado com sucesso.
          </p>

          <Link href="/" className={styles.returnButton}>
            Voltar para ofertas
          </Link>
        </section>
      </div>
    </main>
  );
}

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <Link
            href="/cart"
            className={styles.backLink}
            aria-label="Voltar para o carrinho"
          >
            ←
          </Link>

          <div>
            <h1 className={styles.title}>Confirmar acordo</h1>
            <p className={styles.subtitle}>
              Revise os detalhes e confirme para seguir.
            </p>
          </div>
        </header>

        <section
          className={styles.summary}
          aria-label="Resumo do acordo"
        >
          <div className={styles.summaryRow}>
            <span>Ofertas selecionadas</span>
            <strong>{items.length}</strong>
          </div>

          <div className={styles.divider} />

          <div className={styles.summaryRow}>
            <span>Total do acordo</span>
            <strong className={styles.total}>
              {currencyFormatter.format(total)}
            </strong>
          </div>
        </section>

        {checkoutV2 && (
          <fieldset className={styles.payment}>
            <legend>Forma de pagamento</legend>

            <label className={styles.paymentOption}>
              <div>
                <strong>Pix</strong>
                <span>Pagamento instantâneo</span>
              </div>

              <input
                type="radio"
                name="paymentMethod"
                value="pix"
                checked={paymentMethod === "pix"}
                onChange={() => setPaymentMethod("pix")}
              />
            </label>

            <label className={styles.paymentOption}>
              <div>
                <strong>Boleto</strong>
                <span>Vencimento em 3 dias úteis</span>
              </div>

              <input
                type="radio"
                name="paymentMethod"
                value="boleto"
                checked={paymentMethod === "boleto"}
                onChange={() => setPaymentMethod("boleto")}
              />
            </label>
          </fieldset>
        )}
        

        {checkoutMutation.isError && (
          <p className={styles.errorMessage} role="alert">
            Não foi possível confirmar o acordo. Tente novamente.
          </p>
        )}

        <button
          type="button"
          className={styles.confirmButton}
          onClick={handleConfirmCheckout}
            disabled={checkoutMutation.isPending || items.length === 0}
        >
          {checkoutMutation.isPending
            ? "Confirmando..."
            : checkoutV2
                ? "Confirmar pagamento"
                : "Confirmar"}
        </button>
      </div>
    </main>
  );
}