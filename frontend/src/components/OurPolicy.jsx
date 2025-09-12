import React, { useState } from 'react';
import Title from '../components/Title';

function OurPolicy() {
  const [activeSection, setActiveSection] = useState('shipping');

  const policies = {
    shipping: {
      title: "Shipping Policy",
      content: `
        <h3 class="text-lg font-semibold mt-6 mb-2">Standard Shipping</h3>
        <p>We offer standard shipping within 3-5 business days. Orders are processed Monday through Friday, excluding holidays.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Express Shipping</h3>
        <p>For urgent deliveries, we offer express shipping with next-day delivery (order before 2 PM local time).</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">International Shipping</h3>
        <p>We ship to over 50 countries worldwide. International orders typically arrive within 7-14 business days.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Shipping Costs</h3>
        <p>Free standard shipping on orders over $50. Express shipping charges apply based on destination.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Order Tracking</h3>
        <p>Once your order ships, you'll receive a tracking number via email to monitor your delivery.</p>
      `
    },
    returns: {
      title: "Returns & Exchanges",
      content: `
        <h3 class="text-lg font-semibold mt-6 mb-2">Return Period</h3>
        <p>We accept returns within 30 days of purchase. Items must be unused, with original tags and packaging.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Return Process</h3>
        <p>To initiate a return, please contact our customer service team with your order number. We'll provide a return authorization and instructions.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Refunds</h3>
        <p>Refunds are processed within 5-7 business days after we receive your returned item. Original shipping costs are non-refundable.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Exchanges</h3>
        <p>We offer exchanges for different sizes or colors, subject to availability. Exchanges follow the same process as returns.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Non-Returnable Items</h3>
        <p>For hygiene reasons, intimate apparel, swimwear, and earrings are final sale unless defective.</p>
      `
    },
    privacy: {
      title: "Privacy Policy",
      content: `
        <h3 class="text-lg font-semibold mt-6 mb-2">Information Collection</h3>
        <p>We collect information you provide during checkout, account creation, or when contacting our customer service team.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Use of Information</h3>
        <p>Your information is used to process orders, improve our services, and communicate with you about products, services, and promotions.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Data Protection</h3>
        <p>We implement security measures to protect your personal information. Payment details are encrypted and processed through secure gateways.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Cookies</h3>
        <p>Our website uses cookies to enhance your shopping experience and analyze site traffic.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Third-Party Sharing</h3>
        <p>We do not sell your personal information. We may share data with trusted partners who assist us in operating our website and servicing you.</p>
      `
    },
    terms: {
      title: "Terms of Service",
      content: `
        <h3 class="text-lg font-semibold mt-6 mb-2">Account Responsibility</h3>
        <p>You are responsible for maintaining the confidentiality of your account and password information.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Product Information</h3>
        <p>We strive to display accurate product information, but do not warrant that descriptions are error-free.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Pricing</h3>
        <p>Prices are subject to change without notice. We reserve the right to modify or discontinue products without notice.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Order Acceptance</h3>
        <p>Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to limit or cancel quantities.</p>
        
        <h3 class="text-lg font-semibold mt-6 mb-2">Intellectual Property</h3>
        <p>All content on this site, including text, graphics, logos, and images, is our property and protected by copyright laws.</p>
      `
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Title text1="Our" text2="Policies" />
        
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Policy Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap -mb-px">
              {Object.keys(policies).map((key) => (
                <button
                  key={key}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                    activeSection === key
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveSection(key)}
                >
                  {policies[key].title}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Policy Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {policies[activeSection].title}
            </h2>
            
            <div 
              className="prose max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: policies[activeSection].content }}
            />
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Need more information?</h3>
              <p className="text-blue-700">
                Contact our customer service team at support@example.com or call us at +1 (555) 123-4567.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">How long does shipping take?</h3>
              <p className="text-gray-600 mt-2">
                Standard shipping typically takes 3-5 business days within the continental US. International shipping may take 7-14 business days.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800">What is your return policy?</h3>
              <p className="text-gray-600 mt-2">
                We accept returns within 30 days of purchase for unused items in original packaging. Some items are final sale for hygiene reasons.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Do you offer international shipping?</h3>
              <p className="text-gray-600 mt-2">
                Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800">How can I track my order?</h3>
              <p className="text-gray-600 mt-2">
                Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order through your account dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;