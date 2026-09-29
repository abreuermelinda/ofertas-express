import type {
  CheckoutRequest,
  CheckoutResponse,
} from "@/types/checkout";

export async function submitCheckout(
  data: CheckoutRequest
): Promise<CheckoutResponse> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Não foi possível confirmar o acordo.");
  }

  return response.json();
}