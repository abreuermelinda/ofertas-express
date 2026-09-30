import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import { CheckoutContent } from "./CheckoutContent";
import { server } from "@/mocks/server";
import { useCartStore } from "@/stores/cartStore";

function renderCheckoutContent() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <CheckoutContent />
    </QueryClientProvider>,
  );
}

const offer = {
  id: "1",
  name: "Negocie agora",
  originalAmount: 2450,
  offerAmount: 980,
  discountPercentage: 60,
};

describe("CheckoutContent", () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [offer],
    });
  });

  afterEach(() => {
    useCartStore.setState({
      items: [],
    });
  });

  it("falls back to the old checkout flow when the feature flag API fails", async () => {
    server.use(
      http.get("/api/feature-flag", () => {
        return HttpResponse.json(
          { message: "Erro ao carregar feature flag" },
          { status: 500 },
        );
      }),
    );

    renderCheckoutContent();

    expect(
      await screen.findByRole("button", { name: "Confirmar" }),
    ).toBeInTheDocument();

    expect(screen.queryByText("Forma de pagamento")).not.toBeInTheDocument();

    expect(screen.queryByText("Pix")).not.toBeInTheDocument();

    expect(screen.queryByText("Boleto")).not.toBeInTheDocument();
  });

  it("shows an error and keeps the cart when checkout fails", async () => {
  const user = userEvent.setup();

  server.use(
    http.post("/api/checkout", () => {
      return HttpResponse.json(
        { message: "Erro interno ao processar checkout" },
        { status: 500 }
      );
    })
  );

  renderCheckoutContent();

  const confirmButton = await screen.findByRole("button", {
    name: "Confirmar pagamento",
  });

  await user.click(confirmButton);

  expect(
    await screen.findByRole("alert")
  ).toHaveTextContent(
    "Não foi possível confirmar o acordo. Tente novamente."
  );

  expect(useCartStore.getState().items).toHaveLength(1);
});
});
