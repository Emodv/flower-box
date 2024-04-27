import {
  Facebook,
  LocateFixedIcon,
  LocateIcon,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";

type Props = {};

function MainFooter({}: Props) {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-1 space-y-4 lg:col-span-1">
            <h1 className="pb-3">MY ACCOUNT</h1>
            <p className="text-gray-500">My account</p>
            <p className="text-gray-500">Checkout</p>
            <p className="text-gray-500">Contact us</p>
            <p className="text-gray-500">Shopping Cart</p>
            <p className="text-gray-500">Wishlist</p>
            <p className="text-gray-500">About us</p>
          </div>
          <div className="col-span-1 space-y-4 lg:col-span-1">
            <h1 className="pb-3">QUICK LINKS</h1>
            <p className="text-gray-500">Store Location</p>
            <p className="text-gray-500">Orders Tracking</p>
            <p className="text-gray-500">Size Guide</p>
            <p className="text-gray-500">My account</p>
            <p className="text-gray-500">FAQs</p>
            <p className="text-gray-500">Service</p>
          </div>
          <div className="col-span-1 space-y-4 lg:col-span-1">
            <h1 className="pb-3">INFORMATION</h1>
            <p className="text-gray-500">Privacy Page</p>
            <p className="text-gray-500">About us</p>
            <p className="text-gray-500">Careers</p>
            <p className="text-gray-500">Delivery Information</p>
            <p className="text-gray-500">FAQs</p>
            <p className="text-gray-500">Term & Conditions</p>
          </div>
          <div className="col-span-1 space-y-4 lg:col-span-1">
            <h1 className="pb-3">COMPANY</h1>
            <p className="text-gray-500">Shipping Policy</p>
            <p className="text-gray-500">Help & Contact US</p>
            <p className="text-gray-500">Returns & Refunds</p>
            <p className="text-gray-500">Online Store</p>
            <p className="text-gray-500">Wishlist</p>
            <p className="text-gray-500">Terms & Conditions</p>
          </div>
          <div className="col-span-1 space-y-4 lg:col-span-1">
            <h1 className="pb-3">ABOUT OUR STORE</h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmo incididunt ut labore et dolore
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              <MapPin size={20} />
              Brooklyn, New York, United States
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              <Phone size={20} />
              +0123-456789
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              <Mail size={20} />
              example@example.com
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              <Facebook size={20} />
              <Twitter size={20} />
              <Youtube size={20} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFooter;
