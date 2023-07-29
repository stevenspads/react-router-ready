import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container flex flex-col items-center mx-auto space-y-12">
      <header className="space-y-4 text-center max-w-2xl">
        <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl">Welcome</h1>
        <p className="sm:text-xl">Welcome to our site.</p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="/about"
            className="inline-flex items-center justify-center h-10 py-2 px-4 bg-black text-white rounded-md font-medium text-sm"
          >
            About
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center h-10 py-2 px-4 bg-black text-white rounded-md font-medium text-sm"
          >
            Products
          </Link>
        </div>
      </header>
      <section>The home page.</section>
    </div>
  );
}
