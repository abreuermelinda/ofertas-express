import { useQuery } from "@tanstack/react-query";

import { getCheckoutFeatureFlag } from "@/services/featureFlag";

export function useCheckoutFeatureFlag() {
  return useQuery({
    queryKey: ["checkout-feature-flag"],
    queryFn: getCheckoutFeatureFlag,
    retry: false,
  });
}