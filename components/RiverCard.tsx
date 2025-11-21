import React from 'react';
import { River } from '../types';
import { ArrowRight } from 'lucide-react';

interface RiverCardProps {
  river: River;
  onSelect: (river: River) => void;
}

export const RiverCard: React.FC<RiverCardProps> = ({ river, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(river)}
      className={`
        group relative h-64 w-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-500
        border border-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(100,100,255,0.2)]
      `}
    >
      {/* Dynamic Gradient Background based on river color */}
      <div className={`absolute inset-0 bg-gradient-to-br ${river.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-divine text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-400 mb-1">
            {river.name}
            </h3>
            <p className="text-sm text-slate-400 font-serif italic mb-2">{river.sanskritName}</p>
            <p className="text-sm text-slate-300 line-clamp-2 mb-4 group-hover:text-white transition-colors">
            {river.shortDesc}
            </p>
            <div className="flex items-center text-amber-300 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Listen to the Legend</span>
            <ArrowRight className="w-4 h-4 ml-2" />
            </div>
        </div>
      </div>
      
      {/* Decorative Lotus or symbol overlay could go here */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
             <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
        </svg>
      </div>
    </div>
  );
};