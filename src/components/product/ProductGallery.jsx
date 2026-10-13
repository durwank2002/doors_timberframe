import React, { useState, useRef } from 'react';
import { ZoomIn, Maximize2 } from 'lucide-react';

export const ProductGallery = ({ images = [], title = 'Door Design', onOpenLightbox }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const activeImage = images[selectedIndex] || images[0] || '';

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="space-y-4 select-none">
      {/* Main Image Frame with Zoom Lens */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-4/5 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 cursor-crosshair group shadow-inner"
      >
        <img
          src={activeImage}
          alt={`${title} - View ${selectedIndex + 1}`}
          className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
            isZooming ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Magnified Grain View */}
        {isZooming && (
          <div
            className="absolute inset-0 bg-no-repeat pointer-events-none transition-all duration-75"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: '240%',
            }}
          />
        )}

        {/* Zoom Hint Indicator */}
        <div className="absolute bottom-3 left-3 bg-stone-900/75 backdrop-blur-sm text-stone-200 text-[11px] px-2.5 py-1 rounded-md flex items-center space-x-1.5 pointer-events-none group-hover:opacity-0 transition-opacity">
          <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
          <span>Hover to magnify wood grain</span>
        </div>

        {/* Fullscreen Button */}
        {onOpenLightbox && (
          <button
            onClick={() => onOpenLightbox(selectedIndex)}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 rounded-full shadow-md backdrop-blur-xs transition-transform hover:scale-105"
            aria-label="View full resolution image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-1">
          {images.map((imgUrl, index) => {
            const isSelected = selectedIndex === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative w-20 aspect-square rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  isSelected
                    ? 'border-amber-600 ring-2 ring-amber-600/20 scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`View thumbnail ${index + 1}`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
