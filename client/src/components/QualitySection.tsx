import React from "react";

const QualitySection: React.FC = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row h-auto lg:h-[400px]">
      {/* Left Red Side */}
      <div className="bg-brand-red lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
        <h3 className="text-3xl md:text-5xl font-normal text-white font-heading mb-6 leading-tight">
          Quality Service And <br /> Customer Satisfaction!!
        </h3>
        <p className="text-white/80 text-sm leading-relaxed max-w-md">
          We utilize the most recent symptomatic gear to ensure your vehicle is
          fixed or adjusted appropriately and in an opportune manner. We are an
          individual from Professional Auto Service, a first class execution
          arrange, where free assistance offices share shared objectives of
          being world-class car administration focuses.
        </p>
      </div>

      {/* Right Image Side */}
      <div className="lg:w-1/2 h-[300px] lg:h-auto relative overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=1200&q=80"
          alt="Car Dashboard"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Dashboard overlay graphics simulation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Just using the image as the dashboard is complex to draw in pure css */}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
