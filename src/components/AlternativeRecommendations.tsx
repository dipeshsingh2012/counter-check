import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { AlternativeProduct } from '../types';

interface AlternativeRecommendationsProps {
  alternatives: AlternativeProduct[];
  onSelectProduct?: (productId: string) => void;
}

export const AlternativeRecommendations: React.FC<AlternativeRecommendationsProps> = ({
  alternatives,
  onSelectProduct,
}) => {
  if (!alternatives || alternatives.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-900">
          Compact Alternatives That Fit
        </h4>
      </div>

      <div className="space-y-2.5">
        {alternatives.map((alt) => (
          <div
            key={alt.id}
            className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-indigo-100/80 shadow-xs hover:border-indigo-300 transition-all"
          >
            <div className="flex items-center gap-3">
              {alt.image_url ? (
                <img
                  src={alt.image_url}
                  alt={alt.name}
                  className="w-12 h-12 object-cover rounded-lg bg-slate-50 border border-slate-100"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                  Photo
                </div>
              )}
              <div>
                <span className="text-[10px] font-medium uppercase text-slate-400">
                  {alt.brand}
                </span>
                <h5 className="text-xs font-semibold text-slate-800 line-clamp-1">{alt.name}</h5>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-slate-900">
                    ${alt.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium inline-flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> +{alt.clearance_margin_cm} cm clearance
                  </span>
                </div>
              </div>
            </div>

            {onSelectProduct && (
              <button
                type="button"
                onClick={() => onSelectProduct(alt.id)}
                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                title="Check fit for this product"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

