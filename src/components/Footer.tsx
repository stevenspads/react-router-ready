import { Link } from 'react-router-dom';
import { siteConfig } from '../config';

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center md:h-16 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy;{' '}
          <Link to="/" className="underline-offset-4 hover:underline">
            {siteConfig.name}
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
