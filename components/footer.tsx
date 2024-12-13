import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="font-poppins text-white text-lg font-bold mb-4">About Us</h2>
            <p className="text-sm text-gray-400 leading-6">
              We specialize in crafting unforgettable experiences. From thrilling adventures to serene moments, we’re here to help you create cherished memories that last a lifetime.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="font-poppins text-white text-lg font-bold mb-4">Quick Links</h2>
            <ul className="text-sm text-gray-400">
              <li className="mb-2 hover:text-white">
                <a href="#activities">Activities</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#tickets">Buy Tickets</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#contact">Contact Us</a>
              </li>
              <li className="hover:text-white">
                <a href="#faq">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="font-poppins text-white text-lg font-bold mb-4">Follow Us</h2>
            <p className="text-sm text-gray-400 mb-4">
              Stay connected with us on social media to catch the latest updates, news, and exclusive offers!
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Facebook />
              </a>
              <a
                href="#twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Twitter />
              </a>
              <a
                href="#instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Instagram />
              </a>
              <a
                href="#linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 FunZone. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
