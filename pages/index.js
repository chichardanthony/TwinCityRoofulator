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
