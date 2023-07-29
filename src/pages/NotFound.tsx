import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center mx-auto space-y-12">
      <header className="space-y-2 text-center">
        <h2 className="font-bold text-3xl md:text-6xl">404</h2>
        <p className="text-lg font-light">The page you requested was not found.</p>
        <p>
          <Link to="/">Back home</Link>
        </p>
      </header>
    </div>
  );
}
