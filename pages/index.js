import React, { useState } from 'react';

const RoofingCalculator = () => {
  const [inputs, setInputs] = useState({
    // Customer Information
    customerName: '',
    customerAddress: '',
    customerCity: '',
    customerState: '',
    customerZip: '',
    customerPhone: '',
    customerEmail: '',
    
    // Project Details
    baseSquares: 0,
    twoStorySquares: 0,
    steepSquares: 0,
    roofType: 'gable',
    layers: 1,
    isGeringNE: false,
    
    // Additional Components
    iceAndWaterLength: 0,
    ridgeVentLength: 0,
    hingeExtensions: 0,
    
    // Gutters and Downspouts
    gutter5Length: 0,
    gutter6Length: 0,
    downspout2x3Length: 0,
    downspout3x4Length: 0
  });

  // Pricing constants
  const prices = {
    tearOff: 75,
    extraLayer: 20,
    twoStoryTearOff: 20,
    twoStoryOn: 20,
    steepTearOff: 20,
    steepOn: 20,
    heritage: 300,
    legacy: 385,
    gutters5: 9.75,
    gutters6: 11.00,
    downspouts2x3: 9.75,
    downspouts3x4: 10.25,
    iceAndWater: 2,
    ridgeVent: 7,
    hingeExtension: 12
  };

  const wasteFactors = {
    gable: 1.10,
    simpleHip: 1.13,
    complexHip: 1.18
  };
import React, { useState } from 'react';

const RoofingCalculator = () => {
  const [inputs, setInputs] = useState({
    // Customer Information
    customerName: '',
    customerAddress: '',
    customerCity: '',
    customerState: '',
    customerZip: '',
    customerPhone: '',
    customerEmail: '',
    
    // Project Details
    baseSquares: 0,
    twoStorySquares: 0,
    steepSquares: 0,
    roofType: 'gable',
    layers: 1,
    isGeringNE: false,
    
    // Additional Components
    iceAndWaterLength: 0,
    ridgeVentLength: 0,
    hingeExtensions: 0,
    
    // Gutters and Downspouts
    gutter5Length: 0,
    gutter6Length: 0,
    downspout2x3Length: 0,
    downspout3x4Length: 0
  });

  // Pricing constants
  const prices = {
    tearOff: 75,
    extraLayer: 20,
    twoStoryTearOff: 20,
    twoStoryOn: 20,
    steepTearOff: 20,
    steepOn: 20,
    heritage: 300,
    legacy: 385,
    gutters5: 9.75,
    gutters6: 11.00,
    downspouts2x3: 9.75,
    downspouts3x4: 10.25,
    iceAndWater: 2,
    ridgeVent: 7,
    hingeExtension: 12
  };

  const wasteFactors = {
    gable: 1.10,
    simpleHip: 1.13,
    complexHip: 1.18
  };
const results = calculate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value === '' ? (name.includes('customer') ? '' : 0) : 
              name.includes('customer') ? value : Number(value)
    }));
  };

  const handleRoofTypeChange = (value) => {
    setInputs(prev => ({
      ...prev,
      roofType: value
    }));
  };

  const handleGeringToggle = () => {
    setInputs(prev => ({
      ...prev,
      isGeringNE: !prev.isGeringNE
    }));
  };

  // Start of UI render
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Twin City Roofing Estimate Calculator
          </h1>
        </div>
{/* Customer Information Section */}
        <div className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={inputs.customerName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={inputs.customerPhone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                  placeholder="(555) 555-5555"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={inputs.customerEmail}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  name="customerAddress"
                  value={inputs.customerAddress}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="customerCity"
                  value={inputs.customerCity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                  placeholder="City"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="customerState"
                    value={inputs.customerState}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-blue-500 focus:ring-blue-500"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP
                  </label>
                  <input
                    type="text"
                    name="customerZip"
                    value={inputs.customerZip}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-blue-500 focus:ring-blue-500"
                    placeholder="ZIP"
                  />
                </div>
              </div>
            </div>
          </div>
 <div className="mt-8 p-6 border-t border-gray-200">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Roof Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Roof Type
                </label>
                <select
                  value={inputs.roofType}
                  onChange={(e) => handleRoofTypeChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="gable">Gable (1.10)</option>
                  <option value="simpleHip">Simple Hip (1.13)</option>
                  <option value="complexHip">Complex Hip (1.18)</option>
                </select>
              </div>

              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="gering"
                  checked={inputs.isGeringNE}
                  onChange={handleGeringToggle}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="gering" className="ml-2 block text-sm text-gray-900">
                  Property in Gering, NE
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Base Squares
                </label>
                <input
                  type="number"
                  name="baseSquares"
                  value={inputs.baseSquares || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Layers
                </label>
                <input
                  type="number"
                  name="layers"
                  value={inputs.layers}
                  onChange={handleInputChange}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Two Story Squares
                </label>
                <input
                  type="number"
                  name="twoStorySquares"
                  value={inputs.twoStorySquares || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Steep Squares
                </label>
                <input
                  type="number"
                  name="steepSquares"
                  value={inputs.steepSquares || ''}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                           focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
