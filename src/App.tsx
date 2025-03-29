import React from 'react';
import { PasswordGenerator } from './components/PasswordGenerator';
import { Github } from 'lucide-react'; // Using Github icon as a placeholder logo

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
       <div className="absolute top-4 left-4 text-blue-700">
         <Github size={32} /> {/* Placeholder Logo */}
       </div>
      <PasswordGenerator />
       <footer className="mt-8 text-center text-gray-600 text-sm">
        Built with React & Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;
