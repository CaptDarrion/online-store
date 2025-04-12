import {
  //   Facebook,
  //   Twitter,
  //   Instagram,
  //   Pinterest,
  Apple,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            About Shopery
          </h3>
          <p className="text-sm mb-4">
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>
          <p className="text-sm">
            <span className="text-white font-medium">(219) 555-0114</span> or{" "}
            <span className="text-white font-medium">Proxy@gmail.com</span>
          </p>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">My Account</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                My Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Order History
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shopping Cart
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Wishlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Helps */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Helps</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Faqs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Condition
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Proxy */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Proxy</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Product
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Products Details
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Track Order
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-center md:text-left">
          Ecobazar eCommerce © 2021. All Rights Reserved
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4 text-gray-400">
          {/* <a href="#" className="hover:text-white">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white">
            <Pinterest className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white">
            <Instagram className="w-5 h-5" />
          </a> */}
        </div>

        {/* Payment Icons */}
        <div className="flex items-center space-x-4 text-gray-400">
          <Apple className="w-5 h-5" />
          <CreditCard className="w-5 h-5" />
          <CreditCard className="w-5 h-5 rotate-180" />
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>
    </footer>
  );
}
