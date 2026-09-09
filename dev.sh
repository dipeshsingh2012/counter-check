#!/usr/bin/env bash
# Quickstart script to launch all 3 CounterCheck services locally

set -e

echo "=========================================="
echo " Starting CounterCheck Ecosystem Services "
echo "=========================================="

PROJECTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "1. Product Catalog Service (Port 8001)..."
cd "$PROJECTS_DIR/product-catalog-service"
uvicorn src.main:app --port 8001 --reload &
CATALOG_PID=$!

echo "2. CounterCheck Spatial Service (Port 8000)..."
cd "$PROJECTS_DIR/counter-check-service"
uvicorn src.main:app --port 8000 --reload &
FITMENT_PID=$!

echo "3. CounterCheck Frontend Widget (Port 5173)..."
cd "$PROJECTS_DIR/counter-check"
npm run dev &
FRONTEND_PID=$!

trap "echo 'Stopping all services...'; kill $CATALOG_PID $FITMENT_PID $FRONTEND_PID" EXIT

echo "All services running:"
echo " - Product Catalog API: http://localhost:8001/docs"
echo " - Spatial AI Service:  http://localhost:8000/docs"
echo " - Frontend Widget PDP: http://localhost:5173"
echo "Press Ctrl+C to terminate all services."

wait

