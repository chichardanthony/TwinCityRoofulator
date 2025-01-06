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
