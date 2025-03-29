import React from 'react';
import { GeneratorType } from './PasswordGenerator';

interface OptionsProps {
  generatorType: GeneratorType;
  setGeneratorType: (type: GeneratorType) => void;
  // Password options
  passwordLength: number;
  setPasswordLength: (length: number) => void;
  includeUppercase: boolean;
  setIncludeUppercase: (include: boolean) => void;
  includeNumbers: boolean;
  setIncludeNumbers: (include: boolean) => void;
  includeSymbols: boolean;
  setIncludeSymbols: (include: boolean) => void;
  // Passphrase options
  passphraseLength: number;
  setPassphraseLength: (length: number) => void;
  passphraseSeparator: string;
  setPassphraseSeparator: (separator: string) => void;
  passphraseIncludeNumber: boolean; // New prop
  setPassphraseIncludeNumber: (include: boolean) => void; // New prop setter
  // Action
  onGenerate: () => void;
}

export const Options: React.FC<OptionsProps> = ({
  generatorType,
  setGeneratorType,
  passwordLength,
  setPasswordLength,
  includeUppercase,
  setIncludeUppercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols,
  passphraseLength,
  setPassphraseLength,
  passphraseSeparator,
  setPassphraseSeparator,
  passphraseIncludeNumber, // Destructure new prop
  setPassphraseIncludeNumber, // Destructure new prop setter
  onGenerate,
}) => {
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeneratorType(event.target.value as GeneratorType);
  };

  return (
    <div className="space-y-6">
      {/* Generator Type Selection */}
      <fieldset className="border border-gray-300 p-4 rounded-md">
        <legend className="text-sm font-medium text-gray-700 px-1">Generator Type</legend>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="generatorType"
              value="password"
              checked={generatorType === 'password'}
              onChange={handleTypeChange}
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">Password</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="generatorType"
              value="passphrase"
              checked={generatorType === 'passphrase'}
              onChange={handleTypeChange}
              className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">Passphrase</span>
          </label>
        </div>
      </fieldset>

      {/* Password Options */}
      {generatorType === 'password' && (
        <div className="space-y-4 border border-gray-300 p-4 rounded-md">
           <h3 className="text-sm font-medium text-gray-700 -mt-7 px-1 bg-white w-fit">Password Options</h3>
          <div>
            <label htmlFor="passwordLength" className="block text-sm font-medium text-gray-700 mb-1">
              Password Length: <span className="font-semibold">{passwordLength}</span>
            </label>
            <input
              id="passwordLength"
              type="range"
              min="8"
              max="64"
              value={passwordLength}
              onChange={(e) => setPasswordLength(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Numbers (0-9)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Symbols (!@#$)</span>
            </label>
          </div>
        </div>
      )}

      {/* Passphrase Options */}
      {generatorType === 'passphrase' && (
        <div className="space-y-4 border border-gray-300 p-4 rounded-md">
           <h3 className="text-sm font-medium text-gray-700 -mt-7 px-1 bg-white w-fit">Passphrase Options</h3>
          <div>
            <label htmlFor="passphraseLength" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Words: <span className="font-semibold">{passphraseLength}</span>
            </label>
            <input
              id="passphraseLength"
              type="range"
              min="3"
              max="10"
              value={passphraseLength}
              onChange={(e) => setPassphraseLength(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="passphraseSeparator" className="block text-sm font-medium text-gray-700 mb-1">
                Separator
              </label>
              <input
                id="passphraseSeparator"
                type="text"
                value={passphraseSeparator}
                onChange={(e) => setPassphraseSeparator(e.target.value)}
                maxLength={1} // Keep separator to single character for simplicity
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
             {/* New Checkbox for including number */}
            <div className="flex items-end pb-1">
               <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={passphraseIncludeNumber}
                  onChange={(e) => setPassphraseIncludeNumber(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">Include Number</span>
              </label>
            </div>
          </div>
        </div>
      )}

       {/* Generate Button */}
       <button
        onClick={onGenerate}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      >
        Generate
      </button>
    </div>
  );
};
