# Password Generator

A simple, web-based password generator that creates secure passwords and passphrases with customisable complexity and length.

## Overview

This project is a test project for AI coding, developed using Google's Gemini 2.5 Experimental. It demonstrates the capabilities of AI in creating practical web applications.

## Features

- Generate random secure passwords with customizable:
  - Length
  - Complexity (include uppercase, lowercase, numbers, special characters)
- Generate memorable passphrases with options for:
  - Number of words (2-10)
  - Word separator (space, hyphen, period, etc.)
- Copy to clipboard functionality
- Mobile-friendly responsive design
- No data collection or storage - everything runs in your browser

## Usage

Visit the website and choose between:

1. **Password Generator**:
   - Set desired length
   - Select character types (uppercase, lowercase, numbers, symbols)
   - Click "Generate" to create a new password

2. **Passphrase Generator**:
   - Set number of words
   - Choose word separator
   - Select capitalization style
   - Enable/disable number substitutions
   - Click "Generate" to create a new passphrase

## Installation

If you want to run this project locally:

```bash
# Clone the repository
git clone https://github.com/username/password-generator.git

# Navigate to the project directory
cd password-generator

# Open index.html in your browser
```

## Security

The generator uses cryptographically secure random number generation through the browser's Web Crypto API when available. All password generation happens locally in your browser - no passwords are sent over the network or stored anywhere.

## License

This project is released under the [MIT License](LICENSE), which means you can do whatever you want with the code.

## Contributing

This is a test project for AI coding capabilities, but contributions are welcome! Feel free to fork the repository and submit pull requests.

## Acknowledgments

- Created using Google's Gemini 2.5 Experimental
- Built with React.js and Tailwind CSS
