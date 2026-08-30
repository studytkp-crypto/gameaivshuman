import express from 'express';
import Stripe from 'stripe';
import { prisma } from '../db.js';
import { config } from '../config.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const stripe = new Stripe(config.stripeSecretKey);

// POST /api/stripe/create-checkout-session
router.post('/create-checkout-session', requireAuth, async (req, res) => {
  try {
    const user = req.user;

    // Check if live/test Stripe is configured
    if (!config.stripeSecretKey.startsWith('sk_test_mock')) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Human vs AI Premium Detective Pass',
                description: 'Unlimited 24/7 rounds, zero ads, category analytics & streak protection.'
              },
              unit_amount: 299, // $2.99
              recurring: {
                interval: 'month'
              }
            },
            quantity: 1
          }
        ],
        mode: 'subscription',
        success_url: `${config.clientUrl}/profile?upgrade_success=true`,
        cancel_url: `${config.clientUrl}/pricing?canceled=true`,
        customer_email: user.email,
        metadata: {
          userId: user.id
        }
      });

      return res.json({ checkoutUrl: session.url });
    }

    // For local dev without live Stripe key, provide instant simulation
    res.json({
      checkoutUrl: null,
      isSimulation: true,
      message: 'Dev mode: Click to simulate instant upgrade.'
    });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: 'Failed to initiate checkout session.' });
  }
});

// POST /api/stripe/simulate-upgrade (Instant Upgrade for Development & Testing)
router.post('/simulate-upgrade', requireAuth, async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { isPremium: true }
    });

    res.json({
      success: true,
      message: '🎉 Upgraded to Premium! Unlimited rounds and zero ads activated.',
      user: {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        isPremium: updated.isPremium
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upgrade account.' });
  }
});

export default router;
