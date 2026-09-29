import { useMutation } from "@tanstack/react-query";

import { submitCheckout } from "@/services/checkout";

export function useCheckout() {
  return useMutation({
    mutationFn: submitCheckout,
  });
}