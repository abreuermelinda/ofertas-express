export type PaymentMethod = "pix" | "boleto";

export type CheckoutRequest = {
  offerIds: string[];
  paymentMethod?: PaymentMethod;
};

export type CheckoutResponse = {
  agreementId: string;
  status: "confirmed";
};