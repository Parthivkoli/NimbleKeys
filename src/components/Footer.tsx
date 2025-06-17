import React from 'react';
import { Github, Heart, Code, BookOpen, Shield, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                NimbleKeys
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              A modern, minimalist typing test inspired by MonkeyType. Improve your typing speed and accuracy with our clean, distraction-free interface.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Parthivkoli/NimbleKeys"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.querySelector('[tabindex="0"]')?.focus()}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Start Test
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/Parthivkoli/NimbleKeys#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3" />
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Parthivkoli/NimbleKeys/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Report Issues
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50';
                    modal.innerHTML = `
                      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl max-h-96 overflow-y-auto">
                        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Privacy Policy</h3>
                        <div class="text-gray-600 dark:text-gray-400 space-y-3">
                          <p><strong>Data Collection:</strong> NimbleKeys only stores your theme preference and last selected test mode in your browser's local storage. No personal data is collected or transmitted to external servers.</p>
                          <p><strong>Analytics:</strong> We do not use any analytics or tracking services.</p>
                          <p><strong>Cookies:</strong> We do not use cookies.</p>
                          <p><strong>Third-party Services:</strong> This application runs entirely in your browser and does not communicate with external services.</p>
                          <p><strong>Data Security:</strong> All data remains on your device and is never transmitted elsewhere.</p>
                        </div>
                        <button onclick="this.parentElement.parentElement.remove()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Close</button>
                      </div>
                    `;
                    document.body.appendChild(modal);
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1"
                >
                  <Shield className="w-3 h-3" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50';
                    modal.innerHTML = `
                      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl max-h-96 overflow-y-auto">
                        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Terms of Service</h3>
                        <div class="text-gray-600 dark:text-gray-400 space-y-3">
                          <p><strong>Usage:</strong> NimbleKeys is provided free of charge for personal and educational use.</p>
                          <p><strong>Availability:</strong> We strive to keep the service available but make no guarantees about uptime or availability.</p>
                          <p><strong>Content:</strong> The typing test content is generated from common English words and is provided as-is.</p>
                          <p><strong>Liability:</strong> NimbleKeys is provided "as is" without warranties of any kind.</p>
                          <p><strong>Open Source:</strong> This project is open source under the MIT License. You are free to use, modify, and distribute the code.</p>
                          <p><strong>Changes:</strong> We reserve the right to modify these terms at any time.</p>
                        </div>
                        <button onclick="this.parentElement.parentElement.remove()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Close</button>
                      </div>
                    `;
                    document.body.appendChild(modal);
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a
                  href="mailto:contact@nimblekeys.dev"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} NimbleKeys. Made with <Heart className="w-4 h-4 inline text-red-500" /> for the typing community.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Open Source</span>
              <span>•</span>
              <span>MIT License</span>
              <span>•</span>
              <a
                href="https://github.com/Parthivkoli/NimbleKeys"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Contribute
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}