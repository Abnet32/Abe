
import React from 'react';
import PageHeader from './PageHeader';
import { Gauge, Settings, Disc, Car, CircleDot, Droplet } from 'lucide-react';

interface ServicesPageProps {
  onLearnMore: (prompt: string) => void;
}

interface ServiceData {
  title: string;
  image: string;
  description: string;
  extendedDescription: string;
  features: string[];
  prompt?: string;
  icon: React.ReactNode;
}

interface ServiceCardProps {
  service: ServiceData;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white group hover:shadow-2xl transition-all duration-300 border-b-[3px] border-transparent hover:border-brand-red cursor-pointer flex flex-col h-full transform hover:-translate-y-2 hover:scale-[1.02]"
  >
    <div className="h-52 overflow-hidden relative">
      <img 
        src={service.image} 
        alt={service.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
    </div>
    
    <div className="p-8 flex flex-col flex-1">
      <h4 className="text-xl font-bold text-brand-blue font-heading mb-3 group-hover:text-gray-800 transition-colors">{service.title}</h4>
      <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-3 flex-1">{service.description}</p>
      
      <div className="mt-auto flex items-end justify-between">
         <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider group-hover:underline flex items-center gap-1">
           Read More <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:rotate-90">+</span>
         </span>
         
         <div className="opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-brand-blue group-hover:text-brand-red">
            {service.icon}
         </div>
      </div>
    </div>
  </div>
);

const ServicesPage: React.FC<ServicesPageProps> = ({ onLearnMore }) => {
  const services: ServiceData[] = [
    { 
      title: 'Performance Upgrade', 
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80',
      description: 'Unlock the full potential of your vehicle with our expert performance tuning and upgrade services.',
      extendedDescription: "Unleash your vehicle's true potential with our specialized Performance Upgrade services. We don't just add parts; we engineer solutions to enhance horsepower, torque, and handling. From ECU remapping to high-performance exhaust systems and turbocharging, our master mechanics ensure your car performs at its peak without compromising reliability.",
      features: ["ECU Tuning & Remapping", "Turbo & Supercharger Installation", "Cold Air Intakes", "Performance Exhaust Systems", "Suspension Lowering & Handling Kits"],
      prompt: "I'm interested in upgrading my car's performance. Can you explain what options you offer, such as engine tuning, turbo upgrades, or suspension modifications?",
      icon: <Gauge size={32} strokeWidth={1.5} />
    },
    { 
      title: 'Transmission Services', 
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
      description: 'Complete transmission maintenance, repair, and replacement services for automatic and manual vehicles.',
      extendedDescription: "Your transmission is the heart of your vehicle's drivetrain. Our Transmission Services cover everything from routine fluid changes to complete rebuilds. We use advanced diagnostic tools to pinpoint shifting issues, slips, or noises, ensuring smooth gear changes and extending the lifespan of your vehicle.",
      features: ["Fluid Flush & Replacement", "Clutch Repair & Replacement", "Transmission Rebuilds", "Differential Service", "Solenoid & Sensor Testing"],
      icon: <Settings size={32} strokeWidth={1.5} />
    },
    { 
      title: 'Brake Repair & Service', 
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80',
      description: 'Safety first. We provide comprehensive brake inspections, pad replacements, and rotor resurfacing.',
      extendedDescription: "Safety is non-negotiable. Our Brake Repair & Service ensures your vehicle stops effectively every time. We inspect the entire braking system, including pads, rotors, calipers, and lines. Whether it's a squeaky brake or a soft pedal, we fix it with premium parts to guarantee your safety on the road.",
      features: ["Brake Pad Replacement", "Rotor Resurfacing & Replacement", "Brake Fluid Flush", "ABS Diagnostics", "Caliper Service"],
      icon: <Disc size={32} strokeWidth={1.5} />
    },
    { 
      title: 'Engine Service & Repair', 
      image: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=600&q=80',
      description: 'From check engine lights to complete overhauls, our expert mechanics handle all engine related issues.',
      extendedDescription: "The engine is the most complex part of your car. Our Engine Service & Repair includes deep diagnostics, timing belt replacements, head gasket repairs, and complete engine overhauls. We treat every engine with precision, restoring power and efficiency to factory standards or better.",
      features: ["Check Engine Light Diagnostics", "Timing Belt/Chain Replacement", "Head Gasket Repair", "Engine Overhauls", "Cooling System Repair"],
      icon: <Car size={32} strokeWidth={1.5} />
    },
    { 
      title: 'Tyre & Wheels', 
      image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80',
      description: 'Tire rotation, balancing, alignment and replacement services to ensure a smooth and safe ride.',
      extendedDescription: "Tires are your only contact with the road. Our Tyre & Wheel services maximize traction, fuel economy, and tire life. We offer computerized balancing, laser alignment, and professional tire mounting. We also help you choose the right tires for your specific driving needs and road conditions.",
      features: ["Computerized Wheel Alignment", "Wheel Balancing", "Tire Rotation", "Flat Tire Repair", "TPMS Service"],
      icon: <CircleDot size={32} strokeWidth={1.5} />
    },
    { 
      title: 'Denting & Painting', 
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff139?auto=format&fit=crop&w=600&q=80',
      description: 'Restore your car to its factory glory with our professional dent removal and paint matching services.',
      extendedDescription: "Restore your car's aesthetic appeal with our Denting & Painting services. Whether it's a minor scratch or major collision damage, our body shop experts use precision color-matching technology and high-quality clear coats to bring back that showroom shine. We ensure structural integrity and a flawless finish.",
      features: ["Paintless Dent Removal", "Scratch & Chip Repair", "Full Body Painting", "Bumper Repair", "Frame Straightening"],
      icon: <Droplet size={32} strokeWidth={1.5} />
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50">
      <PageHeader title="Our Services" breadcrumb="Services" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mb-12">
           <h3 className="text-3xl font-bold text-brand-blue font-heading mb-4">World Class Car Services</h3>
           <p className="text-gray-500 text-sm leading-relaxed">
             We offer a full range of garage services to vehicle owners located in the area. All mechanic services are performed by highly qualified mechanics. We can handle any car problem.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service}
              onClick={() => onLearnMore(service.prompt || `I would like to get a price estimate for ${service.title}. What is the typical price range for this service in Addis Ababa?`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
