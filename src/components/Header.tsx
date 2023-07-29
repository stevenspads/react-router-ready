import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../config';
import { useUser, UserButton } from '@clerk/clerk-react';
import useAdmin from '../hooks/useAdmin';

export default function Header() {
  const { isSignedIn } = useUser();
  const isAdmin = useAdmin();

  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return isActive ? 'font-semibold' : '';
  };

  return (
    <header className="sticky w-full border-b shadow-sm backdrop-blur">
      <div className="container flex items-center justify-between h-14 mx-auto">
        <div className="flex items-center space-x-6 md:gap-10">
          <Link to="/">
            <h1 className="font-bold">{siteConfig.name}</h1>
          </Link>
          <nav className="flex items-center space-x-6">
            <NavLink to="/about" className={getNavLinkClasses}>
              About
            </NavLink>
            <NavLink to="/products" className={getNavLinkClasses}>
              Products
            </NavLink>
          </nav>
        </div>
        {isSignedIn && (
          <div className="flex items-center space-x-4">
            <UserButton />
            {isAdmin && (
              <NavLink to="/dashboard" className={getNavLinkClasses}>
                Dashboard
              </NavLink>
            )}
          </div>
        )}
        {!isSignedIn && (
          <div className="flex items-center space-x-4">
            <NavLink to="/sign-in" className={getNavLinkClasses}>
              Sign in
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
