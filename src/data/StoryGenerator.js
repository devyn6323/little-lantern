export function generateToddlerStory({
  childName,
  ageRange,
  storyType,
  character,
  lesson,
  length,
}) {
  const name = childName.trim() || "your little one";
  const companionName = getRandomCompanionName();

  const storyOpening = getStoryOpening(storyType, name, character, companionName);
  const storyMiddle = getStoryMiddle(storyType, name, character, lesson, companionName);
  const extraScene = getExtraScene(storyType, name, character, lesson, length, companionName);
  const storyEnding = getStoryEnding(storyType, name, character, companionName);

  return {
    title: `${name} and the Little ${character}`,
    text: `
${storyOpening}

${storyMiddle}

${extraScene}

${storyEnding}

The end.
    `.trim(),
    type: storyType,
    lesson,
    character,
    ageRange,
    length,
  };
}

function getRandomCompanionName() {
    const names = ["Milo", "Luna", "Pip", "Nora", "Benny", "Sunny"];

    const randomIndex = Math.floor(Math.random() * names.length);

    return names[randomIndex];
}

function getStoryOpening(storyType, name, character, companionName) {
  if (storyType === "Bedtime") {
    return `The moon was glowing softly when ${name} met a sleepy little ${character.toLowerCase()} named ${companionName}.`;
  }

  if (storyType === "Silly") {
    return `One sunny morning, ${name} met a very silly ${character.toLowerCase()} named ${companionName} who was wearing socks on his ears.`;
  }

  if (storyType === "Adventure") {
    return `${name} packed a tiny backpack and met a brave little ${character.toLowerCase()} named ${companionName} near a sparkling path.`;
  }

  if (storyType === "Learning") {
    return `${name} met a curious little ${character.toLowerCase()} named ${companionName} who loved colors, numbers, and new words.`;
  }

  if (storyType === "Calm Down") {
    return `${name} found a quiet place under a soft tree and met a gentle little ${character.toLowerCase()} named ${companionName}.`;
  }

  return `Once upon a time, ${name} met a little ${character.toLowerCase()} named ${companionName}.`;
}

function getStoryMiddle(storyType, name, character, lesson, companionName) {
  if (storyType === "Bedtime") {
    return `
${companionName} rubbed his sleepy eyes and whispered, "I want to learn about ${lesson.toLowerCase()} before bed."

${name} helped ${companionName} take slow steps, use a soft voice, and make kind choices.

They watched one little star, then two little stars, then three little stars twinkle in the sky.

${companionName} smiled and said, "I feel calm now."
    `.trim();
  }

  if (storyType === "Silly") {
    return `
${companionName} wanted to learn about ${lesson.toLowerCase()}, but first he accidentally put a banana on his head like a hat.

${name} giggled and helped ${companionName} try again.

${companionName} made a funny sound, spun in a circle, and then remembered to make a kind choice.

Everyone laughed, and ${companionName} learned that being silly and being kind can happen at the same time.
    `.trim();
  }

  if (storyType === "Adventure") {
    return `
${companionName} wanted to learn about ${lesson.toLowerCase()}, so ${name} and ${companionName} followed the sparkling path.

They crossed a soft grass hill, tiptoed past blue flowers, and found a tiny bridge.

At the bridge, ${companionName} had a chance to practice the lesson.

${companionName} made a brave and kind choice, and the path glowed brighter.
    `.trim();
  }

  if (storyType === "Learning") {
    return `
${companionName} wanted to learn about ${lesson.toLowerCase()}.

First, ${name} found one red flower.

Then ${companionName} found two yellow stars.

Together they found three blue birds singing in a tree.

${companionName} practiced the lesson and learned new words along the way.
    `.trim();
  }

  if (storyType === "Calm Down") {
    return `
${companionName} felt a little upset and wanted to learn about ${lesson.toLowerCase()}.

${name} said, "Let's take a slow breath."

They breathed in like smelling a flower.

Then they breathed out like blowing a bubble.

${companionName} tried again, used gentle words, and felt his body become calm.
    `.trim();
  }

  return `
${companionName} wanted to learn about ${lesson.toLowerCase()}.

${name} helped ${companionName} try, practice, and make a kind choice.

${companionName} felt proud, and ${name} felt happy too.
  `.trim();
}

function getExtraScene(storyType, name, character, lesson, length, companionName) {
  if (length === "Short") {
    return "";
  }

  if (length === "Medium") {
    return getMediumScene(storyType, name, character, lesson, companionName);
  }

  if (length === "Long") {
    return `
${getMediumScene(storyType, name, character, lesson, companionName)}

${getLongScene(storyType, name, character, lesson, companionName)}
    `.trim();
  }

  return "";
}

function getMediumScene(storyType, name, character, lesson, companionName) {
  if (storyType === "Bedtime") {
    return `${name} helped ${companionName} fluff his pillow, tuck in his blanket, and remember one kind thing from the day.`;
  }

  if (storyType === "Silly") {
    return `Then ${companionName} tried to hop like a frog, but landed gently on a pillow and made ${name} laugh again.`;
  }

  if (storyType === "Adventure") {
    return `${name} and ${companionName} found a tiny glowing door. Behind it was a garden full of friendly fireflies.`;
  }

  if (storyType === "Learning") {
    return `${name} pointed to a circle, a square, and a triangle. ${companionName} clapped each time he found the right shape.`;
  }

  if (storyType === "Calm Down") {
    return `${name} and ${companionName} counted five slow breaths together: one, two, three, four, five.`;
  }

  return `${name} and ${companionName} practiced ${lesson.toLowerCase()} one more time.`;
}

function getLongScene(storyType, name, character, lesson, companionName) {
  if (storyType === "Bedtime") {
    return `${companionName} looked at the moon and whispered, "Tomorrow I can try again." ${name} smiled, because that was a peaceful thought.`;
  }

  if (storyType === "Silly") {
    return `A tiny bird flew by wearing a leaf as a hat. ${companionName} waved and said, "Nice hat!"`;
  }

  if (storyType === "Adventure") {
    return `At the end of the path, they found a small treasure chest. Inside was a note that said, "Kind hearts are the best treasure."`;
  }

  if (storyType === "Learning") {
    return `${companionName} counted his steps as he walked: one, two, three, four. Then he named the colors he saw.`;
  }

  if (storyType === "Calm Down") {
    return `${companionName} placed one hand on his tummy and felt it rise and fall. His face felt soft, and his shoulders relaxed.`;
  }

  return `${name} and ${companionName} felt proud because they kept practicing ${lesson.toLowerCase()}.`;
}

function getStoryEnding(storyType, name, character, companionName) {
  if (storyType === "Bedtime") {
    return `The little ${character.toLowerCase()} curled up under a soft blanket. ${name} smiled as the room grew quiet and peaceful.`;
  }

  if (storyType === "Silly") {
    return `The little ${character.toLowerCase()} did one last wiggle dance, and ${name} laughed all the way home.`;
  }

  if (storyType === "Adventure") {
    return `${name} and the little ${character.toLowerCase()} found their way home, proud of their brave little adventure.`;
  }

  if (storyType === "Learning") {
    return `${name} and the little ${character.toLowerCase()} clapped for one, two, three happy cheers.`;
  }

  if (storyType === "Calm Down") {
    return `The little ${character.toLowerCase()} felt safe and peaceful. ${name} gave a gentle smile, and everything felt okay again.`;
  }

  return `${name} and the little ${character.toLowerCase()} had a very good day.`;
}