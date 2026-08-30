import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  jwtSecret: process.env.JWT_SECRET || 'human-vs-ai-super-secret-key-2026',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_mock_stripe_key_for_dev',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock_webhook_secret',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  freeRoundsPerDay: 10,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
