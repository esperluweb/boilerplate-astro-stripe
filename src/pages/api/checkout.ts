// src/pages/api/checkout.ts
import Stripe from 'stripe';
import type { APIRoute } from 'astro';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
});

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Début du traitement de la commande...');
    const body = await request.formData();
    const cartRaw = body.get('cart');
    
    if (!cartRaw) {
      console.error('Erreur: Panier vide');
      return new Response('Panier vide', { status: 400 });
    }

    let cart;
    try {
      cart = JSON.parse(cartRaw.toString());
      console.log('Contenu du panier:', JSON.stringify(cart, null, 2));
    } catch (e) {
      console.error('Erreur de parsing du panier:', e);
      return new Response('Format de panier invalide', { status: 400 });
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      console.error('Erreur: Panier vide après parsing');
      return new Response('Panier vide', { status: 400 });
    }

    // Vérifier que chaque élément du panier a les propriétés nécessaires
    const line_items = cart.map((item) => {
      if (!item.id || !item.name || item.price === undefined) {
        console.error('Élément de panier invalide:', item);
        throw new Error(`Élément de panier invalide: ${JSON.stringify(item)}`);
      }
      
      return {
        price_data: {
          currency: item.currency || 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: Number(item.price), // S'assurer que c'est un nombre
        },
        quantity: Number(item.qty) || 1,
      };
    });

    console.log('Création de la session Stripe avec les items:', JSON.stringify(line_items, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${new URL(request.url).origin}/?success=true`,
      cancel_url: `${new URL(request.url).origin}/?canceled=true`,
    });

    console.log('Session Stripe créée avec succès:', session.id);
    return Response.redirect(session.url, 303);

  } catch (error) {
    console.error('Erreur complète:', error);
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message);
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }
    return new Response(`Erreur lors du traitement de votre commande: ${error instanceof Error ? error.message : 'Erreur inconnue'}`, { 
      status: 500 
    });
  }
};