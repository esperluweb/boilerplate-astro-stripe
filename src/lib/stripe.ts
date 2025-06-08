import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
});

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true, // Ne récupère que les produits actifs
    limit: 100,   // Nombre max de produits à charger
    expand: ['data.default_price'], // Inclut le prix
  });

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.images?.[0], // Première image
    price: (product.default_price as Stripe.Price)?.unit_amount || 0, // Prix en centimes
    currency: (product.default_price as Stripe.Price)?.currency?.toUpperCase() || 'EUR',
  }));
}
