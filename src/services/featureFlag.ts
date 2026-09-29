import type { CheckoutFeatureFlag } from "@/types/featureFlag";

export async function getCheckoutFeatureFlag(): Promise<CheckoutFeatureFlag> {
  const response = await fetch("/api/feature-flag");

  if (!response.ok) {
    throw new Error("Não foi possível carregar a feature flag");
  }

  return response.json();
}