"use client";
import { Search, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import {motion} from 'framer-motion';

const PropertyFilter = () => {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    propertySubtype: '',
  });

  // dummy data for locations and property types
  const locations = ['Delhi', 'Noida', 'Greater Noida', 'Gurgaon'];
  
  const propertyTypes = ['Residential', 'Commercial', 'Industrial'];
  
  const propertySubtypes = {
    Residential: ['Apartment', 'House', 'Condo', 'Villa', 'Townhouse'],
    Commercial: ['Office', 'Retail', 'Restaurant', 'Hotel', 'Shopping Center'],
    Industrial: ['Factory', 'Warehouse', 'Distribution Center', 'Manufacturing'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset propertySubtype if propertyType changes
    if (name === 'propertyType') {
      setFilters({
        ...filters,
        [name]: value,
        propertySubtype: ''
      });
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };

  // to reset filters to default values
  const resetFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      propertySubtype: '',
    });
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-300 rounded-xl shadow-lg p-8 border border-green-200"
    >
      <motion.h2 className="text-3xl font-bold text-green-800 mb-8 text-center font-heading"
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, ease: "easeOut" }}
       viewport={{ once: true }}
      >Find Your Perfect Property</motion.h2>
      
      <motion.div className="flex flex-col md:flex-row gap-4 mb-6 "
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      >
        {/* Location Filter */}
        <div className="flex-1 relative group">
          <label htmlFor="location" className="absolute -top-2 left-4 px-1 bg-white text-sm font-medium text-green-700 rounded">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full p-4 border-2 border-green-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-400"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="flex-1 relative group">
          <label htmlFor="propertyType" className="absolute -top-2 left-4 px-1 bg-white text-sm font-medium text-green-700 rounded">
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full p-4 border-2 border-green-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-400"
          >
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Property Subtype Filter */}
        <div className="flex-1 relative group">
          <label htmlFor="propertySubtype" className="absolute -top-2 left-4 px-1 bg-white text-sm font-medium text-green-700 rounded">
            Property Subtype
          </label>
          <select
            id="propertySubtype"
            name="propertySubtype"
            value={filters.propertySubtype}
            onChange={handleChange}
            disabled={!filters.propertyType}
            className="w-full p-4 border-2 border-green-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 group-hover:border-green-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <option value="">All Subtypes</option>
            {filters.propertyType && 
              propertySubtypes[filters.propertyType].map((subtype) => (
                <option key={subtype} value={subtype}>{subtype}</option>
              ))
            }
          </select>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </button>
          <button 
            onClick={resetFilters}
            className="px-6 py-4 bg-white hover:bg-gray-50 text-green-700 rounded-lg font-medium border-2 border-green-300 transition-colors duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Reset
          </button>
        </div>
      </motion.div>
      
   
    </div>
  );
};

export default PropertyFilter;
