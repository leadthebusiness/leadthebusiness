import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300">Lead The Business</p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            At Lead The Business, we are committed to protecting your personal data and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our services, purchase our eBooks, book mentorship sessions, or download resources.
          </p>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-10">
          {/* Information We Collect */}
          <section className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">🔐</span>
              Information We Collect
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>We may collect the following data when you use our services:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Payment details (processed securely via Razorpay)</li>
                <li>Your communication preferences</li>
                <li>Device or usage data (for website analytics)</li>
              </ul>
              <p className="font-semibold text-green-400">We do not store your payment information on our servers.</p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="border-l-4 border-green-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">🎯</span>
              How We Use Your Information
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>We use your data to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Deliver eBooks, PDFs, or mentorship services you purchase</li>
                <li>Respond to inquiries or support requests</li>
                <li>Improve our offerings based on analytics</li>
                <li>Send important updates or offers (only with your consent)</li>
              </ul>
            </div>
          </section>

          {/* Sharing & Security */}
          <section className="border-l-4 border-red-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">🔁</span>
              Sharing & Security
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>Your information is never sold or shared with third parties, except trusted services like Razorpay for payment processing.</p>
              <p>We use standard industry practices to protect your data, but no method is 100% secure. By using our services, you agree to the risk involved with online transmissions.</p>
            </div>
          </section>

          {/* Cookies & Tracking */}
          <section className="border-l-4 border-purple-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">🧾</span>
              Cookies & Tracking
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>Our website may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.</p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="border-l-4 border-yellow-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">👶</span>
              Children's Privacy
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>Our services are not intended for anyone under the age of 13. We do not knowingly collect data from minors.</p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">🔄</span>
              Changes to This Policy
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>This Privacy Policy may be updated from time to time. You will be notified of major changes on our website.</p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="border-l-4 border-cyan-500 pl-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="mr-3">📬</span>
              Contact Us
            </h2>
            <div className="space-y-3 text-gray-300">
              <p>For any questions or data-related concerns, contact us at:</p>
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

export default PrivacyPolicy;