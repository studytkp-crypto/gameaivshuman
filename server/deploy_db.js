import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure DATABASE_URL and defaults exist
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'human-vs-ai-secret-key-2026';
process.env.PORT = process.env.PORT || '5000';

console.log('📦 Initializing Database with schema...');
console.log('   DATABASE_URL:', process.env.DATABASE_URL);

try {
  execSync('npx prisma db push --schema=./prisma/schema.prisma --accept-data-loss', {
    cwd: __dirname,
    stdio: 'inherit',
    env: { ...process.env }
  });

  console.log('🌱 Seeding initial game rounds & users...');
  execSync('node prisma/seed.js', {
    cwd: __dirname,
    stdio: 'inherit',
    env: { ...process.env }
  });

  console.log('✅ Database successfully initialized and seeded for production!');
} catch (err) {
  console.error('❌ Database deploy error:', err.message);
  process.exit(1);
}
