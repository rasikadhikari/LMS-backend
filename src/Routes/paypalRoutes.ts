import express from "express";
import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET_KEY) {
  throw new Error("Missing PayPal environment variables.");
}

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET_KEY
);

const client = new paypal.core.PayPalHttpClient(environment);

router.get("/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

router.post("/orders", async (req, res) => {
  try {
    const { price } = req.body;
    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price.toFixed(2),
          },
        },
      ],
    });

    const response = await client.execute(request);
    res.json({ orderID: response.result.id });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post("/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);

    request.requestBody({
      payment_source: {
        token: {
          id: "AbwcO1StVgUoZhXYB4CV1af6EktTsujL8Y_V6-L6u3NtPsTldsXG9uFAzDbYkYkkb90Y8EUJ2SM4CpAk", // Replace with actual token ID
          type: "BILLING_AGREEMENT", // Replace with actual token type
        },
      },
    });

    const response = await client.execute(request);
    console.log(response.result);
    res.json({
      status: response.result.status,
      details: response.result,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
