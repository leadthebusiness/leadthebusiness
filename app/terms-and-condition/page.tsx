import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-300">Lead The Business</p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            By signing up or purchasing a product/service from Lead The Business, you agree to the following terms and conditions:
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10">
          {/* Account & Access */}
          <section className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">🔐</span>
              Account & Access
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>When you register with us, you agree to provide accurate details and keep them updated.</p>
              <p>You are solely responsible for maintaining the confidentiality of your login credentials.</p>
              <p>You must not share your login or purchased materials with others. Access is strictly for personal use.</p>
              <p>If we detect unauthorized use, we may suspend or terminate your account without any refund.</p>
            </div>
          </section>

          {/* Digital Product Usage */}
          <section className="border-l-4 border-green-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">📦</span>
              Digital Product Usage
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>As the original purchaser of any eBook, course, template, or mentorship session:</p>
              <p>You are granted a non-transferable, non-exclusive, personal license to use the product.</p>
              <p>You may not resell, duplicate, distribute, or reproduce the content in any form without written permission.</p>
            </div>
          </section>

          {/* No Guarantees & Limitation of Liability */}
          <section className="border-l-4 border-red-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">❗️</span>
              No Guarantees & Limitation of Liability
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>Our mentorship, toolkits, and learning materials are designed for growth and improvement, but we do not guarantee specific income or business results. Results may vary depending on individual effort and business environment.</p>
              <p>We are not liable for any losses, damages, or legal claims arising from the use or misuse of our content or services.</p>
            </div>
          </section>

          {/* Communications */}
          <section className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">📩</span>
              Communications
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>By registering, you agree to receive emails, WhatsApp updates, and occasional promotional messages from Lead The Business. You may opt out anytime.</p>
            </div>
          </section>

          {/* Modifications */}
          <section className="border-l-4 border-yellow-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">🔄</span>
              Modifications
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>We reserve the right to update or modify these Terms at any time. Your continued use of the site or services after any changes means you accept the revised Terms.</p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">⚖️</span>
              Governing Law
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>These Terms are governed by the laws of India. Any disputes will be resolved under Indian jurisdiction.</p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="border-l-4 border-cyan-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">📞</span>
              Contact Us
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>For support, legal concerns, or queries, please contact:</p>
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                <a 
                  href="mailto:leadthebusinessinfo@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  leadthebusinessinfo@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;