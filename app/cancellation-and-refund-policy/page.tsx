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
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-gray-200 leading-relaxed">
                  Cancellations will be considered only if the request is made immediately 
                  after placing the order. However, the cancellation request may not be 
                  entertained if the orders have been communicated to the vendors/merchants 
                  and they have initiated the process of shipping them.
                </p>
              </div>
            </div>
          </div>



          {/* Point 2 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="text-gray-200 leading-relaxed">
                  LEAD THE BUSINESS does not accept cancellation requests for perishable 
                  items like flowers, eatables etc. However, refund/replacement can be made 
                  if the customer establishes that the quality of product delivered is not good.
                </p>
              </div>
            </div>
          </div>

          {/* Point 3 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="text-gray-200 leading-relaxed mb-4">
                  In case of receipt of damaged or defective items please report the same 
                  to our Customer Service team. The request will, however, be entertained 
                  once the merchant has checked and determined the same at his own end.
                </p>
                <div className="bg-gray-700 rounded p-4 border-l-4 border-yellow-500">
                  <p className="text-gray-300 font-medium">
                    ⏰ This should be reported within <span className="text-yellow-400 font-bold">7 Days</span> of receipt of the products.
                  </p>
                </div>
                <p className="text-gray-200 leading-relaxed mt-4">
                  In case you feel that the product received is not as shown on the site 
                  or as per your expectations, you must bring it to the notice of our 
                  customer service within <span className="text-yellow-400 font-semibold">7 Days</span> of 
                  receiving the product. The Customer Service Team after looking into your 
                  complaint will take an appropriate decision.
                </p>
              </div>
            </div>
          </div>

          {/* Point 4 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div className="flex-1">
                <p className="text-gray-200 leading-relaxed mb-4">
                  In case of complaints regarding products that come with a warranty from 
                  manufacturers, please refer the issue to them.
                </p>
                <div className="bg-green-900 border border-green-700 rounded p-4">
                  <p className="text-green-300 font-medium">
                    💳 In case of any Refunds approved by LEAD THE BUSINESS, it'll take 
                    <span className="text-green-400 font-bold"> 1-2 Days </span>
                    for the refund to be processed to the end customer.
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* Point 5 */} 
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                5
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