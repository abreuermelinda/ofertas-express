import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OffersList } from "./OffersList";

function renderOffersList() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <OffersList />
    </QueryClientProvider>
  );
}

describe("OffersList", () => {
  it("displays the offers returned by the API", async () => {
    renderOffersList();

    expect(
      await screen.findByText("Negocie agora")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Acordo rápido")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Parcelado leve")
    ).toBeInTheDocument();
  });
});