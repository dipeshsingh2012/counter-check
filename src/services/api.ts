import { FitmentAnalysisResponse, Product } from '../types';

const FITMENT_API_URL = import.meta.env.VITE_FITMENT_API_URL || '/api/v1/fitment';
const CATALOG_API_URL = import.meta.env.VITE_CATALOG_API_URL || '/api/v1/products';

export async function analyzeFitment(
  photo: File,
  productId: string
): Promise<FitmentAnalysisResponse> {
  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('product_id', productId);

  const response = await fetch(`${FITMENT_API_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || `Analysis failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${CATALOG_API_URL}`);
    if (response.ok) {
      const data = await response.json();
      return data.items || [];
    }
  } catch (err) {
    console.warn('Could not reach catalog service directly, using fallback products');
  }

  // Fallback demo products if catalog service is offline
  return [
    {
      id: 'prod_breville_barista_touch',
      name: 'Barista Touch Espresso Machine',
      brand: 'Breville',
      sku: 'BES880BSS',
      category: 'espresso_machine',
      price: 999.95,
      width_cm: 32.2,
      height_cm: 40.7,
      depth_cm: 32.2,
      top_clearance_cm: 12.0,
      side_clearance_cm: 5.0,
      rear_clearance_cm: 5.0,
      image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80',
      description: 'Touchscreen espresso machine with automated microfoam texturing.',
    },
    {
      id: 'prod_vitamix_5200',
      name: '5200 Professional Blender',
      brand: 'Vitamix',
      sku: 'VM0103',
      category: 'blender',
      price: 499.95,
      width_cm: 22.2,
      height_cm: 52.0,
      depth_cm: 18.5,
      top_clearance_cm: 6.0,
      side_clearance_cm: 3.0,
      rear_clearance_cm: 3.0,
      image_url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80',
      description: 'Tall professional blender with 64-ounce container.',
    },
    {
      id: 'prod_delonghi_dedica',
      name: 'Dedica Deluxe Slim Espresso Machine',
      brand: 'De\'Longhi',
      sku: 'EC680M',
      category: 'espresso_machine',
      price: 299.95,
      width_cm: 14.9,
      height_cm: 30.5,
      depth_cm: 33.0,
      top_clearance_cm: 5.0,
      side_clearance_cm: 3.0,
      rear_clearance_cm: 4.0,
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      description: 'Ultra-slim 6-inch wide manual espresso machine.',
    },
  ];
}

