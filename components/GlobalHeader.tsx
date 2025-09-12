import Link from 'next/link';

const GlobalHeader = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 border-b border-gray-700">
          <Link href="/" className="text-xl font-bold">
            My Portfolio
          </Link>
          <nav className="flex space-x-6 text-sm md:text-base">
            <a href="#profile" className="text-gray-300 hover:text-white transition-colors">
              Profile
            </a>
            <a href="#skills" className="text-gray-300 hover:text-white transition-colors">
              Skills
            </a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
              Projects
            </a>

            <a href="#timeline" className="text-gray-300 hover:text-white transition-colors">
              Activities
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;