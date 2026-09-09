import React, { useRef, useState } from 'react';
import { Camera, UploadCloud, RefreshCw } from 'lucide-react';

interface CameraCaptureProps {
  onPhotoSelected: (file: File) => void;
  isLoading?: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onPhotoSelected,
  isLoading = false,
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onPhotoSelected(file);
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {/* Hidden Inputs for Native Camera and File Picker */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-6 text-center transition-all bg-slate-50/50 hover:bg-indigo-50/20">
          <div className="mx-auto w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
            <Camera className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-800">
            Check fitment on your kitchen counter
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Take a quick photo showing the countertop surface and upper hanging cabinets.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-5">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-sm shadow-indigo-200 transition-colors disabled:opacity-50"
            >
              <Camera className="w-4 h-4" />
              Snap Photo with Camera
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200 transition-colors disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4 text-slate-400" />
              Upload Image
            </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
          <img
            src={previewUrl}
            alt="Selected kitchen counter"
            className="w-full h-56 object-cover opacity-90 group-hover:opacity-75 transition-opacity"
          />
          {!isLoading && (
            <button
              onClick={handleReset}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-lg text-xs font-medium shadow-md backdrop-blur-sm flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retake / Change
            </button>
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
              <div className="w-8 h-8 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-sm font-medium">Measuring kitchen clearance...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

