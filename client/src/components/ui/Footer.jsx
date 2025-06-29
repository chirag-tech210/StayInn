import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Globe, Shield, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  StayInn
                </h3>
                <p className="text-sm text-blue-300">by Chirag Yadav</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience the future of travel with our curated collection of unique accommodations across India. 
              Where technology meets authentic hospitality.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/40 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/40 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/40 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              Support
            </h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Safety Information</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Cancellation Options</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">24/7 Support</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Emergency Contact</Link></li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Hosting
            </h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Become a Host</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Hosting Resources</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Community Forum</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Host Protection</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Hosting Guidelines</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              Company
            </h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">About StayInn</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">News & Updates</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Press</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <p>&copy; 2024 StayInn, Inc. All rights reserved.</p>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>by Chirag Yadav</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link>
            </div>

            {/* Language & Currency */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.905 1.028a1 1 0 11-1.44 1.389c-.555-.649-1.091-1.329-1.606-2.031H3a1 1 0 110-2h1.32A18.87 18.87 0 013.578 8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" clipRule="evenodd" />
                </svg>
                <span>₹ INR</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>English (IN)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
