'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/profiles', label: 'View Profiles' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/media', label: 'Media' },
    { href: '/contact', label: 'Contact' },
  ];

  const authLinks = user ? [
    { href: '/profile', label: 'Profile' },
    { onClick: handleLogout, label: 'Logout' }
  ] : [
    { href: '/register', label: 'Register' },
    { href: '/login', label: 'Login' }
  ];

  return (
    <nav className="fixed w-full bg-white shadow-md z-50 top-0 !important">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex flex-col items-start">
              <h2 className="text-2xl font-bold text-indigo-600">MANAS Foundation</h2>
              <span className="text-sm text-gray-500">Empowering Lives</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Donate
            </button>
            {authLinks.map((link) => (
              link.href ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button className="w-full mt-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Donate
          </button>
          {authLinks.map((link) => (
            link.href ? (
              <Link
                key={link.href}
                href={link.href}
                className="w-full mt-2 px-4 py-2 rounded-md text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.onClick}
                className="w-full mt-2 px-4 py-2 rounded-md text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
              >
                {link.label}
              </button>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 