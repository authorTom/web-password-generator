import React, { useState, useCallback } from 'react';
import { PasswordDisplay } from './PasswordDisplay';
import { Options } from './Options';
import { generatePassword, generatePassphrase } from '../utils/generator';

export type GeneratorType = 'password' | 'passphrase';

export const PasswordGenerator: React.FC = () => {
  const [generatedValue, setGeneratedValue] = useState<string>('');
  const [generatorType, setGeneratorType] = useState<GeneratorType>('password');
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [passphraseLength, setPassphraseLength] = useState<number>(4);
  const [passphraseSeparator, setPassphraseSeparator] = useState<string>('-');

  const handleGenerate = useCallback(() => {
    if (generatorType === 'password') {
      const newPassword = generatePassword({
        length: passwordLength,
        uppercase: includeUppercase,
        numbers: includeNumbers,
        symbols: includeSymbols,
      });
      setGeneratedValue(newPassword);
    } else {
      const newPassphrase = generatePassphrase({
        wordCount: passphraseLength,
        separator: passphraseSeparator,
      });
      setGeneratedValue(newPassphrase);
    }
  }, [
    generatorType,
    passwordLength,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    passphraseLength,
    passphraseSeparator,
  ]);

  // Generate initial password on load
  React.useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);


  return (
    <div className="max-w-xl w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Password Generator</h1>

      <PasswordDisplay value={generatedValue} onGenerate={handleGenerate} />

      <Options
        generatorType={generatorType}
        setGeneratorType={setGeneratorType}
        passwordLength={passwordLength}
        setPasswordLength={setPasswordLength}
        includeUppercase={includeUppercase}
        setIncludeUppercase={setIncludeUppercase}
        includeNumbers={includeNumbers}
        setIncludeNumbers={setIncludeNumbers}
        includeSymbols={includeSymbols}
        setIncludeSymbols={setIncludeSymbols}
        passphraseLength={passphraseLength}
        setPassphraseLength={setPassphraseLength}
        passphraseSeparator={passphraseSeparator}
        setPassphraseSeparator={setPassphraseSeparator}
        onGenerate={handleGenerate}
      />
    </div>
  );
};
