export type FitmentVerdict = 'FITS' | 'TIGHT' | 'EXCEEDS';

export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  price: number;
  width_cm: number;
  height_cm: number;
  depth_cm: number;
  weight_kg?: number;
  top_clearance_cm: number;
  side_clearance_cm: number;
  rear_clearance_cm: number;
  image_url?: string;
  cutout_url?: string;
  description?: string;
}

export interface ClearanceMetrics {
  measured_cabinet_clearance_cm: number;
  product_physical_height_cm: number;
  product_total_required_height_cm: number;
  clearance_margin_cm: number;
  measured_usable_counter_depth_cm: number;
  product_depth_cm: number;
  status: FitmentVerdict;
  status_message: str_or_string;
}

type str_or_string = string;

export interface CameraIntrinsics {
  focal_length_mm?: number;
  focal_length_35mm_equiv?: number;
  sensor_width_mm?: number;
  image_width_px: number;
  image_height_px: number;
  has_exif: boolean;
  estimated_scale_cm_per_px: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PlacementZone {
  countertop_polygon: number[][];
  placement_box: BoundingBox;
  confidence: number;
}

export interface AlternativeProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  height_cm: number;
  width_cm: number;
  depth_cm: number;
  image_url?: string;
  clearance_margin_cm: number;
}

export interface FitmentAnalysisResponse {
  product_id: string;
  product_name: string;
  verdict: FitmentVerdict;
  metrics: ClearanceMetrics;
  camera: CameraIntrinsics;
  placement: PlacementZone;
  synthesized_image_base64?: string;
  recommended_alternatives: AlternativeProduct[];
}

