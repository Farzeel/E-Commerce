const Footer = () => (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="flex mt-2 space-x-4">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            About Us
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
          {/* Add more links as needed */}
        </div>
      </div>
    </footer>
  );
  
  export default Footer;
  