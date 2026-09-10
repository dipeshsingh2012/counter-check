import React, { useState } from 'react';
import { Ruler, Sparkles, X, AlertCircle } from 'lucide-react';
import {
  ProtonThemeProvider,
  ProtonButton,
  ProtonStatusBadge,
} from '@dipesh.singh/proton/react';
import { CameraCapture } from './CameraCapture';
import { FitmentGauge } from './FitmentGauge';
import { InSceneVisualizer } from './InSceneVisualizer';
import { AlternativeRecommendations } from './AlternativeRecommendations';
import { analyzeFitment } from '../services/api';
import { FitmentAnalysisResponse } from '../types';

interface CounterCheckWidgetProps {
  productId: string;
  productName: string;
  productHeightCm?: number;
  productTopClearanceCm?: number;
  onSelectAlternative?: (productId: string) => void;
  className?: string;
}

export const CounterCheckWidget: React.FC<CounterCheckWidgetProps> = ({
  productId,
  productName,
  onSelectAlternative,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FitmentAnalysisResponse | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  const handlePhotoSelected = async (file: File) => {
    setOriginalImageUrl(URL.createObjectURL(file));
    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeFitment(file, productId);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze fitment. Please try another photo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setOriginalImageUrl(null);
    setError(null);
  };

  return (
    <ProtonThemeProvider>
      <div className={`w-full ${className}`}>
        {/* PDP Embedded Trigger Button */}
        {!isOpen && (
          <div className="p-4 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-amber-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shadow-sm shadow-amber-200">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    CounterCheck™
                  </span>
                  <ProtonStatusBadge status="coffee" label="AI Fitment" size="sm" />
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Will this fit under your kitchen cabinets?
                </p>
              </div>
            </div>

            <ProtonButton
              size="sm"
              startIcon={<Sparkles style={{ width: 14, height: 14 }} />}
              onClick={() => setIsOpen(true)}
            >
              Check My Counter
            </ProtonButton>
          </div>
        )}

        {/* Expanded Fitment Checker Container */}
        {isOpen && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl transition-all">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">CounterCheck Fitment Verification</h3>
                  <p className="text-xs text-slate-500">Checking clearance for {productName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="mt-4 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {!result ? (
                <CameraCapture onPhotoSelected={handlePhotoSelected} isLoading={isAnalyzing} />
              ) : (
                <div className="space-y-4">
                  {/* Fitment Gauge Verdict */}
                  <FitmentGauge metrics={result.metrics} />

                  {/* In-Scene Synthesis Overlay */}
                  <InSceneVisualizer
                    synthesizedImageUrl={result.synthesized_image_base64}
                    originalImageUrl={originalImageUrl || undefined}
                    productName={productName}
                  />

                  {/* Compact Alternatives if tight or exceeds */}
                  <AlternativeRecommendations
                    alternatives={result.recommended_alternatives}
                    onSelectProduct={(id) => {
                      handleReset();
                      onSelectAlternative?.(id);
                    }}
                  />

                  {/* Retake Button */}
                  <div className="pt-2 flex justify-end">
                    <ProtonButton
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                    >
                      Test Another Photo / Area
                    </ProtonButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ProtonThemeProvider>
  );
};

export default CounterCheckWidget;
