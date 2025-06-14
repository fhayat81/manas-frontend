'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-indigo-600 sm:text-5xl md:text-6xl">
              Contact Us
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get in touch with us for any questions, support, or to learn more about our mission.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Form (left) */}
            <div className="bg-white shadow-lg rounded-lg p-8 order-1 lg:order-none">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md outline-gray-500 shadow-lg focus:border-indigo-600 focus:outline-indigo-600 px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md outline-gray-500 border-gray-500 shadow-lg focus:border-indigo-600 focus:outline-indigo-600 px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md outline-gray-500 border-gray-500 shadow-lg focus:border-indigo-600 focus:outline-indigo-600 px-3 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md outline-gray-500 border-gray-500 shadow-lg focus:border-indigo-600 focus:outline-indigo-600 px-3 py-2"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information (right) */}
            <div className="bg-indigo-50 rounded-lg p-8 text-gray-900 order-2 lg:order-none">
              <h2 className="text-3xl font-bold text-indigo-600 mb-8">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">📧</span>
                  <div>
                    <span className="font-bold text-gray-900">Email:</span><br />
                    <span className="text-indigo-800">connect@manasfoundation.org</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">📱</span>
                  <div>
                    <span className="font-bold text-gray-900">Phone:</span><br />
                    <span className="text-indigo-800">+91-98765-43210</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-1">📍</span>
                  <div>
                    <span className="font-bold text-gray-900">Address:</span><br />
                    <span className="text-indigo-800">123 Empowerment Street<br />New Delhi, India - 110001</span>
                  </div>
                </div>
              </div>
              {/* Follow Us Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Follow Us</h3>
                <div className="grid grid-cols-4 gap-4 justify-items-center">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white border border-indigo-200 hover:bg-indigo-100 rounded-lg transition">
                    <FaFacebook className="text-3xl text-indigo-600" />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white border border-indigo-200 hover:bg-indigo-100 rounded-lg transition">
                    <FaXTwitter className="text-3xl text-indigo-600" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white border border-indigo-200 hover:bg-indigo-100 rounded-lg transition">
                    <FaInstagram className="text-3xl text-indigo-600" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white border border-indigo-200 hover:bg-indigo-100 rounded-lg transition">
                    <FaLinkedin className="text-3xl text-indigo-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 