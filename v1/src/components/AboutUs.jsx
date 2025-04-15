import Footer from "./Footer";

const AboutUs = () => {
    return (
      <div className="max-w-6xl mx-auto p-8">
        {/* About Us Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="/path-to-your-image.jpg"
              alt="Doctors"
              className="rounded-lg shadow-lg"
            />
          </div>
  
          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              ABOUT <span className="font-bold">US</span>
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
              At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p className="text-gray-700 mb-4">
              Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
              Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            </p>
            <h3 className="font-semibold text-lg text-gray-900 mt-4">Our Vision</h3>
            <p className="text-gray-700">
              Our vision at Prescripto is to create a seamless healthcare experience for every user.
              We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need when you need it.
            </p>
          </div>
        </div>
  
        {/* Why Choose Us Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            WHY <span className="font-bold">CHOOSE US</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg">EFFICIENCY:</h4>
              <p className="text-gray-700 mt-2">
                Streamlined appointment scheduling that fits into your busy lifestyle.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg">CONVENIENCE:</h4>
              <p className="text-gray-700 mt-2">
                Access to a network of trusted healthcare professionals in your area.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg">PERSONALIZATION:</h4>
              <p className="text-gray-700 mt-2">
                Tailored recommendations and reminders to help you stay on top of your health.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
export default AboutUs;
  