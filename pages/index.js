import React, { useState } from 'react';
import '../theme.css'; // Import the theme CSS

const RoofingCalculator = () => {
 const [inputs, setInputs] = useState({
   customerName: '',
   customerAddress: '',
   customerCity: '',
   customerState: '',
   customerZip: '',
   customerPhone: '',
   customerEmail: '',
   baseSquares: 0,
   twoStorySquares: 0,
   steepSquares: 0,
   roofType: 'gable',
   layers: 1,
   isGeringNE: false,
   iceAndWaterLength: 0,
   ridgeVentLength: 0,
   hingeExtensions: 0,
   gutter5Length: 0,
   gutter6Length: 0,
   downspout2x3Length: 0,
   downspout3x4Length: 0
 });

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

 const calculate = () => {
   const wasteFactor = wasteFactors[inputs.roofType];
   const baseTearOff = inputs.baseSquares * prices.tearOff;
   const extraLayerCost = inputs.layers > 1 ? inputs.baseSquares * prices.extraLayer : 0;
   
   const baseWithWaste = Math.ceil(inputs.baseSquares * wasteFactor);
   const heritageApplication = baseWithWaste * prices.heritage;
   const legacyApplication = baseWithWaste * prices.legacy;

   const twoStoryTearOff = inputs.twoStorySquares * prices.twoStoryTearOff;
   const twoStoryWithWaste = Math.ceil(inputs.twoStorySquares * wasteFactor);
   const twoStoryOn = twoStoryWithWaste * prices.twoStoryOn;

   const steepTearOff = inputs.steepSquares * prices.steepTearOff;
   const steepWithWaste = Math.ceil(inputs.steepSquares * wasteFactor);
   const steepOn = steepWithWaste * prices.steepOn;

   const iceAndWater = inputs.isGeringNE ? inputs.iceAndWaterLength * prices.iceAndWater : 0;
   const ridgeVent = inputs.ridgeVentLength * prices.ridgeVent;

   const gutters5 = inputs.gutter5Length * prices.gutters5;
   const gutters6 = inputs.gutter6Length * prices.gutters6;
   const downspouts2x3 = Math.ceil(inputs.downspout2x3Length / 10) * 10 * prices.downspouts2x3;
   const downspouts3x4 = Math.ceil(inputs.downspout3x4Length / 10) * 10 * prices.downspouts3x4;
   const hingeExtensionsCost = inputs.hingeExtensions * prices.hingeExtension;

   const guttersTotal = gutters5 + gutters6 + downspouts2x3 + downspouts3x4 + hingeExtensionsCost;
   
   const heritageTotalNoGutters = baseTearOff + extraLayerCost + heritageApplication + 
                                 twoStoryTearOff + twoStoryOn + steepTearOff + steepOn + 
                                 iceAndWater + ridgeVent;

   const legacyTotalNoGutters = baseTearOff + extraLayerCost + legacyApplication + 
                               twoStoryTearOff + twoStoryOn + steepTearOff + steepOn + 
                               iceAndWater + ridgeVent;

   return {
     baseCalc: { tearOff: baseTearOff, extraLayer: extraLayerCost },
     heritage: {
       application: heritageApplication,
       twoStory: { tearOff: twoStoryTearOff, on: twoStoryOn },
       steep: { tearOff: steepTearOff, on: steepOn },
       iceAndWater,
       ridgeVent,
       totalNoGutters: heritageTotalNoGutters
     },
     legacy: {
       application: legacyApplication,
       twoStory: { tearOff: twoStoryTearOff, on: twoStoryOn },
       steep: { tearOff: steepTearOff, on: steepOn },
       iceAndWater,
       ridgeVent,
       totalNoGutters: legacyTotalNoGutters
     },
     guttersAndDownspouts: {
       gutters5,
       gutters6,
       downspouts2x3,
       downspouts3x4,
       hingeExtensions: hingeExtensionsCost,
       total: guttersTotal
     },
     wasteFactor
   };
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

 return (
   <div className="p-4">
     <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
       <div className="px-6 py-4 border-b border-gray-200">
         <h1 className="text-2xl font-bold text-gray-900">
           Twin City Roofing Estimate Calculator
         </h1>
       </div>

       <div className="p-6">
         <div className="space-y-4">
           <h2 className="text-lg font-semibold text-gray-900">
             Customer Information
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700">Name</label>
               <input
                 type="text"
                 name="customerName"
                 value={inputs.customerName}
                 onChange={handleInputChange}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 placeholder="Full Name"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700">Phone</label>
               <input
                 type="tel"
                 name="customerPhone"
                 value={inputs.customerPhone}
                 onChange={handleInputChange}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 placeholder="(555) 555-5555"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700">Email</label>
               <input
                 type="email"
                 name="customerEmail"
                 value={inputs.customerEmail}
                 onChange={handleInputChange}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 placeholder="email@example.com"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700">Street Address</label>
               <input
                 type="text"
                 name="customerAddress"
                 value={inputs.customerAddress}
                 onChange={handleInputChange}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 placeholder="Street Address"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700">City</label>
               <input
                 type="text"
                 name="customerCity"
                 value={inputs.customerCity}
                 onChange={handleInputChange}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 placeholder="City"
               />
             </div>

             <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="block text-sm font-medium text-gray-700">State</label>
                 <input
                   type="text"
                   name="customerState"
                   value={inputs.customerState}
                   onChange={handleInputChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                   placeholder="State"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700">ZIP</label>
                 <input
                   type="text"
                   name="customerZip"
                   value={inputs.customerZip}
                   onChange={handleInputChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                 <label className="block text-sm font-medium text-gray-700">Roof Type</label>
                 <select
                   value={inputs.roofType}
                   onChange={(e) => handleRoofTypeChange(e.target.value)}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                 <label className="block text-sm font-medium text-gray-700">Base Squares</label>
                 <input
                   type="number"
                   name="baseSquares"
                   value={inputs.baseSquares || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700">Number of Layers</label>
                 <input
                   type="number"
                   name="layers"
                   value={inputs.layers}
                   onChange={handleInputChange}
                   min="1"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700">Two Story Squares</label>
                 <input
                   type="number"
                   name="twoStorySquares"
                   value={inputs.twoStorySquares || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700">Steep Squares</label>
                 <input
                   type="number"
                   name="steepSquares"
                   value={inputs.steepSquares || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
               </div>
             </div>
           </div>
         </div>

         <div className="mt-8 p-6 border-t border-gray-200">
           <div className="space-y-4">
             <h2 className="text-lg font-semibold text-gray-900">Additional Components</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {inputs.isGeringNE && (
                 <div>
                   <label className="block text-sm font-medium text-gray-700">
                     Ice & Water Shield Length (LF)
                   </label>
                   <input
                     type="number"
                     name="iceAndWaterLength"
                     value={inputs.iceAndWaterLength || ''}
                     onChange={handleInputChange}
                     min="0"
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                   />
                 </div>
               )}
               
               <div>
                 <label className="block text-sm font-medium text-gray-700">Ridge Vent Length (LF)</label>
                 <input
                   type="number"
                   name="ridgeVentLength"
                   value={inputs.ridgeVentLength || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700">Hinge Extensions</label>
                 <input
                   type="number"
                   name="hingeExtensions"
                   value={inputs.hingeExtensions || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
               </div>
             </div>
           </div>
         </div>

         <div className="mt-8 p-6 border-t border-gray-200">
           <div className="space-y-4">
             <h2 className="text-lg font-semibold text-gray-900">Gutters and Downspouts</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700">5" Gutter Length (LF)</label>
                 <input
                   type="number"
                   name="gutter5Length"
                   value={inputs.gutter5Length || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700">6" Gutter Length (LF)</label>
                 <input
                   type="number"
                   name="gutter6Length"
                   value={inputs.gutter6Length || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700">2x3" Downspout Length (LF)</label>
                 <input
                   type="number"
                   name="downspout2x3Length"
                   value={inputs.downspout2x3Length || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
                 <span className="mt-1 text-sm text-gray-500">Rounds to nearest 10 LF</span>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700">3x4" Downspout Length (LF)</label>
                 <input
                   type="number"
                   name="downspout3x4Length"
                   value={inputs.downspout3x4Length || ''}
                   onChange={handleInputChange}
                   min="0"
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 />
                 <span className="mt-1 text-sm text-gray-500">Rounds to nearest 10 LF</span>
               </div>
             </div>
           </div>
         </div>

         <div className="mt-8 p-6 border-t border-gray-200">
           <h2 className="text-lg font-semibold text-gray-900 mb-4">Estimate Summary</h2>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {/* Heritage Class 3 Card */}
             <div className="bg-white rounded-lg shadow overflow-hidden">
               <div className="px-4 py-5 sm:p-6">
                 <h3 className="text-lg font-medium text-gray-900">Heritage Class 3</h3>
                 <dl className="mt-4 space-y-3">
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Base Tear Off</dt>
                     <dd className="text-sm text-gray-900">${results.baseCalc.tearOff.toFixed(2)}</dd>
                   </div>
                   {results.baseCalc.extraLayer > 0 && (
                     <div className="flex justify-between">
                       <dt className="text-sm text-gray-600">Extra Layer Tear Off</dt>
                       <dd className="text-sm text-gray-900">${results.baseCalc.extraLayer.toFixed(2)}</dd>
                     </div>
                   )}
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Base Application</dt>
                     <dd className="text-sm text-gray-900">${results.heritage.application.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Two Story Tear Off</dt>
                     <dd className="text-sm text-gray-900">${results.heritage.twoStory.tearOff.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Two Story Application</dt>
                     <dd className="text-sm text-gray-900">${results.heritage.twoStory.on.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Steep Tear Off</dt>
                     <dd className="text-sm text-gray-900">${results.heritage.steep.tearOff.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Steep Application</dt>
                     <dd className="text-sm text-gray-900">${results.heritage.steep.on.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Ice & Water Shield</dt>
                     <dd className="text-sm text-gray-900">${results.heritage.iceAndWater.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Ridge Vent</dt>
                     <dd className="text-sm text-gray-900">${results.heritage.ridgeVent.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Total (No Gutters)</dt>
                     <dd className="text-sm text-gray-900">${results.heritage.totalNoGutters.toFixed(2)}</dd>
                   </div>
                 </dl>
               </div>
             </div>
             {/* Legacy Class 4 Card */}
             <div className="bg-white rounded-lg shadow overflow-hidden">
               <div className="px-4 py-5 sm:p-6">
                 <h3 className="text-lg font-medium text-gray-900">Legacy Class 4</h3>
                 <dl className="mt-4 space-y-3">
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Base Tear Off</dt>
                     <dd className="text-sm text-gray-900">${results.baseCalc.tearOff.toFixed(2)}</dd>
                   </div>
                   {results.baseCalc.extraLayer > 0 && (
                     <div className="flex justify-between">
                       <dt className="text-sm text-gray-600">Extra Layer Tear Off</dt>
                       <dd className="text-sm text-gray-900">${results.baseCalc.extraLayer.toFixed(2)}</dd>
                     </div>
                   )}
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Base Application</dt>
                     <dd className="text-sm text-gray-900">${results.legacy.application.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Two Story Tear Off</dt>
                     <dd className="text-sm text-gray-900">${results.legacy.twoStory.tearOff.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Two Story Application</dt>
                     <dd className="text-sm text-gray-900">${results.legacy.twoStory.on.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Steep Tear Off</dt>
                     <dd className="text-sm text-gray-900">${results.legacy.steep.tearOff.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Steep Application</dt>
                     <dd className="text-sm text-gray-900">${results.legacy.steep.on.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Ice & Water Shield</dt>
                     <dd className="text-sm text-gray-900">${results.legacy.iceAndWater.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Ridge Vent</dt>
                     <dd className="text-sm text-gray-900">${results.legacy.ridgeVent.toFixed(2)}</dd>
                   </div>
                   <div className="flex justify-between">
                     <dt className="text-sm text-gray-600">Total (No Gutters)</dt>
                     <dd className="text-sm text-gray-900">${results.legacy.totalNoGutters.toFixed(2)}</dd>
                   </div>
                 </dl>
               </div>
             </div>
           </div>
         </div>

         <div className="mt-8 p-6 border-t border-gray-200">
           <div className="space-y-4">
             <h2 className="text-lg font-semibold text-gray-900">Gutters and Downspouts Summary</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex justify-between">
                 <dt className="text-sm text-gray-600">5" Gutters</dt>
                 <dd className="text-sm text-gray-900">${results.guttersAndDownspouts.gutters5.toFixed(2)}</dd>
               </div>
               <div className="flex justify-between">
                 <dt className="text-sm text-gray-600">6" Gutters</dt>
                 <dd className="text-sm text-gray-900">${results.guttersAndDownspouts.gutters6.toFixed(2)}</dd>
               </div>
               <div className="flex justify-between">
                 <dt className="text-sm text-gray-600">2x3" Downspouts</dt>
                 <dd className="text-sm text-gray-900">${results.guttersAndDownspouts.downspouts2x3.toFixed(2)}</dd>
               </div>
               <div className="flex justify-between">
                 <dt className="text-sm text-gray-600">3x4" Downspouts</dt>
                 <dd className="text-sm text-gray-900">${results.guttersAndDownspouts.downspouts3x4.toFixed(2)}</dd>
               </div>
               <div className="flex justify-between">
                 <dt className="text-sm text-gray-600">Hinge Extensions</dt>
                 <dd className="text-sm text-gray-900">${results.guttersAndDownspouts.hingeExtensions.toFixed(2)}</dd>
               </div>
               <div className="flex justify-between">
                 <dt className="text-sm text-gray-600">Total</dt>
                 <dd className="text-sm text-gray-900">${results.guttersAndDownspouts.total.toFixed(2)}</dd>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default RoofingCalculator;
