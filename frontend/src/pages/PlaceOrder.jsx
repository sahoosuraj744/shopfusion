import React from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Enter Street 1"
        />
        <input
          className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Enter Street 2"
        />

        <div className="flex gap-3">
          <input
            className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Enter Pin"
          />
          <input
            className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Enter Country"
          />
        </div>
        <input
          className="border border-gray 300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Enter Phone Number"
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-8">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center gap-3 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className="h-5 mx-2 " src={assets.stripe_logo} alt="" />
            </div>
             <div className="flex items-center   p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className="h-5 mx-4 " src={assets.razorpay_logo} alt="" />
            </div>
             <div className="flex items-center gap-2  p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 g-2 border rounded-full`}></p>
               <b className="text-gray-500 text-sm font-lg mx-3">CASH ON DELIVERY</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
