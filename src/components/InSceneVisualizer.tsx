import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface InSceneVisualizerProps {
  synthesizedImageUrl?: string;
  originalImageUrl?: string;
  productName: string;
}

export const InSceneVisualizer: React.FC<InSceneVisualizerProps> = ({
  synthesizedImageUrl,
  originalImageUrl,
  productName,
}) => {
  const [showOriginal, setShowOriginal] = useState(false);

  if (!synthesizedImageUrl && !originalImageUrl) {
    return null;
  }

  const currentImage = showOriginal
    ? originalImageUrl || synthesizedImageUrl
    : synthesizedImageUrl || originalImageUrl;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-inner">
      <img
        src={currentImage}
        alt={`In-scene placement of ${productName}`}
        className="w-full h-64 sm:h-72 object-cover object-center transition-all"
      />

      {/* Floating Header */}
      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-medium flex items-center gap-1.5 shadow-sm">
        <Eye className="w-3.5 h-3.5 text-indigo-400" />
        <span>In-Scene Placement View</span>
      </div>

      {/* Toggle View Mode Buttons */}
      {originalImageUrl && synthesizedImageUrl && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl shadow-lg border border-white/10">
          <button
            type="button"
            onClick={() => setShowOriginal(false)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              !showOriginal
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Placement
          </button>
          <button
            type="button"
            onClick={() => setShowOriginal(true)}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              showOriginal
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Original
          </button>
        </div>
      )}
    </div>
  );
};

