import { http, HttpResponse } from 'msw'

import { offers } from './data/offers'

export const handlers = [
  http.get('/api/offers', () => {
    return HttpResponse.json(offers)
  }),

  http.get("/api/feature-flag", () => {
  return HttpResponse.json({
    checkoutV2: true,
  });
}),
/* http.get("/api/feature-flag", () => {
  return HttpResponse.json(
    { message: "Erro ao carregar feature flag" },
    { status: 500 }
  );
}) */
/* http.post("/api/checkout", async ({ request }) => {
  const body = (await request.json()) as {
    offerIds: string[];
    paymentMethod?: "pix" | "boleto";
  };

  return HttpResponse.json(
    {
      agreementId: "agreement-123",
      status: "confirmed",
    },
    { status: 200 }
  );
}),*/
http.post("/api/checkout", async ({ request }) => {
  const body = await request.json();

  console.log("Checkout recebido:", body);

  return HttpResponse.json(
    {
      agreementId: "agreement-123",
      status: "confirmed",
    },
    { status: 200 }
  );
}),

// http.post("/api/checkout", () => {
//   return HttpResponse.json(
//     {
//       message: "Erro interno ao processar checkout",
//     },
//     { status: 500 }
//   );
// }),
]

