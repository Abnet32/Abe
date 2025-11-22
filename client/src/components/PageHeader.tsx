
import React from 'react';

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumb }) => {
  return (
    <div className="bg-brand-blue text-white py-12 relative overflow-hidden animate-in fade-in duration-500">
       <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
       <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold font-heading mb-2">{title}</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-brand-red cursor-pointer hover:text-white transition-colors">Home</span>
            <span>/</span>
            <span>{breadcrumb}</span>
          </div>
       </div>
    </div>
  );
};

export default PageHeader;
