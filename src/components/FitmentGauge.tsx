import { CheckCircle2, AlertTriangle, XCircle, ArrowUpDown } from 'lucide-react';
import { ClearanceMetrics, FitmentVerdict } from '../types';

interface FitmentGaugeProps {
  metrics: ClearanceMetrics;
}

export const FitmentGauge: React.FC<FitmentGaugeProps> = ({ metrics }) => {
  const getBadgeStyle = (verdict: FitmentVerdict) => {
    switch (verdict) {
      case 'FITS':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          title: 'Comfortable Fit',
          barColor: 'bg-emerald-500',
        };
      case 'TIGHT':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          title: 'Tight Fit',
          barColor: 'bg-amber-500',
        };
      case 'EXCEEDS':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          icon: <XCircle className="w-5 h-5 text-rose-600" />,
          title: 'Exceeds Available Space',
          barColor: 'bg-rose-500',
        };
    }
  };

  const style = getBadgeStyle(metrics.status);
  const percentUsed = Math.min(
    Math.round((metrics.product_total_required_height_cm / metrics.measured_cabinet_clearance_cm) * 100),
    125
  );

  return (
    <div className={`p-4 rounded-2xl border ${style.bg} transition-all`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{style.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">{style.title}</h4>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-white/80 border border-current">
              {metrics.clearance_margin_cm >= 0
                ? `+${metrics.clearance_margin_cm} cm margin`
                : `${metrics.clearance_margin_cm} cm margin`}
            </span>
          </div>
          <p className="text-xs mt-1 leading-relaxed opacity-90">{metrics.status_message}</p>
        </div>
      </div>

      {/* Progress Bar Showing Vertical Clearance Utilization */}
      <div className="mt-4 pt-3 border-t border-black/5">
        <div className="flex justify-between items-center text-[11px] font-medium opacity-80 mb-1.5">
          <span className="flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" /> Height Capacity
          </span>
          <span>
            {metrics.product_total_required_height_cm} cm needed / {metrics.measured_cabinet_clearance_cm} cm space ({percentUsed}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden relative">
          <div
            className={`h-full ${style.barColor} transition-all duration-700 rounded-full`}
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          />
        </div>
      </div>

      {/* Dimension Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 pt-2 text-[11px]">
        <div className="bg-white/60 p-2 rounded-lg">
          <span className="text-slate-500 block">Cabinet Clearance</span>
          <span className="font-semibold text-slate-800">{metrics.measured_cabinet_clearance_cm} cm</span>
        </div>
        <div className="bg-white/60 p-2 rounded-lg">
          <span className="text-slate-500 block">Appliance + Vent</span>
          <span className="font-semibold text-slate-800">{metrics.product_total_required_height_cm} cm</span>
        </div>
        <div className="bg-white/60 p-2 rounded-lg col-span-2 sm:col-span-1">
          <span className="text-slate-500 block">Usable Depth</span>
          <span className="font-semibold text-slate-800">{metrics.measured_usable_counter_depth_cm} cm</span>
        </div>
      </div>
    </div>
  );
};

