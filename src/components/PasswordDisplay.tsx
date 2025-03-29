import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

interface PasswordDisplayProps {
  value: string;
  onGenerate: () => void;
}

export const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ value, onGenerate }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(() => {
    if (!value) return;
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        // Optionally show an error message to the user
      });
  }, [value]);

  return (
    <div className="relative flex items-center bg-gray-100 p-4 rounded-md border border-gray-200">
      <span className="flex-grow text-lg font-mono text-gray-700 break-all mr-4">
        {value || 'Generate a password...'}
      </span>
      <div className="flex space-x-2">
         <button
          onClick={onGenerate}
          className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition duration-150 ease-in-out"
          aria-label="Generate new password"
          title="Generate New"
        >
          <RefreshCw size={20} />
        </button>
        <button
          onClick={handleCopy}
          className={`p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded-md transition duration-150 ease-in-out ${
            copied
              ? 'text-green-600 hover:text-green-700 focus:ring-green-500'
              : 'hover:text-blue-600 focus:ring-blue-500'
          }`}
          aria-label="Copy password to clipboard"
          title={copied ? 'Copied!' : 'Copy to Clipboard'}
          disabled={!value}
        >
          <Copy size={20} />
        </button>
      </div>
      {copied && (
        <span className="absolute -top-8 right-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
          Copied!
        </span>
      )}
    </div>
  );
};
