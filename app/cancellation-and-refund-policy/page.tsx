import React from 'react';

const CancellationRefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Cancellation & Refund Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated on 26-07-2025 12:13:56
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            LEAD THE BUSINESS believes in helping its customers as far as possible, 
            and has therefore a liberal cancellation policy. Under this policy:
          </p>
        </div>

        {/* Policy Points */}
        <div className="space-y-8">
          {/* Point 1 */}
        


          {/* Point 5 */} 
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-gray-200 leading-relaxed">
                  Refunds will be credited to the original payment method within <span className="text-blue-400 font-bold">5-7 business days</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-600">
          <h2 className="text-xl font-semibold text-white mb-4">
            Need Help?
          </h2>
          <p className="text-gray-300">
            If you have any questions about our cancellation and refund policy, 
            please contact our Customer Service team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;