import React, { useState, useMemo } from "react";
import {
  Trophy,
  Star,
  Lock,
  CheckCircle,
  Target,
  Award,
  X,
  Flame,
  Crown,
  Zap,
} from "lucide-react";


// ====================================================================
// HINTERGRUND-TERRAIN DEFINITION (WICHTIG: Bilder müssen im /public Ordner liegen!)
// ====================================================================
const terrainImages = [
    '/terrain_forest.png', 
    '/terrain_mountain.png', 
    '/terrain_water.png', 
    '/terrain_grass.png', 
];
// Hilfsfunktion, um ein zufälliges Terrain-Bild auszuwählen
const getRandomTerrain = () => terrainImages[Math.floor(Math.random() * terrainImages.length)];
// ====================================================================


const Navigation = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="text-white font-bold text-lg sm:text-xl hidden sm:block">
              Mathe Lernpfad
            </span>
          </div>
          
          <div className="flex gap-2 sm:gap-4">
            <a
              href="/path"
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-white/90 hover:bg-white/20 transition-all font-medium text-sm sm:text-base"
            >
              🗺️ Pfad
            </a>
            <a
              href="/character"
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-white/90 hover:bg-white/20 transition-all font-medium text-sm sm:text-base"
            >
              ⚔️ Character
            </a>
            <a
              href="/dashboard"
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-white/90 hover:bg-white/20 transition-all font-medium text-sm sm:text-base"
            >
              📊 Dashboard
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-3 sm:p-6 lg:p-8">
            <Navigation /> 
            <p>Hello World</p>
        </div>
    );
};

export default HomePage;
