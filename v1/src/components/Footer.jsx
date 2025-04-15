const Footer = () => {
    return (
      <>
        {/* Footer Section */}
        <footer className="bg-white py-10 mt-16 border-t border-gray-200">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
            {/* Left - Logo & Description */}
            <div>
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="Prescripto Logo" className="w-8 h-8" />
                <h2 className="text-xl font-bold text-blue-700">Prescripto</h2>
              </div>
              <p className="mt-2 text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
  
            {/* Middle - Company Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">COMPANY</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-600">Home</a></li>
                <li><a href="#" className="hover:text-blue-600">About us</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact us</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy policy</a></li>
              </ul>
            </div>
  
            {/* Right - Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">GET IN TOUCH</h3>
              <p className="mt-2 text-sm">+1-212-456-7890</p>
              <p className="text-sm">greatstackdev@gmail.com</p>
            </div>
          </div>
  
          {/* Bottom Copyright Text */}
          <div className="text-center text-sm text-gray-500 mt-6 border-t border-gray-200 pt-4">
            Copyright © 2024 GreatStack - All Rights Reserved.
          </div>
        </footer>
      </>
    );
  };
  
  export default Footer;
  