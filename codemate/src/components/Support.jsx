import React from "react";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-700">
            Need Help? We're Here for You!
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Our support team is ready to assist you 24/7. Reach out to us using the options below.
          </p>
        </header>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div className="bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-lg p-6 shadow-xl hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">
              📞 Contact Us
            </h2>
            <p className="text-gray-300">
              Have questions? Call or email us for direct support.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <strong>Phone:</strong> +91-8521343533
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@projectname.com"
                  className="text-pink-500 hover:underline"
                >
                  support@codemate.com
                </a>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-lg p-6 shadow-xl hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">
              ❓ FAQs
            </h2>
            <p className="text-gray-300">
              Find quick answers to the most commonly asked questions.
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-pink-500 hover:underline"
            >
              Browse FAQs →
            </a>
          </div>

          {/* Support Ticket */}
          <div className="bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-lg p-6 shadow-xl hover:shadow-2xl transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">
              🛠️ Submit a Ticket
            </h2>
            <p className="text-gray-300">
              Experiencing an issue? Submit a ticket, and our team will get back to you shortly.
            </p>
            <a
              href="#"
              className="inline-block mt-4 text-pink-500 hover:underline"
            >
              Submit Ticket →
            </a>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-16 bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-lg p-8 shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-purple-400">
            💡 Have Feedback?
          </h2>
          <p className="text-center text-gray-300 mt-4">
            We value your thoughts! Let us know how we can improve.
          </p>
          <div className="mt-8 text-center">
            <a
              href="#"
              className="px-6 py-3 text-lg font-medium text-black bg-gradient-to-r from-pink-500 to-purple-700 rounded-lg shadow-md hover:opacity-90 transition duration-300"
            >
              Submit Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
