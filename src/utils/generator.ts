// Basic word list - consider using a larger, more standard list for production
// e.g., EFF word lists: https://www.eff.org/dice
const wordList = [
  'apple', 'banana', 'orange', 'grape', 'kiwi', 'lemon', 'lime', 'melon',
  'peach', 'pear', 'plum', 'berry', 'cherry', 'mango', 'papaya', 'cloud',
  'forest', 'mountain', 'river', 'ocean', 'desert', 'island', 'valley',
  'canyon', 'glacier', 'meadow', 'stream', 'breeze', 'shadow', 'spark',
  'whisper', 'echo', 'velvet', 'silk', 'linen', 'cotton', 'denim', 'flannel',
  'quartz', 'ruby', 'emerald', 'sapphire', 'diamond', 'topaz', 'amber',
  'ivory', 'bronze', 'copper', 'silver', 'gold', 'steel', 'iron', 'orbit',
  'galaxy', 'nebula', 'comet', 'planet', 'star', 'lunar', 'solar', 'cosmic',
  'puzzle', 'riddle', 'cipher', 'quest', 'journey', 'voyage', 'saga', 'myth'
];

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

interface PasswordOptions {
  length: number;
  uppercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

interface PassphraseOptions {
  wordCount: number;
  separator?: string;
  includeNumber?: boolean; // Added option
}

// Use crypto.getRandomValues for better randomness if available
const getRandomBytes = (count: number): Uint8Array => {
  const buffer = new Uint8Array(count);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(buffer);
  } else {
    // Fallback for environments without crypto.getRandomValues (less secure)
    for (let i = 0; i < count; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    console.warn('Using Math.random() for random number generation. Consider using a more secure source.');
  }
  return buffer;
};

const getRandomNumber = (max: number): number => {
  // Generate a random number between 0 (inclusive) and max (exclusive)
  // Use 4 bytes for a wider range and better distribution for larger max values
  const randomBytes = getRandomBytes(4);
  // Combine bytes into a 32-bit unsigned integer
  let value = 0;
  for (let i = 0; i < 4; i++) {
    value = (value << 8) | randomBytes[i];
  }
  // Scale to the desired range [0, max)
  return Math.abs(value) % max;
};


export const generatePassword = (options: PasswordOptions): string => {
  const { length, uppercase = true, numbers = true, symbols = true } = options;
  let charPool = lowercaseChars;
  let password = '';
  // Ensure at least one of each required character type
  const requiredChars: string[] = [];
  requiredChars.push(lowercaseChars[getRandomNumber(lowercaseChars.length)]); // Always include lowercase

  if (uppercase) {
    charPool += uppercaseChars;
    requiredChars.push(uppercaseChars[getRandomNumber(uppercaseChars.length)]);
  }
  if (numbers) {
    charPool += numberChars;
    requiredChars.push(numberChars[getRandomNumber(numberChars.length)]);
  }
  if (symbols) {
    charPool += symbolChars;
    requiredChars.push(symbolChars[getRandomNumber(symbolChars.length)]);
  }

   // Check if length is sufficient for required characters
   if (length < requiredChars.length) {
    console.error("Password length is too short to include all required character types.");
    // Handle this case: maybe return an error, or a password with fewer types
    // For now, let's just generate with available length using the pool
    let shortPassword = '';
     for (let i = 0; i < length; i++) {
       const randomIndex = getRandomNumber(charPool.length);
       shortPassword += charPool[randomIndex];
     }
     return shortPassword;
   }


  // Fill the rest of the password length
  const remainingLength = length - requiredChars.length;
  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = getRandomNumber(charPool.length);
    password += charPool[randomIndex];
  }

  // Add required characters to the generated string
  password += requiredChars.join('');

  // Shuffle the final password string for better randomness
  const passwordArray = password.split('');
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = getRandomNumber(i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]; // Swap elements
  }
  password = passwordArray.join('');


  // Ensure the final password has the exact required length (should be correct after shuffle)
  return password.slice(0, length);
};


export const generatePassphrase = (options: PassphraseOptions): string => {
  const { wordCount, separator = '-', includeNumber = false } = options;
  const passphraseItems: string[] = []; // Can hold words or numbers

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = getRandomNumber(wordList.length);
    passphraseItems.push(wordList[randomIndex]);
  }

  // If includeNumber is true and wordCount > 0, replace one word with a number
  if (includeNumber && wordCount > 0) {
    const numberToInsert = getRandomNumber(1000).toString(); // Generate number 0-999
    const indexToReplace = getRandomNumber(wordCount); // Get random index
    passphraseItems[indexToReplace] = numberToInsert;
  }

  return passphraseItems.join(separator);
};
