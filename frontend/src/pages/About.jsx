import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to Shop Fusion — where style, quality, and convenience come
            together in one place. We are an innovative e-commerce platform
            dedicated to bringing you the latest fashion trends and premium
            products at affordable prices.
          </p>
          <p>
            At Shop Fusion, we believe shopping should be simple, enjoyable, and
            accessible to everyone. Our mission is to create a seamless online
            shopping experience by offering carefully selected collections,
            secure payments, fast delivery, and excellent customer service.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Shop Fusion, our mission is to make online shopping smarter,
            easier, and more enjoyable for everyone. We aim to provide
            high-quality products, affordable prices, and a seamless shopping
            experience that customers can trust.
          </p>
        </div>
      </div>
      <div className="text-xl py-4 ">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At Shop Fusion, quality is at the heart of everything we do. We are
            committed to providing products that meet high standards of style,
            durability, and reliability. Every item in our collection is
            carefully selected and reviewed to ensure it delivers the value and
            quality our customers deserve.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shop anytime, anywhere, and enjoy the convenience of exploring a
            wide range of quality products with just a few clicks. We bring
            style and convenience together so you can shop smarter and save
            time.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            At Shop Fusion, our customers are at the center of everything we do.
            We are committed to delivering exceptional customer service by
            providing timely support, personalized assistance, and a smooth
            shopping experience at every step.
          </p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;
