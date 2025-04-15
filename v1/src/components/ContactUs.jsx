import Footer from "./Footer";
const ContactUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="text-center text-2xl font-semibold text-gray-900">
          CONTACT <span className="font-bold">US</span>
        </h2>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-center md:justify-between space-y-8 md:space-y-0 md:space-x-12">
          {/* Left - Image */}
          <div className="w-full md:w-1/2">
            <img 
              src="/image.png" // Replace with the correct path
              alt="Doctor and Patient"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right - Contact Info */}
          <div className="w-full md:w-1/2 text-gray-800">
            {/* Office Information */}
            <div>
              <h3 className="text-lg font-bold">OUR OFFICE</h3>
              <p className="mt-2 text-sm">
                00000 Willms Station <br />
                Suite 000, Washington, USA
              </p>
              <p className="mt-2 text-sm">
                Tel: (000) 000-0000 <br />
                Email: greatstackdev@gmail.com
              </p>
            </div>

            {/* Careers Section */}
            <div className="mt-6">
              <h3 className="text-lg font-bold">CAREERS AT PRESCRIPTO</h3>
              <p className="mt-2 text-sm">
                Learn more about our teams and job openings.
              </p>
              <button className="mt-4 px-4 py-2 border border-gray-900 text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
   
  );
};

export default ContactUs;
