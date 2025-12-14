import React, { useState } from 'react';
import { BookOpen, Award, TrendingUp, ChevronRight, ArrowLeft, Target } from 'lucide-react';

const TutoringCharacterSheet = () => {
  const [studentName, setStudentName] = useState('Max Mustermann');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [stats, setStats] = useState({
    mathematik: 7,
    deutsch: 5,
    englisch: 8,
    physik: 6,
    chemie: 4,
    biologie: 7,
    geschichte: 6,
    geographie: 5,
    informatik: 9,
    kunst: 8,
    musik: 6,
    sport: 7
  });

  const mathSkills = {
    'Algebra & Gleichungen': {
      'Lineare Gleichungen': 8,
      'Quadratische Gleichungen': 7,
      'Gleichungssysteme': 6,
      'Ungleichungen': 5,
      'Potenzen & Wurzeln': 7
    },
    'Geometrie': {
      'Flächenberechnung': 9,
      'Volumenberechnung': 8,
      'Satz des Pythagoras': 7,
      'Trigonometrie': 6,
      'Ähnlichkeit & Kongruenz': 7
    },
    'Funktionen': {
      'Lineare Funktionen': 8,
      'Quadratische Funktionen': 6,
      'Exponentialfunktionen': 5,
      'Funktionen zeichnen': 7,
      'Schnittpunkte berechnen': 6
    },
    'Stochastik': {
      'Wahrscheinlichkeitsrechnung': 7,
      'Kombinatorik': 6,
      'Zufallsexperimente': 8,
      'Erwartungswert': 5,
      'Bedingte Wahrscheinlichkeit': 4
    },
    'Analysis': {
      'Ableitungen': 6,
      'Kurvendiskussion': 5,
      'Extremwerte': 6,
      'Integrale': 4,
      'Wendepunkte': 5
    }
  };

  const categories = {
    'MINT-Fächer': ['mathematik', 'physik', 'chemie', 'biologie', 'informatik'],
    'Sprachen': ['deutsch', 'englisch'],
    'Gesellschaft': ['geschichte', 'geographie'],
    'Kreativ & Sport': ['kunst', 'musik', 'sport']
  };

  const subjectLabels = {
    mathematik: 'Mathematik',
    deutsch: 'Deutsch',
    englisch: 'Englisch',
    physik: 'Physik',
    chemie: 'Chemie',
    biologie: 'Biologie',
    geschichte: 'Geschichte',
    geographie: 'Geographie',
    informatik: 'Informatik',
    kunst: 'Kunst',
    musik: 'Musik',
    sport: 'Sport'
  };

  const subjectDescriptions = {
    mathematik: 'Rechnen, Logik und Problemlösung',
    deutsch: 'Sprache, Literatur und Kommunikation',
    englisch: 'Fremdsprache und internationale Kommunikation',
    physik: 'Naturgesetze und wissenschaftliches Denken',
    chemie: 'Stoffe, Reaktionen und Experimente',
    biologie: 'Leben, Natur und Organismen',
    geschichte: 'Vergangenheit und historisches Verständnis',
    geographie: 'Welt, Kulturen und Räume',
    informatik: 'Programmierung und digitale Kompetenzen',
    kunst: 'Kreativität und visueller Ausdruck',
    musik: 'Rhythmus, Melodie und Ausdruck',
    sport: 'Fitness, Koordination und Teamgeist'
  };

  const getStatColor = (value) => {
    if (value >= 9) return 'bg-green-500';
    if (value >= 7) return 'bg-lime-400';
    if (value >= 5) return 'bg-yellow-400';
    if (value >= 3) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const getGradeFromStat = (value) => {
    if (value >= 9) return '1';
    if (value >= 7) return '2';
    if (value >= 5) return '3';
    if (value >= 3) return '4';
    if (value >= 2) return '5';
    return '6';
  };

  const getLevelText = (value) => {
    if (value >= 9) return 'Meister';
    if (value >= 7) return 'Fortgeschritten';
    if (value >= 5) return 'Durchschnitt';
    if (value >= 3) return 'Anfänger';
    return 'Nachhilfe empfohlen';
  };

  const calculateAverage = () => {
    const values = Object.values(stats);
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  const calculateCategoryAverage = (skills) => {
    const allValues = Object.values(skills).flatMap(cat => Object.values(cat));
    return (allValues.reduce((a, b) => a + b, 0) / allValues.length).toFixed(1);
  };

  const StatBar = ({ subject, value, onClick }) => (
    <div className="mb-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-all" onClick={onClick}>
      <div className="flex justify-between items-center mb-1">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">{subjectLabels[subject]}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-600">{subjectDescriptions[subject]}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">Note: {getGradeFromStat(value)}</span>
          <span className="text-xs px-2 py-1 bg-blue-100 rounded-full">{getLevelText(value)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-6 flex overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 border-r border-gray-300 ${
                i < value ? getStatColor(value) : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-bold w-8 text-gray-700">{value}/10</span>
      </div>
    </div>
  );

  const SkillDetailBar = ({ skill, value }) => (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{skill}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">Note: {getGradeFromStat(value)}</span>
          <span className="text-xs px-2 py-0.5 bg-indigo-100 rounded-full">{value}/10</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-4 flex overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 border-r border-white ${
                i < value ? getStatColor(value) : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const MathDetailView = () => {
    const overallAverage = calculateCategoryAverage(mathSkills);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <button 
              onClick={() => setSelectedSubject(null)}
              className="flex items-center gap-2 mb-4 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Zurück zur Übersicht</span>
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">MATHEMATIK</h1>
                <p className="text-blue-100">Detaillierte Fähigkeiten-Übersicht • Schuljahr 2024/25</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold">{overallAverage}</div>
                <div className="text-sm">Gesamt-Durchschnitt</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-800">
                {Object.keys(mathSkills).length}
              </div>
              <div className="text-sm text-gray-600">Bereiche</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
              <div className="text-2xl font-bold text-gray-800">
                {Object.values(mathSkills).reduce((acc, cat) => acc + Object.keys(cat).length, 0)}
              </div>
              <div className="text-sm text-gray-600">Fähigkeiten</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-gray-800">
                {Object.values(mathSkills).flatMap(cat => Object.values(cat)).filter(v => v >= 7).length}
              </div>
              <div className="text-sm text-gray-600">Stärken</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-gray-800">
                {Object.values(mathSkills).flatMap(cat => Object.values(cat)).filter(v => v < 5).length}
              </div>
              <div className="text-sm text-gray-600">Üben</div>
            </div>
          </div>

          {/* Detailed Skills */}
          <div className="p-8">
            {Object.entries(mathSkills).map(([category, skills]) => {
              const categoryAvg = (Object.values(skills).reduce((a, b) => a + b, 0) / Object.values(skills).length).toFixed(1);
              
              return (
                <div key={category} className="mb-8">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b-4 border-blue-600">
                    <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Bereichs-Durchschnitt:</span>
                      <span className="text-xl font-bold text-blue-600">{categoryAvg}</span>
                      <span className="text-sm px-3 py-1 bg-blue-100 rounded-full font-medium">
                        Note: {getGradeFromStat(parseFloat(categoryAvg))}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {Object.entries(skills).map(([skill, value]) => (
                      <SkillDetailBar key={skill} skill={skill} value={value} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-t-4 border-yellow-400">
            <h3 className="font-bold text-gray-800 mb-3 text-xl">🎯 Empfohlene Schwerpunkte</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(mathSkills)
                .flatMap(([cat, skills]) => 
                  Object.entries(skills)
                    .filter(([_, val]) => val < 5)
                    .map(([skill, val]) => ({ category: cat, skill, value: val }))
                )
                .slice(0, 4)
                .map(({ category, skill, value }) => (
                  <div key={skill} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">{category}</div>
                    <div className="font-medium text-gray-800">{skill}</div>
                    <div className="text-xs text-red-600 mt-1">Aktuell: {value}/10 - Nachhilfe empfohlen</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-100 p-6 border-t">
            <h3 className="font-bold text-gray-800 mb-3">LEGENDE</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span>0-2: Note 6</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-400 rounded"></div>
                <span>3-4: Note 4-5</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span>5-6: Note 3</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lime-400 rounded"></div>
                <span>7-8: Note 2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>9-10: Note 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedSubject === 'mathematik') {
    return <MathDetailView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">SCHÜLER CHARACTER SHEET</h1>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="text-2xl bg-transparent border-b-2 border-white/50 focus:border-white outline-none px-2 py-1"
              />
              <p className="text-sm text-indigo-200 mt-2">💡 Klicke auf ein Fach für Details</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{calculateAverage()}</div>
              <div className="text-sm">Gesamt-Durchschnitt</div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="bg-white rounded-lg p-4 shadow text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
            <div className="text-2xl font-bold text-gray-800">{Object.keys(stats).length}</div>
            <div className="text-sm text-gray-600">Fächer</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-gray-800">
              {Object.values(stats).filter(v => v >= 7).length}
            </div>
            <div className="text-sm text-gray-600">Stärken</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-gray-800">
              {Object.values(stats).filter(v => v < 5).length}
            </div>
            <div className="text-sm text-gray-600">Verbesserungspotenzial</div>
          </div>
        </div>

        {/* Stats by Category */}
        <div className="p-8">
          {Object.entries(categories).map(([category, subjects]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-4 border-indigo-600">
                {category}
              </h2>
              {subjects.map(subject => (
                <StatBar 
                  key={subject} 
                  subject={subject} 
                  value={stats[subject]} 
                  onClick={() => setSelectedSubject(subject)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-gray-100 p-6 border-t">
          <h3 className="font-bold text-gray-800 mb-3">LEGENDE</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <span>0-2: Note 6</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-400 rounded"></div>
              <span>3-4: Note 4-5</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span>5-6: Note 3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-lime-400 rounded"></div>
              <span>7-8: Note 2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>9-10: Note 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringCharacterSheet;