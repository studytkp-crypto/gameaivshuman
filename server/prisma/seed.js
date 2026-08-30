import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SEED_ROUNDS = [
  // 1. Animals - Golden Retriever
  {
    category: 'Animals',
    imageAUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'A joyful golden retriever sitting on dewy green grass in a sunny park with soft cinematic bokeh and perfect glossy fur.',
    realSource: 'Unsplash / Eric Ward (Real Photo)',
    aiClues: 'Look closely at the ear fur highlights and perfectly symmetrical whiskers on Image B — typical diffusion rendering smoothing.',
    difficulty: 'medium'
  },
  // 2. Portraits - Woman Freckles
  {
    category: 'Portraits',
    imageAUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'Studio portrait of a woman with freckles and amber eyes under warm golden hour rim lighting, 85mm lens f/1.4.',
    realSource: 'Unsplash / Jurica Koletić (Real Photo)',
    aiClues: 'Image A exhibits hyper-uniform skin pores and slightly inconsistent earring reflections on the left lobe.',
    difficulty: 'hard'
  },
  // 3. Food - Gourmet Burger
  {
    category: 'Food',
    imageAUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Artisanal brioche double cheeseburger with melting cheddar, caramelized onions, and crisp lettuce on dark rustic slate.',
    realSource: 'Unsplash / Amirali Mirhashemian (Real Photo)',
    aiClues: 'The sesame seeds on the bun in Image B follow an unnaturally repetitive geometric alignment with identical specular reflections.',
    difficulty: 'easy'
  },
  // 4. Architecture - Modern Living Room
  {
    category: 'Architecture',
    imageAUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Ultra-modern Scandinavian minimalist living room with floor-to-ceiling glass windows overlooking a snowy pine forest.',
    realSource: 'Unsplash / Patrick Perkins (Real Photo)',
    aiClues: 'In Image B, the window mullions do not align precisely with the exterior snow reflections and floor shadows.',
    difficulty: 'medium'
  },
  // 5. Nature - Yosemite Valley
  {
    category: 'Nature',
    imageAUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Pristine mountain alpine lake reflecting snow-capped jagged peaks at sunrise with violet mist and wild lupines.',
    realSource: 'Unsplash / Bailey Zindel (Real Photo)',
    aiClues: 'Image B water ripples show impossible wave interference patterns that contradict the wind direction shown in the trees.',
    difficulty: 'hard'
  },
  // 6. Vehicles - Supercar Highway
  {
    category: 'Vehicles',
    imageAUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'Sleek matte black aerodynamic electric supercar speeding down wet asphalt highway under neon city streetlights at dusk.',
    realSource: 'Unsplash / Campbell (Real Photo)',
    aiClues: 'Image A has slightly warped wheel rim spokes and asymmetric headlight internal lens elements.',
    difficulty: 'medium'
  },
  // 7. Portraits - Beard Architect
  {
    category: 'Portraits',
    imageAUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Close-up portrait of a 40-year-old architect with salt-and-pepper beard, smiling naturally against an industrial brick wall.',
    realSource: 'Unsplash / Joseph Gonzalez (Real Photo)',
    aiClues: 'Check the teeth alignment and edge transition where the collar fabric meets the neck in Image B.',
    difficulty: 'medium'
  },
  // 8. Food - Neapolitan Pizza
  {
    category: 'Food',
    imageAUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'Freshly baked Neapolitan pizza with blistered charred crust, melted buffalo mozzarella, fresh basil leaves, and olive oil drizzle.',
    realSource: 'Unsplash / Fernando Andrade (Real Photo)',
    aiClues: 'Image A exhibits liquid basil leaf texture blending seamlessly into cheese without physical boundary edges.',
    difficulty: 'hard'
  },
  // 9. Animals - Puppy Blanket
  {
    category: 'Animals',
    imageAUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'A tiny fluffy puppy looking up with large glassy innocent eyes on a knitted wool blanket in morning sunlight.',
    realSource: 'Unsplash / Karsten Winegeart (Real Photo)',
    aiClues: 'Image A has an extra digital claw blending into the blanket fabric.',
    difficulty: 'easy'
  },
  // 10. Cyberpunk - Tokyo Alley
  {
    category: 'Cyberpunk',
    imageAUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Futuristic neo-Tokyo rain-slicked alleyway with holographic billboards, neon purple steam, and flying drone taxis.',
    realSource: 'Unsplash / Aleksandar Pasaric (Real Photo)',
    aiClues: 'The Japanese kanji characters on the neon signs in Image B are gibberish pseudo-glyphs generated by the neural network.',
    difficulty: 'easy'
  },
  // 11. Architecture - Luxury Villa
  {
    category: 'Architecture',
    imageAUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'Contemporary brutalist glass and concrete cliffside mansion with infinity pool reflecting twilight sky over the Mediterranean.',
    realSource: 'Unsplash / Frames For Your Heart (Real Photo)',
    aiClues: 'Image A has structural cantilever beams that do not connect physically to the supporting foundation pillars.',
    difficulty: 'medium'
  },
  // 12. Nature - Foggy Forest
  {
    category: 'Nature',
    imageAUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Deep enchanted ancient redwood forest with sun rays piercing through thick morning mist, mossy fern carpet.',
    realSource: 'Unsplash / V2osk (Real Photo)',
    aiClues: 'Sunlight crepuscular rays in Image B originate from multiple contradictory vanishing points.',
    difficulty: 'hard'
  },
  // 13. Food - Donut & Pastries
  {
    category: 'Food',
    imageAUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Artisan gourmet pastry platter with glazed strawberry donuts, edible gold flakes, and organic pistachio crumbles.',
    realSource: 'Unsplash / Heather Barnes (Real Photo)',
    aiClues: 'Glaze drip physics in Image B defy gravity by curling upward and fusing unnaturally with the sprinkles.',
    difficulty: 'easy'
  },
  // 14. Portraits - Fashion Silk Scarf
  {
    category: 'Portraits',
    imageAUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'High-fashion editorial portrait of a model with geometric makeup and silk scarf blowing in wind against pastel studio backdrop.',
    realSource: 'Unsplash / Valerie Elash (Real Photo)',
    aiClues: 'Image A shows hair strands that merge directly into the texture of the silk scarf without independent geometry.',
    difficulty: 'medium'
  },
  // 15. Animals - Cat Velvet Chair
  {
    category: 'Animals',
    imageAUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'British shorthair cat with copper eyes sitting on a velvet armchair, photorealistic cinematic lighting.',
    realSource: 'Unsplash / Mikhail Vasilyev (Real Photo)',
    aiClues: 'Image B has asymmetric eye pupil shapes with mismatched catchlight window reflections.',
    difficulty: 'hard'
  },
  // 16. Vehicles - Vintage Motorcycle
  {
    category: 'Vehicles',
    imageAUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Custom vintage cafe racer motorcycle parked outside a rustic brick coffeehouse in Brooklyn at golden hour.',
    realSource: 'Unsplash / Harley-Davidson (Real Photo)',
    aiClues: 'The engine exhaust pipe in Image B branches into an impossible loop that feeds back into the carburetor.',
    difficulty: 'easy'
  },
  // 17. Art - Surrealist Oil Painting
  {
    category: 'Art',
    imageAUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'Surrealist Renaissance oil painting with rich impasto brushstrokes, golden baroque frame, and textured canvas cracks.',
    realSource: 'Unsplash / Europeana (Real Museum Artifact)',
    aiClues: 'Digital brushstrokes in Image A lack authentic three-dimensional paint depth and shadow occlusions.',
    difficulty: 'hard'
  },
  // 18. Nature - Starry Alpine Peak
  {
    category: 'Nature',
    imageAUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Milky way galaxy shining brightly over snow-covered volcanic peaks with bioluminescent glacial stream.',
    realSource: 'Unsplash / Kalen Emsley (Real Photo)',
    aiClues: 'The star constellations in Image B contain repeating grid artifacts and impossible nebular spiraling.',
    difficulty: 'medium'
  },
  // 19. Food - Strawberry Shortcake
  {
    category: 'Food',
    imageAUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'Multi-layer strawberry chiffon shortcake with whipped vanilla cream, mint leaves, and glossy red berry glaze.',
    realSource: 'Unsplash / Deva Williamson (Real Photo)',
    aiClues: 'Image A has strawberry seeds that morph smoothly into whipped cream bubbles without distinct seeds.',
    difficulty: 'easy'
  },
  // 20. Architecture - Eco Skyscraper
  {
    category: 'Architecture',
    imageAUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Futuristic sustainable eco-skyscraper covered in hanging gardens, solar glass panels, and sky bridges.',
    realSource: 'Unsplash / Sean Pollock (Real Photo)',
    aiClues: 'In Image B, sky bridge structures terminate abruptly mid-air without structural load anchors.',
    difficulty: 'medium'
  },
  // 21. Animals - Red Fox in Snow
  {
    category: 'Animals',
    imageAUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'Majestic red fox with bushy white-tipped tail standing alert in powdered deep snow under soft winter morning glow.',
    realSource: 'Unsplash / Ray Hennessy (Real Wildlife Photo)',
    aiClues: 'Image A has whiskers that cross in an unnatural lattice grid pattern against the dark background.',
    difficulty: 'medium'
  },
  // 22. Portraits - Coffee Barista
  {
    category: 'Portraits',
    imageAUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Specialty coffee barista pouring swan latte art with steam rising in cozy warmly lit brick cafe.',
    realSource: 'Unsplash / Demi DeHerrera (Real Photo)',
    aiClues: 'In Image B, the apron strap attaches to the shirt at an anatomically distorted angle without tension lines.',
    difficulty: 'hard'
  },
  // 23. Cyberpunk - Neon Cyborg
  {
    category: 'Cyberpunk',
    imageAUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'A',
    prompt: 'Cybernetic human android with glowing cyan circuit implants along the jawline, reflecting holographic displays in rain.',
    realSource: 'Unsplash / Avel Chuklanov (Real Cosplay Photo)',
    aiClues: 'Image A displays circuit traces that fade out into blurred skin texture without realistic depth or hardware seamlines.',
    difficulty: 'easy'
  },
  // 24. Art - Japanese Woodblock Ukiyo-e
  {
    category: 'Art',
    imageAUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1582561077759-994df58a43fe?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Traditional Japanese Edo-period woodblock print of Mount Fuji with crashing wave foam and textured handmade washi paper.',
    realSource: 'Unsplash / Birmingham Museums Trust (Authentic Artifact)',
    aiClues: 'Image B contains wood grain lines that bend smoothly around wave contours, which is physically impossible in carved woodblocks.',
    difficulty: 'hard'
  },
  // 25. Nature - Tropical Waterfall
  {
    category: 'Nature',
    imageAUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    imageBUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=800&q=80',
    aiSlot: 'B',
    prompt: 'Lush tropical waterfall plunging into crystal emerald pool surrounded by giant wild monstera plants and rainbow mist.',
    realSource: 'Unsplash / Blake Verdoorn (Real Photo)',
    aiClues: 'Water foam particles in Image B float detached in mid-air rather than conforming to fluid vortex motion.',
    difficulty: 'medium'
  }
];

async function seed() {
  console.log('🌱 Seeding Human vs AI Game database with expanded 25+ matched pairs...');

  // 1. Clear existing
  await prisma.attempt.deleteMany();
  await prisma.dailyChallenge.deleteMany();
  await prisma.round.deleteMany();
  await prisma.streak.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Default Admin & Test Users
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@humanvsai.game',
      passwordHash,
      name: 'Chief Investigator',
      avatar: '🛡️',
      role: 'admin',
      isPremium: true
    }
  });

  const player = await prisma.user.create({
    data: {
      email: 'player@humanvsai.game',
      passwordHash,
      name: 'Cyber Detective',
      avatar: '🕵️',
      role: 'user',
      isPremium: false
    }
  });

  // Create streak record
  await prisma.streak.create({
    data: {
      userId: player.id,
      currentStreak: 5,
      bestStreak: 12,
      lastPlayedDate: new Date().toISOString().split('T')[0]
    }
  });

  // 3. Seed Rounds
  const createdRounds = [];
  for (const round of SEED_ROUNDS) {
    const r = await prisma.round.create({
      data: {
        mode: 'image',
        category: round.category,
        imageAUrl: round.imageAUrl,
        imageBUrl: round.imageBUrl,
        aiSlot: round.aiSlot,
        prompt: round.prompt,
        realSource: round.realSource,
        aiClues: round.aiClues,
        difficulty: round.difficulty,
        playsCount: Math.floor(Math.random() * 150) + 20,
        correctCount: Math.floor(Math.random() * 95) + 12
      }
    });
    createdRounds.push(r);
  }

  // 4. Create Today's Daily Challenge
  const todayDate = new Date().toISOString().split('T')[0];
  if (createdRounds.length > 0) {
    await prisma.dailyChallenge.create({
      data: {
        roundId: createdRounds[0].id,
        date: todayDate,
        sponsorName: 'Google Gemini 2.0 & AI Studio',
        sponsorLogo: '⚡',
        sponsorUrl: 'https://aistudio.google.com'
      }
    });
  }

  console.log(`✅ Database successfully seeded with:`);
  console.log(`   - ${createdRounds.length} High-Resolution Matched Game Rounds`);
  console.log(`   - 2 Seeded Users (admin@humanvsai.game, player@humanvsai.game)`);
  console.log(`   - 1 Daily Challenge for ${todayDate}`);
}

seed()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
