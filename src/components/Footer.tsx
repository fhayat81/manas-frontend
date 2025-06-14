import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Foundation Info */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-900 mb-2">MANAS Foundation</h2>
            <p className="mb-4 text-gray-600">Empowering Lives Through Meaningful Connections</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-indigo-50 hover:bg-indigo-100 rounded-full transition">
                <FaFacebook className="text-2xl text-indigo-600" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-indigo-50 hover:bg-indigo-100 rounded-full transition">
                <FaXTwitter className="text-2xl text-indigo-600" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-indigo-50 hover:bg-indigo-100 rounded-full transition">
                <FaInstagram className="text-2xl text-indigo-600" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 bg-indigo-50 hover:bg-indigo-100 rounded-full transition">
                <FaLinkedin className="text-2xl text-indigo-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-indigo-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-indigo-600 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-indigo-600 transition">About Us</Link></li>
              <li><Link href="/register" className="hover:text-indigo-600 transition">Register</Link></li>
              <li><Link href="/profiles" className="hover:text-indigo-600 transition">View Profiles</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold text-indigo-900 mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-indigo-600 transition">Contact Us</Link></li>
              <li><Link href="/donate" className="hover:text-indigo-600 transition">Donate</Link></li>
              <li><Link href="/get-involved" className="hover:text-indigo-600 transition">Get Involved</Link></li>
              <li><Link href="/media" className="hover:text-indigo-600 transition">Media</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-indigo-900 mb-3">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span role="img" aria-label="email" className="text-lg">📧</span>
                <span>connect@manasfoundation.org</span>
              </li>
              <li className="flex items-center gap-2">
                <span role="img" aria-label="phone" className="text-lg">📱</span>
                <span>+91-98765-43210</span>
              </li>
              <li className="flex items-center gap-2">
                <span role="img" aria-label="location" className="text-lg">📍</span>
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-500 text-sm">
          © 2024 MANAS Foundation. All rights reserved. Made with <span className="inline-block align-middle text-pink-500">💗</span> for empowering women.
        </div>
      </div>
    </footer>
  );
} 