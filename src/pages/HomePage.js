import React, { useState } from "react";
import {
  Trophy,
  Star,
  Lock,
  CheckCircle,
  Target,
  Award,
  X,
  Shield,
  Sword,
} from "lucide-react";


const HomePage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

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
      hexPos: { q: 0, r: 0 },
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
      hexPos: { q: -1, r: 1 },
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
      hexPos: { q: 1, r: 2 },
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
      hexPos: { q: -1, r: 5 },
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
      hexPos: { q: 1, r: 5 },
    },
  ];

  const hexToPixel = (q, r, size) => {
    const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
    const y = size * ((3 / 2) * r);
    return { x, y };
  };

  const generateHexGrid = () => {
    const hexes = [];
    for (let q = -2; q <= 2; q++) {
      for (let r = -1; r <= 6; r++) {
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
    };
    return colors[level];
  };

  const getLevelBadgeColor = (level) => {
    const colors = {
      Bronze: "bg-orange-100 text-orange-700 border-orange-300",
      Silber: "bg-gray-100 text-gray-700 border-gray-300",
      Gold: "bg-yellow-100 text-yellow-700 border-yellow-300",
      Platin: "bg-cyan-100 text-cyan-700 border-cyan-300",
    };
    return colors[level];
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Einfach: "bg-green-100 text-green-700",
      Mittel: "bg-yellow-100 text-yellow-700",
      Schwer: "bg-orange-100 text-orange-700",
      "Sehr Schwer": "bg-red-100 text-red-700",
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

  const Hexagon = ({ q, r, size, lesson, onClick }) => {
    const { x, y } = hexToPixel(q, r, size);
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      points.push([x + size * Math.cos(angle), y + size * Math.sin(angle)]);
    }

    const isLesson = lesson !== undefined;
    const isActive = lesson?.isActive;
    const isCompleted = lesson?.isCompleted;
    const isLocked = lesson?.isLocked;

    let fillColor = "#8b5cf6";
    let opacity = 0.15;
    let strokeColor = "#6d28d9";
    let strokeWidth = 2;

    if (isLesson) {
      if (isCompleted) {
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
      >
        <polygon
          points={points.map((p) => p.join(",")).join(" ")}
          fill={fillColor}
          opacity={opacity}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          className={
            isLesson && !isLocked ? "hover:opacity-100 transition-all" : ""
          }
        />
        {isLesson && (
          <g transform={`translate(${x}, ${y})`}>
            {isLocked && (
              <g transform="translate(0, -5)">
                <circle cx="0" cy="0" r="18" fill="white" opacity="0.9" />
                <foreignObject x="-15" y="-15" width="30" height="30">
                  <div className="flex items-center justify-center w-full h-full">
                    <Lock className="w-6 h-6 text-gray-600" />
                  </div>
                </foreignObject>
              </g>
            )}
            {isCompleted && (
              <g transform="translate(0, -5)">
                <circle cx="0" cy="0" r="18" fill="white" opacity="0.9" />
                <foreignObject x="-15" y="-15" width="30" height="30">
                  <div className="flex items-center justify-center w-full h-full">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                </foreignObject>
              </g>
            )}
            {isActive && (
              <g transform="translate(0, -5)">
                <circle cx="0" cy="0" r="18" fill="white" opacity="0.9" />
                <foreignObject x="-15" y="-15" width="30" height="30">
                  <div className="flex items-center justify-center w-full h-full">
                    <Star className="w-7 h-7 text-blue-600 fill-blue-600" />
                  </div>
                </foreignObject>
              </g>
            )}
            {!isLocked && !isCompleted && !isActive && (
              <g transform="translate(0, -5)">
                <circle cx="0" cy="0" r="18" fill="white" opacity="0.9" />
                <foreignObject x="-15" y="-15" width="30" height="30">
                  <div className="flex items-center justify-center w-full h-full">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                </foreignObject>
              </g>
            )}
            <text
              x="0"
              y="25"
              textAnchor="middle"
              className="text-xs font-bold fill-white"
              style={{ fontSize: "11px", pointerEvents: "none" }}
            >
              {lesson.title.split(" ")[0]}
            </text>
            <text
              x="0"
              y="37"
              textAnchor="middle"
              className="text-xs fill-white"
              style={{ fontSize: "10px", pointerEvents: "none" }}
            >
              {lesson.title.split(" ").slice(1).join(" ")}
            </text>
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
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedLesson(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`bg-gradient-to-r ${getLevelColor(
              lesson.level
            )} p-6 text-white relative`}
          >
            <button
              onClick={() => setSelectedLesson(null)}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-start gap-3 mb-3">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 ${getLevelBadgeColor(
                  lesson.level
                )}`}
              >
                {lesson.level} • Level {lesson.levelNumber}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">{lesson.title}</h2>
            <p className="text-white/90">{lesson.description}</p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span className="font-semibold">Fortschritt</span>
                <span className="font-bold text-lg text-indigo-600">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
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

            <div className="flex gap-3 mb-6">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${getDifficultyColor(
                  lesson.difficulty
                )}`}
              >
                🎯 {lesson.difficulty}
              </span>
              <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-100 text-blue-700">
                ⏱️ {lesson.estimatedTime}
              </span>
            </div>

            <div className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-bold text-indigo-900 mb-4 uppercase flex items-center gap-2">
                <Target className="w-5 h-5" />
                Benötigte Skills & Dein aktueller Rang:
              </h3>
              <div className="space-y-3">
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
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">
                          {skill}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                          {rank}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-5 rounded-sm ${
                                i < level ? getStatColor(level) : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-gray-700 min-w-[3rem] text-right">
                          {level}/10
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border-2 border-yellow-200">
              <h3 className="text-sm font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                🎁 Belohnungen beim Abschluss:
              </h3>
              <div className="flex flex-wrap gap-2">
                {lesson.rewards.map((reward, idx) => (
                  <span
                    key={idx}
                    className="font-medium bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full border border-yellow-300"
                  >
                    {reward}
                  </span>
                ))}
              </div>
            </div>

            <button
              disabled={lesson.isLocked}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg
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
                ? "🔒 Vorherige Lektionen abschließen"
                : lesson.isCompleted
                ? "✓ Wiederholen"
                : lesson.isActive
                ? "▶ Weiterlernen!"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-8 text-white border border-white/20">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">
            🎯 Dein Mathe-Lernpfad
          </h1>
          <p className="text-white/80 text-lg mb-6">
            Folge dem Hexagon-Pfad zum Mathe-Meister!
          </p>

          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-300">
                {completedCount}/{learningPath.length}
              </div>
              <div className="text-sm text-white/70">Abgeschlossen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-300">
                {totalXP}
              </div>
              <div className="text-sm text-white/70">Gesamt XP</div>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-purple-800 to-indigo-800 rounded-3xl shadow-2xl p-8 overflow-hidden">
          <svg
            width="100%"
            height="1000"
            viewBox="-200 -100 800 1000"
            className="mx-auto"
          >
            {gridHexes.map((hex, i) => {
              const lesson = learningPath.find(
                (l) => l.hexPos.q === hex.q && l.hexPos.r === hex.r
              );
              return (
                <Hexagon
                  key={i}
                  q={hex.q}
                  r={hex.r}
                  size={hexSize}
                  lesson={lesson}
                  onClick={() => lesson && setSelectedLesson(lesson)}
                />
              );
            })}

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

            {currentLesson && (
              <g
                transform={`translate(${
                  hexToPixel(
                    currentLesson.hexPos.q,
                    currentLesson.hexPos.r,
                    hexSize
                  ).x
                }, ${
                  hexToPixel(
                    currentLesson.hexPos.q,
                    currentLesson.hexPos.r,
                    hexSize
                  ).y - 70
                })`}
              >
                <foreignObject x="-50" y="-70" width="100" height="140">
                  <div className="flex flex-col items-center">
                    <img src="matheritter.jpg" alt="matheritter" className="w-24 h-auto drop-shadow-xl" />
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>
        </div>


        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
          <h3 className="font-bold text-white mb-4 text-center">Legende</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
              <span>Abgeschlossen</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500"></div>
              <span>Aktuell</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500"></div>
              <span>Verfügbar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              <span>Gesperrt</span>
            </div>
          </div>
        </div>
      </div>

      {selectedLesson && <DetailModal lesson={selectedLesson} />}
    </div>
  );
};

export default HomePage;