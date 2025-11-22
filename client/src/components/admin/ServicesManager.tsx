
import React, { useState } from 'react';
import type { Service } from '../../types.ts';
import { Edit, Trash2 } from 'lucide-react';

interface ServicesManagerProps {
  services: Service[];
  onAdd: (service: Omit<Service, 'id'>) => void;
  onUpdate: (id: number, service: Omit<Service, 'id'>) => void;
  onDelete: (id: number) => void;
}

const ServicesManager: React.FC<ServicesManagerProps> = ({ services, onAdd, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.description) {
      if (editingId) {
        onUpdate(editingId, formData);
        setEditingId(null);
      } else {
        onAdd(formData);
      }
      setFormData({ name: '', description: '' });
    }
  };

  const handleEdit = (service: Service) => {
    setFormData({ name: service.name, description: service.description });
    setEditingId(service.id);
    // Scroll to form
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="space-y-12">
      {/* List Section */}
      <div>
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-heading relative inline-block">
            Services we provide
            <div className="absolute -right-20 top-1/2 h-[3px] w-16 bg-brand-red hidden md:block"></div>
          </h2>
          <p className="text-gray-500 text-sm mt-4 max-w-3xl">
             Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway.
          </p>
        </div>

        <div className="space-y-4">
          {services.map(service => (
            <div key={service.id} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-l-4 hover:border-l-brand-red transition-all">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-brand-blue font-heading">{service.name}</h4>
                <p className="text-sm text-gray-500 mt-2">{service.description}</p>
              </div>
              <div className="flex gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(service)}
                  className="text-brand-red hover:bg-red-50 p-3 rounded transition-colors"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => onDelete(service.id)} 
                  className="text-brand-blue hover:bg-blue-50 p-3 rounded transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Section */}
      <div className="bg-white p-10 rounded-lg shadow-md border-t-4 border-brand-red">
         <h3 className="text-2xl font-bold text-brand-blue font-heading mb-8 relative inline-block">
            {editingId ? 'Edit Service' : 'Add a new service'}
            <div className="absolute -right-8 top-1/2 h-[3px] w-8 bg-brand-red"></div>
         </h3>
         
         <form onSubmit={handleSubmit} className="space-y-8">
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Service Name</label>
             <input 
               type="text" 
               placeholder="Service name" 
               className="w-full p-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-brand-red bg-white text-gray-800"
               value={formData.name}
               onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
               required
             />
           </div>
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
             <textarea 
               placeholder="Service description" 
               rows={4}
               className="w-full p-4 border border-gray-200 rounded text-sm focus:outline-none focus:border-brand-red bg-white text-gray-800"
               value={formData.description}
               onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
               required
             ></textarea>
           </div>
           
           <div className="flex gap-4">
             <button type="submit" className="bg-brand-red text-white px-10 py-4 font-bold text-sm uppercase rounded shadow hover:bg-red-700 transition-colors">
               {editingId ? 'Update Service' : 'Add Service'}
             </button>
             {editingId && (
               <button 
                type="button" 
                onClick={handleCancelEdit}
                className="bg-gray-200 text-gray-700 px-8 py-4 font-bold text-sm uppercase rounded hover:bg-gray-300 transition-colors"
               >
                 Cancel
               </button>
             )}
           </div>
         </form>
      </div>
    </div>
  );
};

export default ServicesManager;
