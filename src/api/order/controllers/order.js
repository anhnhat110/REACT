"use strict";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products,username } = ctx.request.body;
     // Lấy thông tin user từ context (nếu đã được xác thực)
    
    try {
      console.log("Received products:", products);

      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);
          console.log("Found product:", item);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        })
      );

      console.log("Line items:", lineItems);

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ['US', 'CA'] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "success=true",
        cancel_url: process.env.CLIENT_URL + "success=false",
        line_items: lineItems,
      });

      console.log("Stripe session:", session);

      // Lưu thông tin đơn hàng vào Strapi
      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id, username } });

      return { stripeSession: session };
    } catch (error) {
      console.error("Error creating order:", error);
      ctx.response.status = 500;
      return { error };
    }
  },
}));
