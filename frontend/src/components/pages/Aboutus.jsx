import React from "react";
import Navbar from "../layout/Navbar";
const AboutUs = () => {
  return (
    <div className="bg-orange-200 text-orange-900">
       
      {/* Header Section */}
      <header className="bg-orange-200 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">About Us</h1>
          <p className="text-lg text-center mt-2">
            Your trusted partner for local services, dedicated to serving your community.
          </p>
        </div>
      </header>

      {/* Who We Are Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
        <p className="text-lg max-w-2xl mx-auto">
          We are a team of experienced professionals committed to providing high-quality, reliable services to our local community. Whether you need repairs, maintenance, or specialized services, we’re here to help.
        </p>
      </section>

      {/* Services Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-8">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
              <img
                src="https://cbx-prod.b-cdn.net/COLOURBOX29309164.jpg?width=800&height=800&quality=70"
                alt="Plumbing Services"
                className="w-20 h-20 mx-auto mb-4"
              />
              <h4 className="text-xl font-bold">Plumbing Services</h4>
              <p className="mt-2">
                From leaky faucets to major repairs, our skilled plumbers have got you covered.
              </p>
            </div>
            {/* Service 2 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
              <img
                src="https://miro.medium.com/v2/resize:fit:565/1*1SYIdp-nJIvHhNpAy_aOxg.jpeg"
                alt="Electrical Repairs"
                className="w-20 h-20 mx-auto mb-4"
              />
              <h4 className="text-xl font-bold">Electrical Repairs</h4>
              <p className="mt-2">
                Safe and efficient electrical services to keep your home running smoothly.
              </p>
            </div>
            {/* Service 3 */}
            <div className="bg-gray-100 rounded-lg shadow-md p-6 text-center">
              <img
                src="https://media.istockphoto.com/id/1445233447/photo/landscape-gardener-laying-turf-for-new-lawn.jpg?s=612x612&w=0&k=20&c=OAK9mHqL-5K36q85Fn46HTQZZUwN5yCR0GS80bu1iOI="
                alt="Landscaping"
                className="w-20 h-20 mx-auto mb-4"
              />
              <h4 className="text-xl font-bold">Landscaping</h4>
              <p className="mt-2">
                Beautify your outdoor spaces with our expert landscaping services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-6">Our Mission</h3>
          <p className="text-lg max-w-3xl mx-auto">
            To provide top-notch local services that enhance the quality of life for our customers. We strive to build long-lasting relationships based on trust, quality, and a commitment to excellence.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-center mb-8">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="https://w7.pngwing.com/pngs/654/133/png-transparent-emotion-computer-icons-graduate-record-examinations-paper-one-hundred-years-of-solitude-selamat-datang-love-child-culture.png"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h4 className="text-xl font-bold">Tanvi Kolekar</h4>
              <p>Founder & CEO</p>
              <p className="text-sm mt-2">
                With 15+ years in the industry, Tanvi leads our team with passion and expertise.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="https://img.lovepik.com/png/20231113/cartoon-boy-in-headphones-is-listening-to-music-vector-clipart_580003_wh860.png"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h4 className="text-xl font-bold">Jaydatta Shinde</h4>
              <p>Operations Manager</p>
              <p className="text-sm mt-2">
                Ensuring smooth operations and exceptional customer satisfaction.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src="https://w7.pngwing.com/pngs/654/133/png-transparent-emotion-computer-icons-graduate-record-examinations-paper-one-hundred-years-of-solitude-selamat-datang-love-child-culture.png"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h4 className="text-xl font-bold">Khushi Rakshe</h4>
              <p>Service Specialist</p>
              <p className="text-sm mt-2">
                Delivering high-quality services with attention to detail and care.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;