import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          My Portfolio
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-cyan-400">Home</Link>
          <Link href="/about" className="hover:text-cyan-400">About</Link>
          <Link href="/works" className="hover:text-cyan-400">Works</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;