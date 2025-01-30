import { Facebook, Github, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 w-full mt-[10%]">
    <div className="max-w-6xl mx-auto px-6">
      {/* <div className="grid md:grid-cols-3 gap-8"> */}
        {/* Left - Branding */}
        {/* <div>
          <h2 className="text-xl font-bold text-white">MyCompany</h2>
          <p className="text-gray-400 mt-2">
            Building innovative solutions for a better future.
          </p>
        </div> */}

        {/* Center - Quick Links */}
        {/* <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Services</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Careers</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">Contact</a>
            </li>
          </ul>
        </div> */}

        {/* Right - Social Media */}
        {/* <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-white transition">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Twitter size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Linkedin size={22} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Github size={22} />
            </a>
          </div>
        </div>
      </div> */}

      {/* Bottom Section */}

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} CodeKro All rights reserved.
      </div>
    </div>
  </footer>
  )
}

export default Footer