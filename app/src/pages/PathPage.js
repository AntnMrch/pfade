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
              href="/"
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

const PathPage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  // NEU: Zustand zur Speicherung der zufälligen Terrain-Zuweisungen
  const [terrainAssignments, setTerrainAssignments] = useState({});

  const learningPath = [
    {
      id: 1,
      title: "Lineare Gleichungen",
      level: "Bronze",
      levelNumber: 1,
      xp: 250,
      maxXp: 500,
      difficulty: "Einfach",
      estimatedTime: "15-20 Min",
      requiredSkills: ["Lineare Gleichungen", "Gleichungssysteme"],
      skillLevels: { "Lineare Gleichungen": 8, Gleichungssysteme: 6 },
      exercises: 12,
      completedExercises: 12,
      description:
        "Löse einfache lineare Gleichungen und verstehe die Grundprinzipien der Algebra",
      rewards: ["50 XP", "+1 Skill Level"],
      isLocked: false,
      isCompleted: true,
      hexPos: { q: 1, r: 0 },
    },
    {
      id: 2,
      title: "Quadratische Gleichungen",
      level: "Bronze",
      levelNumber: 2,
      xp: 420,
      maxXp: 500,
      difficulty: "Mittel",
      estimatedTime: "20-25 Min",
      requiredSkills: ["Quadratische Gleichungen", "Potenzen & Wurzeln"],
      skillLevels: { "Quadratische Gleichungen": 7, "Potenzen & Wurzeln": 7 },
      exercises: 15,
      completedExercises: 15,
      description:
        "Meistere die p-q-Formel und faktorisiere quadratische Ausdrücke",
      rewards: ["75 XP", "+1 Skill Level", "Bronze Abzeichen"],
      isLocked: false,
      isCompleted: true,
      hexPos: { q: 2, r: 1 },
    },
    {
      id: 3,
      title: "Ungleichungen",
      level: "Silber",
      levelNumber: 1,
      xp: 120,
      maxXp: 750,
      difficulty: "Mittel",
      estimatedTime: "25-30 Min",
      requiredSkills: ["Ungleichungen", "Lineare Gleichungen"],
      skillLevels: { Ungleichungen: 5, "Lineare Gleichungen": 8 },
      exercises: 18,
      completedExercises: 7,
      description: "Löse Ungleichungen und verstehe Lösungsmengen",
      rewards: ["100 XP", "+2 Skill Level"],
      isLocked: false,
      isCompleted: false,
      isActive: true,
      hexPos: { q: 0, r: 2 },
    },
    {
      id: 4,
      title: "Flächenberechnung",
      level: "Silber",
      levelNumber: 2,
      xp: 0,
      maxXp: 750,
      difficulty: "Einfach",
      estimatedTime: "20 Min",
      requiredSkills: ["Flächenberechnung", "Potenzen & Wurzeln"],
      skillLevels: { Flächenberechnung: 9, "Potenzen & Wurzeln": 7 },
      exercises: 16,
      completedExercises: 0,
      description: "Berechne Flächen von Dreiecken, Rechtecken und Kreisen",
      rewards: ["100 XP", "+1 Skill Level"],
      isLocked: false,
      isCompleted: false,
      hexPos: { q: 1, r: 3 },
    },
    {
      id: 5,
      title: "Satz des Pythagoras",
      level: "Gold",
      levelNumber: 1,
      xp: 0,
      maxXp: 1000,
      difficulty: "Schwer",
      estimatedTime: "30-40 Min",
      requiredSkills: ["Satz des Pythagoras", "Flächenberechnung"],
      skillLevels: { "Satz des Pythagoras": 7, Flächenberechnung: 9 },
      exercises: 20,
      completedExercises: 0,
      description: "Wende den Satz des Pythagoras an",
      rewards: ["150 XP", "+2 Skill Level", "Gold Abzeichen"],
      isLocked: true,
      isCompleted: false,
      hexPos: { q: 0, r: 4 },
    },
    {
      id: 6,
      title: "Lineare Funktionen",
      level: "Bronze",
      levelNumber: 3,
      xp: 0,
      maxXp: 500,
      difficulty: "Einfach",
      estimatedTime: "20 Min",
      requiredSkills: ["Lineare Funktionen", "Funktionen zeichnen"],
      skillLevels: { "Lineare Funktionen": 8, "Funktionen zeichnen": 7 },
      exercises: 14,
      completedExercises: 0,
      description: "Verstehe Steigung und zeichne Graphen",
      rewards: ["75 XP", "+1 Skill Level"],
      isLocked: true,
      isCompleted: false,
      hexPos: { q: 2, r: 5 },
    },
    {
      id: 7,
      title: "Wahrscheinlichkeit",
      level: "Silber",
      levelNumber: 3,
      xp: 0,
      maxXp: 750,
      difficulty: "Mittel",
      estimatedTime: "30 Min",
      requiredSkills: ["Wahrscheinlichkeitsrechnung", "Zufallsexperimente"],
      skillLevels: { Wahrscheinlichkeitsrechnung: 7, Zufallsexperimente: 8 },
      exercises: 20,
      completedExercises: 0,
      description: "Berechne Wahrscheinlichkeiten",
      rewards: ["100 XP", "+2 Skill Level"],
      isLocked: true,
      isCompleted: false,
      hexPos: { q: 1, r: 6 },
    },
    {
      id: 8,
      title: "Final Boss",
      level: "Drache",
      levelNumber: "👑",
      xp: 0,
      maxXp: 2000,
      difficulty: "Episch",
      estimatedTime: "60-90 Min",
      requiredSkills: ["Alle bisherigen Skills"],
      skillLevels: { "Gesamtes Modul": 7 },
      exercises: 50,
      completedExercises: 0,
      description: "Bezwinge den Drachen und schließe das Modul ab! Eine epische Prüfung wartet auf dich.",
      rewards: ["500 XP", "+5 Skill Level", "Drachen-Meister Titel", "Modul-Zertifikat"],
      isLocked: false,
      isCompleted: false,
      isBoss: true,
      hexPos: { q: 1, r: 8 },
    },
  ];

const hexToPixel = (q, r, size) => {
  // Diese Logik bleibt unverändert, um Ihre gewünschte Ausrichtung beizubehalten:
  const x = size * Math.sqrt(3) * (q + ((r % 2) / 2));
  const y = size * 3/2 * r;
  return { x, y };
};

const isPathHex = (q, r) => {
    return learningPath.some(lesson => lesson.hexPos.q === q && lesson.hexPos.r === r);
};

const generateHexGrid = () => {
  const hexes = [];
  // Wir erweitern den Bereich deutlich:
  // q (Spalten): von -3 bis 6 (damit links und rechts genug Platz ist)
  // r (Zeilen): von -2 bis 12 (damit auch oben/unten Puffer ist)
  for (let r = -2; r <= 15; r++) {
    for (let q = -3; q <= 12; q++) {
      hexes.push({ q, r });
    }
  }
  return hexes;
};


  const getLevelColor = (level) => {
    const colors = {
      Bronze: "from-orange-400 to-orange-600",
      Silber: "from-gray-300 to-gray-500",
      Gold: "from-yellow-400 to-yellow-600",
      Platin: "from-cyan-400 to-blue-600",
      Drache: "from-red-600 via-orange-600 to-yellow-500",
    };
    return colors[level];
  };

  const getLevelBadgeColor = (level) => {
    const colors = {
      Bronze: "bg-orange-100 text-orange-700 border-orange-300",
      Silber: "bg-gray-100 text-gray-700 border-gray-300",
      Gold: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Platin: "bg-cyan-100 text-cyan-700 border-cyan-300",
      Drache: "bg-red-100 text-red-700 border-red-400",
    };
    return colors[level];
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Einfach: "bg-green-100 text-green-700",
      Mittel: "bg-yellow-100 text-yellow-700",
      Schwer: "bg-orange-100 text-orange-700",
      "Sehr Schwer": "bg-red-100 text-red-700",
      Episch: "bg-gradient-to-r from-red-100 to-orange-100 text-red-800 font-bold",
    };
    return colors[difficulty];
  };

  const getStatColor = (value) => {
    if (value >= 9) return "bg-green-500";
    if (value >= 7) return "bg-lime-400";
    if (value >= 5) return "bg-yellow-400";
    if (value >= 3) return "bg-orange-400";
    return "bg-red-400";
  };

  const Hexagon = ({ q, r, size, lesson, onClick, terrain }) => {
    const { x, y } = hexToPixel(q, r, size);
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      points.push([x + size * Math.cos(angle), y + size * Math.sin(angle)]);
    }

    // KORREKTUR 1 (Null-Pointer-Sicherheit): isLesson ist nur wahr, wenn lesson ein Objekt ist (nicht null oder undefined)
    const isLesson = lesson != null; 
    
    // Wir können die lesson-Properties nur lesen, wenn isLesson true ist
    const isBoss = isLesson ? lesson.isBoss : false; 
    const isActive = isLesson ? lesson.isActive : false;
    const isCompleted = isLesson ? lesson.isCompleted : false;
    const isLocked = isLesson ? lesson.isLocked : false;

    let fillColor = "#8b5cf6";
    let opacity = 0.15;
    let strokeColor = "#6d28d9";
    let strokeWidth = 2;

    if (isLesson) {
      if (isBoss) {
        fillColor = "#dc2626";
        opacity = 0.95;
        strokeColor = "#991b1b";
        strokeWidth = 8;
      } else if (isCompleted) {
        fillColor = "#22c55e";
        opacity = 0.9;
        strokeColor = "#16a34a";
        strokeWidth = 4;
      } else if (isActive) {
        fillColor = "#3b82f6";
        opacity = 0.9;
        strokeColor = "#2563eb";
        strokeWidth = 6;
      } else if (isLocked) {
        fillColor = "#9ca3af";
        opacity = 0.6;
        strokeColor = "#6b7280";
        strokeWidth = 3;
      } else {
        fillColor = "#8b5cf6";
        opacity = 0.8;
        strokeColor = "#7c3aed";
        strokeWidth = 4;
      }
    }

    return (
      <g
        onClick={isLesson && !isLocked ? onClick : undefined}
        className={isLesson && !isLocked ? "cursor-pointer" : ""}
        // Die Transformation positioniert die gesamte <g> Gruppe
        transform={`translate(${x}, ${y})`} 
      >
        
        {/* 1. Hintergrund / Terrain Bild (NUR für Hexagone ohne Lektion) */}
        {!isLesson && terrain && (
            <g>
                <clipPath id={`clip-${q}-${r}`}>
                    {/* KORREKTUR 3 (Wasser-Fix): Punkte sind relativ zu (0,0) der <g>-Gruppe */}
                    <polygon 
                        points={points.map((p) => [p[0] - x, p[1] - y].join(",")).join(" ")} 
                    />
                </clipPath>
                
                <image
                    href={terrain} 
                    clipPath={`url(#clip-${q}-${r})`}
                    // x und y sind relativ zur Hex-Mitte (0,0)
                    x={-size * 1.15} 
                    y={-size}
                    height={size * 2}
                    width={size * 2.3} 
                    preserveAspectRatio="xMidYMid slice"
                />
            </g>
        )}
        
        {/* 2. Hexagon-Rand und Füllung */}
        <polygon
          points={points.map((p) => (
            // Punkte sind relativ zu (0,0) der <g>-Gruppe
            [p[0] - x, p[1] - y].join(",")
          )).join(" ")}
          fill={isLesson ? fillColor : 'none'} 
          opacity={isLesson ? opacity : 1}
          stroke={isLesson ? strokeColor : 'none'} 
          strokeWidth={isLesson ? strokeWidth : 0}
          className={
            isLesson && !isLocked ? "hover:opacity-100 transition-all" : ""
          }
        />

        {/* 3. Lektions-Inhalt (Nur, wenn es eine Lektion ist!) */}
        {isLesson && (
          <g>
            
            {/* ---------------- WENN ES DER ENDBOSS IST (DRACHE) ---------------- */}
            {isBoss && (
              // KORREKTUR 2 (Mobile-Fix): Positionierung ist relativ zu (0,0) der <g>-Gruppe
              <image
                href="/drache.jpg" 
                alt="drache"
                x={-35} 
                y={-60} 
                width="70" 
                height="70"
                style={{ pointerEvents: 'none', filter: 'drop-shadow(3px 3px 2px rgba(0,0,0,0.5))' }}
              />
            )}
            
            {/* ---------------- WENN ES DIE AKTUELLE LEKTION IST (RITTER) ---------------- */}
            {!isBoss && isActive && (
              <g>
                {/* Stern-Abzeichen (direkt über dem Bild, Position unverändert) */}
                <g transform="translate(0, 0)"> 
                  <circle cx="0" cy="0" r="18" fill="white" opacity="0.9" />
                  <foreignObject x="-15" y="-15" width="30" height="30">
                    <div className="flex items-center justify-center w-full h-full">
                      <Star className="w-7 h-7 text-blue-600 fill-blue-600" />
                    </div>
                  </foreignObject>
                </g>
                {/* NEUE KORREKTUR: Ritter als reines <image> rendern, analog zum Drachen */}
                <image
                    href="/matheritter.jpg"
                    alt="matheritter"
                    // Positionierung relativ zur Hex-Mitte (0,0)
                    x={-35} 
                    y={-70} 
                    width="70" 
                    height="70"
                    style={{ pointerEvents: 'none', filter: 'drop-shadow(3px 3px 2px rgba(0,0,0,0.5))' }}
                />
                
                
              </g>
            )}

            {/* ---------------- SYMBOL IN DER MITTE ---------------- */}
            {!isBoss && !isActive && (
              <g transform="translate(0, -5)">
                <circle cx="0" cy="0" r="18" fill="white" opacity="0.9" />
                <foreignObject x="-15" y="-15" width="30" height="30">
                  <div className="flex items-center justify-center w-full h-full">
                    {isCompleted && <CheckCircle className="w-7 h-7 text-green-600" />}
                    {isLocked && <Lock className="w-6 h-6 text-gray-600" />}
                    {!isCompleted && !isLocked && <Trophy className="w-6 h-6 text-purple-600" />}
                  </div>
                </foreignObject>
              </g>
            )}
            
            {/* TEXT-Labels unter den Hexagons */}
            <text
              x="0"
              y={isBoss ? "50" : "25"} 
              textAnchor="middle"
              className={`text-xs font-bold ${isBoss ? "fill-red-100" : "fill-white"}`}
              style={{ fontSize: isBoss ? "13px" : "11px", pointerEvents: "none" }}
            >
              {isBoss ? "BOSS" : lesson.title.split(" ")[0]} 
            </text>
            {!isBoss && (
              <text
                x="0"
                y="37"
                textAnchor="middle"
                className="text-xs fill-white"
                style={{ fontSize: "10px", pointerEvents: "none" }}
              >
                {lesson.title.split(" ").slice(1).join(" ")}
              </text>
            )}
          </g>
        )}
      </g>
    );
  };

  const PathLine = ({ from, to, completed }) => {
    const size = 60;
    const start = hexToPixel(from.q, from.r, size);
    const end = hexToPixel(to.q, to.r, size);

    return (
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={completed ? "#22c55e" : "#d1d5db"}
        strokeWidth="6"
        strokeDasharray={completed ? "0" : "10,5"}
        opacity="0.8"
      />
    );
  };

  const DetailModal = ({ lesson }) => {
    if (!lesson) return null;
    const progressPercent = (lesson.xp / lesson.maxXp) * 100;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4"
        onClick={() => setSelectedLesson(null)}
      >
        <div
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`bg-gradient-to-r ${getLevelColor(
              lesson.level
            )} p-4 sm:p-6 text-white relative`}
          >
            <button
              onClick={() => setSelectedLesson(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
              <span
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 ${getLevelBadgeColor(
                  lesson.level
                )}`}
              >
                {lesson.level} • Level {lesson.levelNumber}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{lesson.title}</h2>
            <p className="text-sm sm:text-base text-white/90">{lesson.description}</p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-2">
                <span className="font-semibold">Fortschritt</span>
                <span className="font-bold text-base sm:text-lg text-indigo-600">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getLevelColor(
                    lesson.level
                  )}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>
                  💎 {lesson.xp} / {lesson.maxXp} XP
                </span>
                <span>
                  📝 {lesson.completedExercises}/{lesson.exercises} Aufgaben
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold ${getDifficultyColor(
                  lesson.difficulty
                )}`}
              >
                🎯 {lesson.difficulty}
              </span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold bg-blue-100 text-blue-700">
                ⏱️ {lesson.estimatedTime}
              </span>
            </div>

            <div className="mb-4 sm:mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-5 rounded-xl border border-indigo-100">
              <h3 className="text-xs sm:text-sm font-bold text-indigo-900 mb-3 sm:mb-4 uppercase flex items-center gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                Benötigte Skills & Dein Rang:
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {lesson.requiredSkills.map((skill) => {
                  const level = lesson.skillLevels[skill];
                  const rank =
                    level >= 9
                      ? "🏆 Meister"
                      : level >= 7
                      ? "⭐ Fortgeschritten"
                      : level >= 5
                      ? "📈 Durchschnitt"
                      : "🔰 Anfänger";
                  return (
                    <div
                      key={skill}
                      className="bg-white p-3 sm:p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-semibold text-gray-800">
                          {skill}
                        </span>
                        <span className="text-xs font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                          {rank}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex gap-0.5 sm:gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-4 sm:h-5 rounded-sm ${
                                i < level ? getStatColor(level) : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-gray-700 min-w-[2.5rem] text-right">
                          {level}/10
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-4 sm:mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-5 rounded-xl border-2 border-yellow-200">
              <h3 className="text-xs sm:text-sm font-bold text-yellow-900 mb-2 sm:mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                🎁 Belohnungen:
              </h3>
              <div className="flex flex-wrap gap-2">
                {lesson.rewards.map((reward, idx) => (
                  <span
                    key={idx}
                    className="text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-yellow-300"
                  >
                    {reward}
                  </span>
                ))}
              </div>
            </div>

            <button
              disabled={lesson.isLocked}
              className={`w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg
                ${
                  lesson.isLocked
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : lesson.isCompleted
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    : lesson.isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                }`}
            >
              {lesson.isLocked
                ? "🔒 Vorherige Lektionen"
                : lesson.isCompleted
                ? "✓ Wiederholen"
                : lesson.isActive
                ? "▶ Weiterlernen!"
                : lesson.isBoss
                ? "⚔️ Boss bekämpfen!"
                : "🚀 Starten"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const totalXP = learningPath.reduce((sum, l) => sum + l.xp, 0);
  const completedCount = learningPath.filter((l) => l.isCompleted).length;
  const currentLesson = learningPath.find((l) => l.isActive);
  const hexSize = 60;
  const gridHexes = generateHexGrid();
  
  // NEU: Initialisierung der Terrain-Zuweisungen
  // Verwendung von useMemo, um die Zuweisungen nur einmalig beim ersten Rendern durchzuführen
  React.useMemo(() => {
    const newAssignments = {};
    gridHexes.forEach(hex => {
        const key = `${hex.q}-${hex.r}`;
        // Nur Hexagone, die KEINE Lektion sind, erhalten zufälliges Terrain
        if (!isPathHex(hex.q, hex.r)) {
            newAssignments[key] = getRandomTerrain();
        }
    });
    setTerrainAssignments(newAssignments);
  }, []); // Leeres Array als Abhängigkeit, damit es nur einmal läuft


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-3 sm:p-6 lg:p-8">
        <Navigation /> 
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 text-white border border-white/20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-lg text-center sm:text-left">
            🎯 Dein Mathe-Lernpfad
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-4 sm:mb-6 text-center sm:text-left">
            Folge dem Hexagon-Pfad zum Mathe-Meister!
          </p>

          <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300">
                {completedCount}/{learningPath.length}
              </div>
              <div className="text-xs sm:text-sm text-white/70">Abgeschlossen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-300">
                {totalXP}
              </div>
              <div className="text-xs sm:text-sm text-white/70">Gesamt XP</div>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-purple-800 to-indigo-800 rounded-2xl sm:rounded-3xl shadow-2xl p-2 sm:p-6 lg:p-8 overflow-x-auto">
          
            <svg
            width="100%"
            height="100%"
            viewBox="-200 -100 750 1100" 
            className="mx-auto"
            preserveAspectRatio="xMidYMid slice"
            >
          
            {/* 1. ALLE Hexagone (Terrain & Missionen) MÜSSEN ZUERST GERENDERT WERDEN */}
            {gridHexes.map((hex, i) => {
              const lesson = learningPath.find(
                (l) => l.hexPos.q === hex.q && l.hexPos.r === hex.r
              );
              
              const key = `${hex.q}-${hex.r}`;
              
              return (
                <Hexagon
                  key={i}
                  q={hex.q}
                  r={hex.r}
                  size={hexSize}
                  lesson={lesson}
                  onClick={() => lesson && setSelectedLesson(lesson)}
                  terrain={lesson ? null : terrainAssignments[key]}
                />
              );
            })}
            
            {/* 2. Pfad-Linien (Jetzt ZULETZT gerendert, damit sie drüber liegen) */}
            {learningPath.map((lesson, i) => {
              if (i === 0) return null;
              const prevLesson = learningPath[i - 1];
              return (
                <PathLine
                  key={`path-${i}`}
                  from={prevLesson.hexPos}
                  to={lesson.hexPos}
                  completed={prevLesson.isCompleted} 
                />
              );
            })}
            
          </svg>
        </div>

        <div className="mt-4 sm:mt-6 lg:mt-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 sm:p-6 border border-white/20">
          <h3 className="font-bold text-white mb-3 sm:mb-4 text-center text-sm sm:text-base">Legende</h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-500"></div>
              <span>Abgeschlossen</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500"></div>
              <span>Aktuell</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-500"></div>
              <span>Verfügbar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-400"></div>
              <span>Gesperrt</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-600 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span>Boss</span>
            </div>
          </div>
        </div>
      </div>

      {selectedLesson && <DetailModal lesson={selectedLesson} />}
    </div>
  );
};

export default PathPage;
