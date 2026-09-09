import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, ShieldCheck, Box, HelpCircle } from 'lucide-react';
import { CounterCheckWidget } from './components/CounterCheckWidget';
import { fetchProducts } from './services/api';
import { Product } from './types';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('prod_breville_barista_touch');
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const items = await fetchProducts();
        setProducts(items);
        if (items.length > 0 && !items.find((p) => p.id === selectedProductId)) {
          setSelectedProductId(items[0].id);
        }
      } finally {
        setIsLoadingProducts(false);
      }
    }
    load();
  }, []);

  const currentProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-slate-500 text-sm font-medium">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top E-Commerce Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              CC
            </div>
            <span className="font-bold text-slate-900 text-base tracking-tight">
              CulinaryDirect
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Product Switcher for testing fitment widget */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 hidden sm:inline">Switch Demo Product:</span>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 font-medium text-slate-700 focus:outline-indigo-500"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.height_cm} cm H)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main PDP Layout */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        {currentProduct && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Product Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 shadow-sm flex items-center justify-center">
                <img
                  src={currentProduct.image_url}
                  alt={currentProduct.name}
                  className="max-h-96 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Dimensional Specs Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Box className="w-4 h-4" /> Ground Truth Dimensional Specifications
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block">Width</span>
                    <span className="text-sm font-bold text-slate-800">
                      {currentProduct.width_cm} cm
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Height</span>
                    <span className="text-sm font-bold text-slate-800">
                      {currentProduct.height_cm} cm
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Depth</span>
                    <span className="text-sm font-bold text-slate-800">
                      {currentProduct.depth_cm} cm
                    </span>
                  </div>
                </div>
                {currentProduct.top_clearance_cm > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                      Required Overhead Clearance (lid/steam/hopper)
                    </span>
                    <span className="font-semibold text-slate-700">
                      +{currentProduct.top_clearance_cm} cm
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: PDP Info & CounterCheck Embed */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      {currentProduct.brand}
                    </span>
                    <span className="text-xs text-slate-400">• SKU: {currentProduct.sku}</span>
                  </div>
                  <h1 className="text-xl font-bold text-slate-900 mt-1">
                    {currentProduct.name}
                  </h1>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-slate-600">4.8 (1,248 reviews)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-baseline gap-3">
                  <span className="text-2xl font-black text-slate-900">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold">In Stock & Ready to Ship</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentProduct.description}
                </p>

                {/* CounterCheck Widget Fragment Embedded in PDP */}
                <div className="pt-2">
                  <CounterCheckWidget
                    key={currentProduct.id}
                    productId={currentProduct.id}
                    productName={currentProduct.name}
                    productHeightCm={currentProduct.height_cm}
                    productTopClearanceCm={currentProduct.top_clearance_cm}
                    onSelectAlternative={(altId) => setSelectedProductId(altId)}
                  />
                </div>

                {/* Add to Cart CTA */}
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button
                    type="button"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-around text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> 2-Year Warranty
                  </span>
                  <span className="flex items-center gap-1">
                    <Box className="w-3.5 h-3.5 text-slate-400" /> Free 30-Day Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

