import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  animalCharacters,
  humanCharacters,
  locations,
  magicObjects,
  moods,
  lightings,
  phenomena,
  visualDetails,
  emotionalNotes,
} from '../../../lib/storyData';
import { checkAccess } from '../../../lib/access';

function secureRandom(max) {
  return crypto.randomInt(0, max);
}

// Picks an index not already used in `excluded`. When the pool runs out,
// it resets — same "anti-repeat until exhausted, then reshuffle" behaviour
// as the original offline generator's shuffled queues.
function pickIndexExcluding(length, excluded) {
  let pool = [];
  for (let i = 0; i < length; i++) {
    if (!excluded.includes(i)) pool.push(i);
  }
  if (pool.length === 0) {
    excluded = [];
    for (let i = 0; i < length; i++) pool.push(i);
  }
  const idx = pool[secureRandom(pool.length)];
  return { idx, excluded: [...excluded, idx] };
}

function getStyleForCharacter(isAnimal) {
  const flip = secureRandom(10) < 3; // 30% chance to flip, same as original
  if (flip) {
    return isAnimal ? 'Pixar 3D style' : 'Beatrix Potter style';
  }
  return isAnimal ? 'Beatrix Potter style' : 'Pixar 3D style';
}

function buildPrompt({ charDesc, style, location, magicObj, mood, lighting, phenomenon, detail, emotion, isHuman }) {
  const anatomy = isHuman
    ? ', perfect anatomy, correct proportions, well-formed hands and fingers, natural body posture, anatomically accurate'
    : '';

  const structures = [
    `${charDesc}, ${location}, holding ${magicObj}, ${phenomenon}, ${mood} atmosphere, ${lighting}, ${detail}, ${emotion}${anatomy}, ${style} --ar 9:16 --v 7`,
    `${style}: ${charDesc} discovered in ${location} with ${magicObj}, ${phenomenon} all around, ${lighting}, ${mood}, ${detail}, ${emotion}${anatomy} --ar 9:16 --v 7`,
    `${charDesc} in ${location}, ${magicObj} nearby, ${phenomenon}, ${mood} mood, ${lighting}, ${emotion}, ${detail}${anatomy}, ${style} --ar 9:16 --v 7`,
    `Fairy tale scene: ${charDesc}, ${location}, ${phenomenon}, ${magicObj} glowing in their hands, ${lighting}, ${mood}, ${style}, ${detail}, ${emotion}${anatomy} --ar 9:16 --v 7`,
    `${charDesc} — ${location} — ${phenomenon} — ${mood} — ${lighting} — with ${magicObj} — ${detail} — ${emotion}${anatomy} — ${style} --ar 9:16 --v 7`,
    `${style} illustration: ${charDesc}, standing in ${location}, ${phenomenon}, ${mood} atmosphere, ${lighting}, ${magicObj} at their feet, ${emotion}, ${detail}${anatomy} --ar 9:16 --v 7`,
    `In ${location}, ${charDesc} clutches ${magicObj} as ${phenomenon}, ${mood} and breathtaking, ${lighting}, ${detail}, ${emotion}${anatomy}, ${style} --ar 9:16 --v 7`,
    `${charDesc}, ${mood}, surrounded by ${phenomenon} in ${location}, the ${magicObj} casting light, ${lighting}, ${emotion}, ${detail}${anatomy}, ${style} --ar 9:16 --v 7`,
  ];
  return structures[secureRandom(structures.length)];
}

function makeTitle(tale) {
  const titles = [
    `The Tale of ${tale}`,
    `Once Upon a Time`,
    `A ${tale} Story`,
    `The Enchanted ${tale}`,
    `${tale} Reimagined`,
  ];
  return titles[secureRandom(titles.length)];
}

export async function POST(request) {
  const hasAccess = await checkAccess(request);
  if (!hasAccess) {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const used = body.used || {};
  const newUsed = {};

  const useTwo = secureRandom(3) === 0;

  let charDesc, isHuman, isAnimalStyle, tale;

  if (useTwo) {
    const a = pickIndexExcluding(animalCharacters.length, used.animalChars || []);
    const h = pickIndexExcluding(humanCharacters.length, used.humanChars || []);
    newUsed.animalChars = a.excluded;
    newUsed.humanChars = h.excluded;
    const animal = animalCharacters[a.idx];
    const human = humanCharacters[h.idx];
    charDesc = `${animal.name} alongside ${human.name}`;
    tale = animal.tale;
    isAnimalStyle = secureRandom(2) === 0;
    isHuman = true;
  } else {
    const fromHuman = secureRandom(2) === 0;
    if (fromHuman) {
      const h = pickIndexExcluding(humanCharacters.length, used.humanChars || []);
      newUsed.humanChars = h.excluded;
      newUsed.animalChars = used.animalChars || [];
      charDesc = humanCharacters[h.idx].name;
      tale = humanCharacters[h.idx].tale;
      isAnimalStyle = false;
      isHuman = true;
    } else {
      const a = pickIndexExcluding(animalCharacters.length, used.animalChars || []);
      newUsed.animalChars = a.excluded;
      newUsed.humanChars = used.humanChars || [];
      charDesc = animalCharacters[a.idx].name;
      tale = animalCharacters[a.idx].tale;
      isAnimalStyle = true;
      isHuman = false;
    }
  }

  const style = getStyleForCharacter(isAnimalStyle);

  const loc = pickIndexExcluding(locations.length, used.locations || []);
  newUsed.locations = loc.excluded;
  const location = locations[loc.idx];

  const obj = pickIndexExcluding(magicObjects.length, used.magicObjects || []);
  newUsed.magicObjects = obj.excluded;
  const magicObj = magicObjects[obj.idx];

  const mo = pickIndexExcluding(moods.length, used.moods || []);
  newUsed.moods = mo.excluded;
  const mood = moods[mo.idx];

  const li = pickIndexExcluding(lightings.length, used.lightings || []);
  newUsed.lightings = li.excluded;
  const lighting = lightings[li.idx];

  const ph = pickIndexExcluding(phenomena.length, used.phenomena || []);
  newUsed.phenomena = ph.excluded;
  const phenomenon = phenomena[ph.idx];

  const de = pickIndexExcluding(visualDetails.length, used.visualDetails || []);
  newUsed.visualDetails = de.excluded;
  const detail = visualDetails[de.idx];

  const em = pickIndexExcluding(emotionalNotes.length, used.emotionalNotes || []);
  newUsed.emotionalNotes = em.excluded;
  const emotion = emotionalNotes[em.idx];

  const prompt = buildPrompt({ charDesc, style, location, magicObj, mood, lighting, phenomenon, detail, emotion, isHuman });
  const title = makeTitle(tale);
  const description = `${charDesc} · ${location.split(',')[0]} · ${mood}`;

  return NextResponse.json({ title, description, prompt, used: newUsed });
}
