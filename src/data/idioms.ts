import { Idiom, LanguageCode } from '@/lib/types';

// Helper function to generate normalized embeddings
const generateEmbedding = (dimension: number = 512): number[] => {
  const vec = Array.from({ length: dimension }, () => Math.random() * 2 - 1);
  const magnitude = Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
  return vec.map(val => val / magnitude);
};

// English Idioms
const englishIdioms: Idiom[] = [
  { id: 'en-001', idiom: 'Break a leg', language: 'en', literalMeaning: 'To break one\'s leg', semanticMeaning: 'Good luck', context: 'Theater', category: 'encouragement', embedding: generateEmbedding() },
  { id: 'en-002', idiom: 'Bite the bullet', language: 'en', literalMeaning: 'Bite on a bullet', semanticMeaning: 'Endure hardship', context: 'Historical', category: 'courage', embedding: generateEmbedding() },
  { id: 'en-003', idiom: 'Hit the nail on the head', language: 'en', literalMeaning: 'Strike nail directly', semanticMeaning: 'Be exactly right', context: 'Carpentry', category: 'accuracy', embedding: generateEmbedding() },
  { id: 'en-004', idiom: 'Piece of cake', language: 'en', literalMeaning: 'Slice of cake', semanticMeaning: 'Very easy', context: 'Food', category: 'ease', embedding: generateEmbedding() },
  { id: 'en-005', idiom: 'Spill the beans', language: 'en', literalMeaning: 'Spill beans', semanticMeaning: 'Reveal secret', context: 'Ancient Greece', category: 'revelation', embedding: generateEmbedding() },
  { id: 'en-006', idiom: 'Raining cats and dogs', language: 'en', literalMeaning: 'Cats and dogs falling from sky', semanticMeaning: 'Heavy rain', context: 'Weather', category: 'nature', embedding: generateEmbedding() },
  { id: 'en-007', idiom: 'Under the weather', language: 'en', literalMeaning: 'Below weather', semanticMeaning: 'Feeling sick', context: 'Health', category: 'health', embedding: generateEmbedding() },
  { id: 'en-008', idiom: 'Burn the midnight oil', language: 'en', literalMeaning: 'Burn oil at midnight', semanticMeaning: 'Work late', context: 'Work', category: 'effort', embedding: generateEmbedding() },
  { id: 'en-009', idiom: 'Call it a day', language: 'en', literalMeaning: 'Name it a day', semanticMeaning: 'Stop working', context: 'Work', category: 'rest', embedding: generateEmbedding() },
  { id: 'en-010', idiom: 'Cut to the chase', language: 'en', literalMeaning: 'Cut to chase scene', semanticMeaning: 'Get to the point', context: 'Film', category: 'directness', embedding: generateEmbedding() },
  { id: 'en-011', idiom: 'Beating around the bush', language: 'en', literalMeaning: 'Hit around bush', semanticMeaning: 'Avoid the topic', context: 'Nature', category: 'avoidance', embedding: generateEmbedding() },
  { id: 'en-012', idiom: 'A piece of cake', language: 'en', literalMeaning: 'Piece of cake', semanticMeaning: 'Easy task', context: 'Food', category: 'ease', embedding: generateEmbedding() },
  { id: 'en-013', idiom: 'Best of both worlds', language: 'en', literalMeaning: 'Best from two worlds', semanticMeaning: 'Ideal situation', context: 'Philosophy', category: 'ideal', embedding: generateEmbedding() },
  { id: 'en-014', idiom: 'Blind as a bat', language: 'en', literalMeaning: 'Blind like a bat', semanticMeaning: 'Cannot see', context: 'Animals', category: 'inability', embedding: generateEmbedding() },
  { id: 'en-015', idiom: 'Bright and early', language: 'en', literalMeaning: 'Bright and early', semanticMeaning: 'Very early morning', context: 'Time', category: 'time', embedding: generateEmbedding() },
  { id: 'en-016', idiom: 'Butterflies in stomach', language: 'en', literalMeaning: 'Butterflies in stomach', semanticMeaning: 'Nervous feeling', context: 'Emotion', category: 'emotion', embedding: generateEmbedding() },
  { id: 'en-017', idiom: 'Cry over spilled milk', language: 'en', literalMeaning: 'Cry over milk', semanticMeaning: 'Regret past', context: 'Food', category: 'futility', embedding: generateEmbedding() },
  { id: 'en-018', idiom: 'Down to earth', language: 'en', literalMeaning: 'Down to earth', semanticMeaning: 'Realistic person', context: 'Nature', category: 'personality', embedding: generateEmbedding() },
  { id: 'en-019', idiom: 'Draw the line', language: 'en', literalMeaning: 'Draw a line', semanticMeaning: 'Set a limit', context: 'Geometry', category: 'boundary', embedding: generateEmbedding() },
  { id: 'en-020', idiom: 'Every dog has its day', language: 'en', literalMeaning: 'Every dog has a day', semanticMeaning: 'Everyone gets a chance', context: 'Animals', category: 'fairness', embedding: generateEmbedding() },
];

// German Idioms
const germanIdioms: Idiom[] = [
  { id: 'de-001', idiom: 'Hals- und Beinbruch', language: 'de', literalMeaning: 'Neck and leg break', semanticMeaning: 'Good luck', context: 'German', category: 'encouragement', embedding: generateEmbedding() },
  { id: 'de-002', idiom: 'Die Daumen drücken', language: 'de', literalMeaning: 'Press thumbs', semanticMeaning: 'Keep fingers crossed', context: 'Gesture', category: 'encouragement', embedding: generateEmbedding() },
  { id: 'de-003', idiom: 'Ins Schwarze treffen', language: 'de', literalMeaning: 'Hit the black', semanticMeaning: 'Hit bullseye', context: 'Target', category: 'accuracy', embedding: generateEmbedding() },
  { id: 'de-004', idiom: 'Ein Kinderspiel', language: 'de', literalMeaning: 'Child\'s play', semanticMeaning: 'Very easy', context: 'Game', category: 'ease', embedding: generateEmbedding() },
  { id: 'de-005', idiom: 'Die Katze aus dem Sack lassen', language: 'de', literalMeaning: 'Let cat out of bag', semanticMeaning: 'Reveal secret', context: 'Market', category: 'revelation', embedding: generateEmbedding() },
  { id: 'de-006', idiom: 'Tomaten auf den Augen haben', language: 'de', literalMeaning: 'Have tomatoes on eyes', semanticMeaning: 'Not seeing obvious', context: 'Food', category: 'blindness', embedding: generateEmbedding() },
  { id: 'de-007', idiom: 'Mit Pauken und Trompeten', language: 'de', literalMeaning: 'With drums and trumpets', semanticMeaning: 'With great fanfare', context: 'Music', category: 'emphasis', embedding: generateEmbedding() },
  { id: 'de-008', idiom: 'Kopf und Kragen riskieren', language: 'de', literalMeaning: 'Risk head and collar', semanticMeaning: 'Risk everything', context: 'Clothing', category: 'risk', embedding: generateEmbedding() },
  { id: 'de-009', idiom: 'Jemanden über den Tisch ziehen', language: 'de', literalMeaning: 'Pull someone over table', semanticMeaning: 'Cheat someone', context: 'Table', category: 'deception', embedding: generateEmbedding() },
  { id: 'de-010', idiom: 'Blau machen', language: 'de', literalMeaning: 'Make blue', semanticMeaning: 'Skip work', context: 'Color', category: 'absence', embedding: generateEmbedding() },
  { id: 'de-011', idiom: 'Schmetterlinge im Bauch haben', language: 'de', literalMeaning: 'Have butterflies in belly', semanticMeaning: 'Nervous excitement', context: 'Emotion', category: 'emotion', embedding: generateEmbedding() },
  { id: 'de-012', idiom: 'Das ist mir schnuppe', language: 'de', literalMeaning: 'That is me shoelace', semanticMeaning: 'I don\'t care', context: 'Clothing', category: 'indifference', embedding: generateEmbedding() },
  { id: 'de-013', idiom: 'Auf der Leitung stehen', language: 'de', literalMeaning: 'Stand on the line', semanticMeaning: 'Not understanding', context: 'Communication', category: 'confusion', embedding: generateEmbedding() },
  { id: 'de-014', idiom: 'Fersengeld geben', language: 'de', literalMeaning: 'Give heel money', semanticMeaning: 'Run away', context: 'Money', category: 'escape', embedding: generateEmbedding() },
  { id: 'de-015', idiom: 'Jemandem einen Bären aufbinden', language: 'de', literalMeaning: 'Tie bear on someone', semanticMeaning: 'Tell tall tale', context: 'Animals', category: 'deception', embedding: generateEmbedding() },
  { id: 'de-016', idiom: 'Sich in die Nesseln setzen', language: 'de', literalMeaning: 'Sit in nettles', semanticMeaning: 'Get in trouble', context: 'Nature', category: 'trouble', embedding: generateEmbedding() },
  { id: 'de-017', idiom: 'Der Lackmus-Test', language: 'de', literalMeaning: 'The litmus test', semanticMeaning: 'Decisive test', context: 'Chemistry', category: 'testing', embedding: generateEmbedding() },
  { id: 'de-018', idiom: 'Nicht alle Latten am Zaun haben', language: 'de', literalMeaning: 'Not all slats on fence', semanticMeaning: 'Not very intelligent', context: 'Building', category: 'intelligence', embedding: generateEmbedding() },
  { id: 'de-019', idiom: 'Grüner Punkt', language: 'de', literalMeaning: 'Green dot', semanticMeaning: 'Environmentally friendly', context: 'Environment', category: 'ecology', embedding: generateEmbedding() },
  { id: 'de-020', idiom: 'Ohr am Gleis haben', language: 'de', literalMeaning: 'Have ear on track', semanticMeaning: 'Be informed', context: 'Transport', category: 'knowledge', embedding: generateEmbedding() },
];

// Italian Idioms
const italianIdioms: Idiom[] = [
  { id: 'it-001', idiom: 'In bocca al lupo', language: 'it', literalMeaning: 'Into wolf\'s mouth', semanticMeaning: 'Good luck', context: 'Animal', category: 'encouragement', embedding: generateEmbedding() },
  { id: 'it-002', idiom: 'Mordere il freno', language: 'it', literalMeaning: 'Bite the bridle', semanticMeaning: 'Show impatience', context: 'Horse', category: 'emotion', embedding: generateEmbedding() },
  { id: 'it-003', idiom: 'Colpire nel segno', language: 'it', literalMeaning: 'Hit the mark', semanticMeaning: 'Be exactly right', context: 'Target', category: 'accuracy', embedding: generateEmbedding() },
  { id: 'it-004', idiom: 'È una passeggiata', language: 'it', literalMeaning: 'It\'s a walk', semanticMeaning: 'Very easy', context: 'Movement', category: 'ease', embedding: generateEmbedding() },
  { id: 'it-005', idiom: 'Vuotare il sacco', language: 'it', literalMeaning: 'Empty the sack', semanticMeaning: 'Reveal everything', context: 'Container', category: 'revelation', embedding: generateEmbedding() },
  { id: 'it-006', idiom: 'Andare al diavolo', language: 'it', literalMeaning: 'Go to the devil', semanticMeaning: 'Go away', context: 'Religion', category: 'dismissal', embedding: generateEmbedding() },
  { id: 'it-007', idiom: 'Avere la testa fra le nuvole', language: 'it', literalMeaning: 'Have head in clouds', semanticMeaning: 'Be distracted', context: 'Nature', category: 'distraction', embedding: generateEmbedding() },
  { id: 'it-008', idiom: 'Cadere dalle nuvole', language: 'it', literalMeaning: 'Fall from clouds', semanticMeaning: 'Be surprised', context: 'Weather', category: 'surprise', embedding: generateEmbedding() },
  { id: 'it-009', idiom: 'Dare i numeri', language: 'it', literalMeaning: 'Give the numbers', semanticMeaning: 'Act crazy', context: 'Math', category: 'behavior', embedding: generateEmbedding() },
  { id: 'it-010', idiom: 'Mangiare la foglia', language: 'it', literalMeaning: 'Eat the leaf', semanticMeaning: 'Understand something', context: 'Nature', category: 'understanding', embedding: generateEmbedding() },
  { id: 'it-011', idiom: 'Non stare in gioco', language: 'it', literalMeaning: 'Not play the game', semanticMeaning: 'Not participate', context: 'Game', category: 'participation', embedding: generateEmbedding() },
  { id: 'it-012', idiom: 'Prendere il volo', language: 'it', literalMeaning: 'Take flight', semanticMeaning: 'Become successful', context: 'Movement', category: 'success', embedding: generateEmbedding() },
  { id: 'it-013', idiom: 'Restare senza fiato', language: 'it', literalMeaning: 'Stay without breath', semanticMeaning: 'Be breathless', context: 'Physiology', category: 'amazement', embedding: generateEmbedding() },
  { id: 'it-014', idiom: 'Saltare di gioia', language: 'it', literalMeaning: 'Jump with joy', semanticMeaning: 'Be very happy', context: 'Emotion', category: 'happiness', embedding: generateEmbedding() },
  { id: 'it-015', idiom: 'Scappare con la coda fra le gambe', language: 'it', literalMeaning: 'Run with tail between legs', semanticMeaning: 'Run away defeated', context: 'Animal', category: 'defeat', embedding: generateEmbedding() },
  { id: 'it-016', idiom: 'Tenere a bada', language: 'it', literalMeaning: 'Keep at bay', semanticMeaning: 'Keep away from', context: 'Military', category: 'control', embedding: generateEmbedding() },
  { id: 'it-017', idiom: 'Toccare il cielo con un dito', language: 'it', literalMeaning: 'Touch sky with finger', semanticMeaning: 'Be supremely happy', context: 'Religion', category: 'happiness', embedding: generateEmbedding() },
  { id: 'it-018', idiom: 'Uscire di testa', language: 'it', literalMeaning: 'Exit from head', semanticMeaning: 'Go mad', context: 'Anatomy', category: 'madness', embedding: generateEmbedding() },
  { id: 'it-019', idiom: 'Volare via', language: 'it', literalMeaning: 'Fly away', semanticMeaning: 'Escape quickly', context: 'Movement', category: 'escape', embedding: generateEmbedding() },
  { id: 'it-020', idiom: 'Zitto come un pesce', language: 'it', literalMeaning: 'Silent as a fish', semanticMeaning: 'Very quiet', context: 'Animal', category: 'silence', embedding: generateEmbedding() },
];

// Portuguese Idioms
const portugueseIdioms: Idiom[] = [
  { id: 'pt-001', idiom: 'Quebrar uma perna', language: 'pt', literalMeaning: 'Break a leg', semanticMeaning: 'Good luck', context: 'Theater', category: 'encouragement', embedding: generateEmbedding() },
  { id: 'pt-002', idiom: 'Morder a língua', language: 'pt', literalMeaning: 'Bite tongue', semanticMeaning: 'Hold back words', context: 'Anatomy', category: 'control', embedding: generateEmbedding() },
  { id: 'pt-003', idiom: 'Acertar na mosca', language: 'pt', literalMeaning: 'Hit the fly', semanticMeaning: 'Be exactly right', context: 'Hunting', category: 'accuracy', embedding: generateEmbedding() },
  { id: 'pt-004', idiom: 'Mamão com açúcar', language: 'pt', literalMeaning: 'Papaya with sugar', semanticMeaning: 'Very easy', context: 'Food', category: 'ease', embedding: generateEmbedding() },
  { id: 'pt-005', idiom: 'Abrir o jogo', language: 'pt', literalMeaning: 'Open the game', semanticMeaning: 'Be honest', context: 'Card game', category: 'honesty', embedding: generateEmbedding() },
  { id: 'pt-006', idiom: 'Bater na madeira', language: 'pt', literalMeaning: 'Knock on wood', semanticMeaning: 'For good luck', context: 'Superstition', category: 'luck', embedding: generateEmbedding() },
  { id: 'pt-007', idiom: 'Cair do cavalo', language: 'pt', literalMeaning: 'Fall from horse', semanticMeaning: 'Be very surprised', context: 'Animal', category: 'surprise', embedding: generateEmbedding() },
  { id: 'pt-008', idiom: 'Dar uma mãozinha', language: 'pt', literalMeaning: 'Give a little hand', semanticMeaning: 'Help a bit', context: 'Anatomy', category: 'help', embedding: generateEmbedding() },
  { id: 'pt-009', idiom: 'Estar com a cabeça nas nuvens', language: 'pt', literalMeaning: 'Have head in clouds', semanticMeaning: 'Be distracted', context: 'Nature', category: 'distraction', embedding: generateEmbedding() },
  { id: 'pt-010', idiom: 'Fazer tempestade em copo d\'água', language: 'pt', literalMeaning: 'Make storm in cup of water', semanticMeaning: 'Make big deal of nothing', context: 'Weather', category: 'exaggeration', embedding: generateEmbedding() },
  { id: 'pt-011', idiom: 'Ganhar a vida', language: 'pt', literalMeaning: 'Win life', semanticMeaning: 'Make a living', context: 'Life', category: 'livelihood', embedding: generateEmbedding() },
  { id: 'pt-012', idiom: 'Hábito não faz monge', language: 'pt', literalMeaning: 'Habit does not make monk', semanticMeaning: 'Appearance is deceptive', context: 'Religion', category: 'deception', embedding: generateEmbedding() },
  { id: 'pt-013', idiom: 'Ir ao encontro', language: 'pt', literalMeaning: 'Go to meeting', semanticMeaning: 'Meet someone', context: 'Movement', category: 'meeting', embedding: generateEmbedding() },
  { id: 'pt-014', idiom: 'Jogo de cintura', language: 'pt', literalMeaning: 'Waist game', semanticMeaning: 'Diplomacy', context: 'Anatomy', category: 'diplomacy', embedding: generateEmbedding() },
  { id: 'pt-015', idiom: 'Levar um susto', language: 'pt', literalMeaning: 'Take a scare', semanticMeaning: 'Get frightened', context: 'Emotion', category: 'fear', embedding: generateEmbedding() },
  { id: 'pt-016', idiom: 'Meter a mão', language: 'pt', literalMeaning: 'Put hand in', semanticMeaning: 'Meddle', context: 'Anatomy', category: 'interference', embedding: generateEmbedding() },
  { id: 'pt-017', idiom: 'Não dar um pio', language: 'pt', literalMeaning: 'Not say a peep', semanticMeaning: 'Stay quiet', context: 'Sound', category: 'silence', embedding: generateEmbedding() },
  { id: 'pt-018', idiom: 'Olhar nos olhos', language: 'pt', literalMeaning: 'Look in the eyes', semanticMeaning: 'Face someone', context: 'Anatomy', category: 'confrontation', embedding: generateEmbedding() },
  { id: 'pt-019', idiom: 'Pagar justos pelos pecadores', language: 'pt', literalMeaning: 'Pay just for sinners', semanticMeaning: 'Be punished for others', context: 'Religion', category: 'injustice', embedding: generateEmbedding() },
  { id: 'pt-020', idiom: 'Quebra-galho', language: 'pt', literalMeaning: 'Break branch', semanticMeaning: 'Makeshift solution', context: 'Nature', category: 'solution', embedding: generateEmbedding() },
];

// Russian Idioms
const russianIdioms: Idiom[] = [
  { id: 'ru-001', idiom: 'Ни пуха ни пера', language: 'ru', literalMeaning: 'Neither fluff nor feather', semanticMeaning: 'Good luck', context: 'Hunting', category: 'encouragement', embedding: generateEmbedding() },
  { id: 'ru-002', idiom: 'Стиснуть зубы', language: 'ru', literalMeaning: 'Clench teeth', semanticMeaning: 'Endure hardship', context: 'Anatomy', category: 'courage', embedding: generateEmbedding() },
  { id: 'ru-003', idiom: 'Попасть в точку', language: 'ru', literalMeaning: 'Hit the point', semanticMeaning: 'Be exactly right', context: 'Target', category: 'accuracy', embedding: generateEmbedding() },
  { id: 'ru-004', idiom: 'Раз плюнуть', language: 'ru', literalMeaning: 'One spit', semanticMeaning: 'Very easy', context: 'Action', category: 'ease', embedding: generateEmbedding() },
  { id: 'ru-005', idiom: 'Выложить карты', language: 'ru', literalMeaning: 'Lay out cards', semanticMeaning: 'Reveal truth', context: 'Game', category: 'revelation', embedding: generateEmbedding() },
  { id: 'ru-006', idiom: 'Работать как лошадь', language: 'ru', literalMeaning: 'Work like a horse', semanticMeaning: 'Work very hard', context: 'Animal', category: 'effort', embedding: generateEmbedding() },
  { id: 'ru-007', idiom: 'Душа нараспашку', language: 'ru', literalMeaning: 'Soul wide open', semanticMeaning: 'Be very open', context: 'Emotion', category: 'openness', embedding: generateEmbedding() },
  { id: 'ru-008', idiom: 'Дело в шляпе', language: 'ru', literalMeaning: 'Case in hat', semanticMeaning: 'Everything is fine', context: 'Clothing', category: 'success', embedding: generateEmbedding() },
  { id: 'ru-009', idiom: 'Заводить романтику', language: 'ru', literalMeaning: 'Start romance', semanticMeaning: 'Flirt', context: 'Emotion', category: 'romance', embedding: generateEmbedding() },
  { id: 'ru-010', idiom: 'Зубом щёлкать', language: 'ru', literalMeaning: 'Click teeth', semanticMeaning: 'Be eager', context: 'Anatomy', category: 'eagerness', embedding: generateEmbedding() },
  { id: 'ru-011', idiom: 'Иголка в стоге сена', language: 'ru', literalMeaning: 'Needle in haystack', semanticMeaning: 'Impossible to find', context: 'Farming', category: 'difficulty', embedding: generateEmbedding() },
  { id: 'ru-012', idiom: 'Кровь с молоком', language: 'ru', literalMeaning: 'Blood with milk', semanticMeaning: 'Healthy appearance', context: 'Food', category: 'health', embedding: generateEmbedding() },
  { id: 'ru-013', idiom: 'Лёгкая рука', language: 'ru', literalMeaning: 'Light hand', semanticMeaning: 'Good luck', context: 'Anatomy', category: 'luck', embedding: generateEmbedding() },
  { id: 'ru-014', idiom: 'Мозговой штурм', language: 'ru', literalMeaning: 'Brain storm', semanticMeaning: 'Brainstorming', context: 'Weather', category: 'thinking', embedding: generateEmbedding() },
  { id: 'ru-015', idiom: 'Нервы шалят', language: 'ru', literalMeaning: 'Nerves play up', semanticMeaning: 'Be nervous', context: 'Emotion', category: 'emotion', embedding: generateEmbedding() },
  { id: 'ru-016', idiom: 'Открыть объятья', language: 'ru', literalMeaning: 'Open arms', semanticMeaning: 'Welcome warmly', context: 'Anatomy', category: 'welcome', embedding: generateEmbedding() },
  { id: 'ru-017', idiom: 'Палка о двух концах', language: 'ru', literalMeaning: 'Stick with two ends', semanticMeaning: 'Double-edged sword', context: 'Tool', category: 'duality', embedding: generateEmbedding() },
  { id: 'ru-018', idiom: 'Рассеянный взгляд', language: 'ru', literalMeaning: 'Scattered look', semanticMeaning: 'Absent-minded', context: 'Emotion', category: 'distraction', embedding: generateEmbedding() },
  { id: 'ru-019', idiom: 'Светлая голова', language: 'ru', literalMeaning: 'Light head', semanticMeaning: 'Be clever', context: 'Anatomy', category: 'intelligence', embedding: generateEmbedding() },
  { id: 'ru-020', idiom: 'Темная лошадка', language: 'ru', literalMeaning: 'Dark horse', semanticMeaning: 'Unknown quantity', context: 'Animal', category: 'mystery', embedding: generateEmbedding() },
];

// Turkish Idioms
const turkishIdioms: Idiom[] = [
  { id: 'tr-001', idiom: 'Bol şans', language: 'tr', literalMeaning: 'Abundant luck', semanticMeaning: 'Good luck', context: 'General', category: 'encouragement', embedding: generateEmbedding() },
  { id: 'tr-002', idiom: 'Dişini sıkmak', language: 'tr', literalMeaning: 'Clench teeth', semanticMeaning: 'Endure difficulty', context: 'Anatomy', category: 'courage', embedding: generateEmbedding() },
  { id: 'tr-003', idiom: 'Tam isabet', language: 'tr', literalMeaning: 'Direct hit', semanticMeaning: 'Exactly right', context: 'Military', category: 'accuracy', embedding: generateEmbedding() },
  { id: 'tr-004', idiom: 'Çocuk oyuncağı', language: 'tr', literalMeaning: 'Child\'s toy', semanticMeaning: 'Very easy', context: 'Game', category: 'ease', embedding: generateEmbedding() },
  { id: 'tr-005', idiom: 'Sır vermek', language: 'tr', literalMeaning: 'Give secret', semanticMeaning: 'Reveal secret', context: 'Secrecy', category: 'revelation', embedding: generateEmbedding() },
  { id: 'tr-006', idiom: 'Saçını yolmak', language: 'tr', literalMeaning: 'Pull out hair', semanticMeaning: 'Be frustrated', context: 'Anatomy', category: 'frustration', embedding: generateEmbedding() },
  { id: 'tr-007', idiom: 'Şans yüzü gülmek', language: 'tr', literalMeaning: 'Luck smiles', semanticMeaning: 'Be lucky', context: 'Emotion', category: 'luck', embedding: generateEmbedding() },
  { id: 'tr-008', idiom: 'Ayakkabı değiştirmek', language: 'tr', literalMeaning: 'Change shoes', semanticMeaning: 'Put yourself in their place', context: 'Clothing', category: 'empathy', embedding: generateEmbedding() },
  { id: 'tr-009', idiom: 'Baş ağrısı olmak', language: 'tr', literalMeaning: 'Be a headache', semanticMeaning: 'Be troublesome', context: 'Anatomy', category: 'trouble', embedding: generateEmbedding() },
  { id: 'tr-010', idiom: 'Bardağı taşıran son damla', language: 'tr', literalMeaning: 'Last drop overflowing', semanticMeaning: 'Last straw', context: 'Liquid', category: 'limit', embedding: generateEmbedding() },
  { id: 'tr-011', idiom: 'Bir çıkmazda kalmak', language: 'tr', literalMeaning: 'Be in dead end', semanticMeaning: 'Be stuck', context: 'Road', category: 'difficulty', embedding: generateEmbedding() },
  { id: 'tr-012', idiom: 'Bir fincan kahvenin kırk yıl hatırı vardır', language: 'tr', literalMeaning: 'Cup of coffee has 40 years memory', semanticMeaning: 'Kindness is long remembered', context: 'Food', category: 'memory', embedding: generateEmbedding() },
  { id: 'tr-013', idiom: 'Boş ver', language: 'tr', literalMeaning: 'Leave empty', semanticMeaning: 'Never mind', context: 'General', category: 'dismissal', embedding: generateEmbedding() },
  { id: 'tr-014', idiom: 'Burnunun ucunu görmemek', language: 'tr', literalMeaning: 'Not see nose tip', semanticMeaning: 'Be blind to obvious', context: 'Anatomy', category: 'blindness', embedding: generateEmbedding() },
  { id: 'tr-015', idiom: 'Çamura saplanmış olmak', language: 'tr', literalMeaning: 'Be stuck in mud', semanticMeaning: 'Be in trouble', context: 'Nature', category: 'trouble', embedding: generateEmbedding() },
  { id: 'tr-016', idiom: 'Çıt çıkarmamak', language: 'tr', literalMeaning: 'Make no sound', semanticMeaning: 'Keep quiet', context: 'Sound', category: 'silence', embedding: generateEmbedding() },
  { id: 'tr-017', idiom: 'Değerli taş', language: 'tr', literalMeaning: 'Precious stone', semanticMeaning: 'Valuable person', context: 'Mineral', category: 'value', embedding: generateEmbedding() },
  { id: 'tr-018', idiom: 'Düş görmek', language: 'tr', literalMeaning: 'See dream', semanticMeaning: 'Have ambition', context: 'Sleep', category: 'dreams', embedding: generateEmbedding() },
  { id: 'tr-019', idiom: 'Fikrinin ucundan geçmemek', language: 'tr', literalMeaning: 'Not cross mind tip', semanticMeaning: 'Never occur to', context: 'Thought', category: 'ignorance', embedding: generateEmbedding() },
  { id: 'tr-020', idiom: 'Gözü kara', language: 'tr', literalMeaning: 'Dark eye', semanticMeaning: 'Determined', context: 'Anatomy', category: 'determination', embedding: generateEmbedding() },
];

// Database combining all idioms
export const idiomDatabase: Record<LanguageCode, Idiom[]> = {
  en: englishIdioms,
  de: germanIdioms,
  it: italianIdioms,
  pt: portugueseIdioms,
  ru: russianIdioms,
  tr: turkishIdioms,
};

export const getAllIdioms = (): Idiom[] => {
  return Object.values(idiomDatabase).flat();
};

export const getIdiomsByLanguage = (language: LanguageCode): Idiom[] => {
  return idiomDatabase[language] || [];
};

export const getIdiomsCount = (): Record<LanguageCode, number> => {
  return {
    en: englishIdioms.length,
    de: germanIdioms.length,
    it: italianIdioms.length,
    pt: portugueseIdioms.length,
    ru: russianIdioms.length,
    tr: turkishIdioms.length,
  };
};
