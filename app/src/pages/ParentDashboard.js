import React from 'react';
import { Users, Clock, Zap, BarChart3, TrendingUp } from 'lucide-react';

// ====================================================================
// 1. HILFSFUNKTIONEN (Für Noten und Farben)
// ====================================================================

/**
 * Definiert die prozentualen Schwellenwerte für die Noteneinstufung.
 */
const getGradeFromPoints = (points) => {
    if (points >= 90) return 1.0;
    if (points >= 80) return 2.0;
    if (points >= 65) return 3.0;
    if (points >= 50) return 4.0;
    if (points >= 30) return 5.0;
    return 6.0; // Unter 30%
};

/**
 * Gibt die entsprechende Tailwind CSS Farbe für eine Note zurück.
 */
const getGradeColor = (grade) => {
    if (grade <= 2) return 'text-green-600';
    if (grade <= 3) return 'text-lime-600';
    if (grade <= 4) return 'text-orange-600';
    return 'text-red-600';
};

/**
 * Schätzt die Note basierend auf der Anzahl abgeschlossener Module.
 */
const getGradeFromModules = (modules) => {
    if (modules >= 9) return 1.5;
    if (modules >= 7) return 2.0;
    if (modules >= 5) return 3.0;
    if (modules >= 3) return 4.0;
    return 5.0;
};

// ====================================================================
// 2. Mock-Daten
// ====================================================================

const mockDashboardData = {
    studentName: 'Max Mustermann',
    totalModulesCompleted: 14,
    totalTutoringHours: 25,
    averageGradeImprovement: 0.8,
    currentGrades: [
        { subject: 'Mathematik', grade: 2.5, modules: 7, points: 75, latestExamPoints: [60, 70, 75] }, 
        { subject: 'Physik', grade: 3.0, modules: 3, points: 60, latestExamPoints: [65, 60, 60] },
        { subject: 'Englisch', grade: 1.8, modules: 9, points: 90, latestExamPoints: [85, 90] },
        { subject: 'Chemie', grade: 4.2, modules: 0, points: 40, latestExamPoints: [20, 30, 40] },
    ],
    tutorEffectiveness: [
        { subject: 'Mathematik', tutor: 'Frau Schmidt', initialPoints: 45, currentPoints: 75, hours: 10 }, 
        { subject: 'Physik', tutor: 'Herr Müller', initialPoints: 60, currentPoints: 60, hours: 5 },      
        { subject: 'Chemie', tutor: 'Fr. Wagner', initialPoints: 20, currentPoints: 50, hours: 8 },       
    ],
    mathCompetence: {
        labels: ['Algebra', 'Geometrie', 'Funktionen', 'Stochastik', 'Analysis'],
        initial: [40, 60, 50, 30, 20], // in Prozent
        current: [75, 80, 65, 55, 45],
    },
    monthlyActivity: [5, 8, 12, 10, 15, 20],
    gradeTrend: [3.5, 3.2, 3.0, 2.8, 2.7, 2.5],
};


// ====================================================================
// 3. UI-KOMPONENTEN
// ====================================================================

const Navigation = () => {
    // Neue Variable für den aktiven Zustand der Nachhilfeseite
    const isTutoringActive = window.location.pathname === '/tutoring';
    
    // Bestehende Variablen
    const isDashboardActive = window.location.pathname === '/dashboard';
    const isCharacterActive = window.location.pathname === '/character';
    // Annahme: Startseite ist die Pfad-Auswahl
    const isPathActive = window.location.pathname === '/path';
    
    // Da die LandingPage jetzt auf '/' liegt, müssen wir das auch berücksichtigen:
    const isHomeActive = window.location.pathname === '/'; 

    return (
        <nav className="bg-indigo-800/95 backdrop-blur-sm border-b border-white/30 sticky top-0 z-50 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl text-white">🎓</span>
                        <span className="text-white font-bold text-lg sm:text-xl">
                            Lernplattform
                        </span>
                    </div>

                    <div className="flex gap-1 sm:gap-4">
                        {/* PFAD (geändert auf /path, oder Home falls LandingPage gemeint ist) */}
                        <a
                            href="/" // Landet auf der Startseite mit der Pfad-Auswahl
                            className={`p-2 sm:px-4 sm:py-2 rounded-lg text-white/90 transition-all font-medium text-sm sm:text-base flex items-center ${isHomeActive || isPathActive ? 'bg-white/20' : 'hover:bg-white/20'}`}
                        >
                            <span className="hidden sm:inline">🗺️ Start</span>
                            <span className="sm:hidden text-lg">🗺️</span>
                        </a>
                        
                        {/* NEU: NACHHILFE */}
                        <a
                            href="/tutoring"
                            className={`p-2 sm:px-4 sm:py-2 rounded-lg text-white/90 transition-all font-medium text-sm sm:text-base flex items-center ${isTutoringActive ? 'bg-white/20' : 'hover:bg-white/20'}`}
                        >
                            <span className="hidden sm:inline">🧑‍🏫 Nachhilfe</span>
                            <span className="sm:hidden text-lg">🧑‍🏫</span>
                        </a>
                        
                        {/* CHARACTER */}
                        <a
                            href="/character"
                            className={`p-2 sm:px-4 sm:py-2 rounded-lg text-white/90 transition-all font-medium text-sm sm:text-base flex items-center ${isCharacterActive ? 'bg-white/20' : 'hover:bg-white/20'}`}
                        >
                            <span className="hidden sm:inline">⚔️ Character</span>
                            <span className="sm:hidden text-lg">⚔️</span>
                        </a>
                        
                        {/* DASHBOARD */}
                        <a
                            href="/dashboard"
                            className={`p-2 sm:px-4 sm:py-2 rounded-lg text-white/90 transition-all font-medium text-sm sm:text-base flex items-center ${isDashboardActive ? 'bg-white/20' : 'hover:bg-white/20'}`}
                        >
                            <span className="hidden sm:inline">📊 Dashboard</span>
                            <span className="sm:hidden text-lg">📊</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const DashboardCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-[1.02]">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')}`}>
            {React.cloneElement(icon, { className: `w-6 h-6 ${color}` })}
        </div>
    </div>
);

const ImprovementBar = ({ subject, tutor, initialPoints, currentPoints, hours }) => {
    
    const improvement = currentPoints - initialPoints;
    const initialGrade = getGradeFromPoints(initialPoints);
    const currentGrade = getGradeFromPoints(currentPoints);
    
    const efficiency = improvement > 0 ? (improvement / hours) : null; 

    return (
        <div className="mb-4 border-b pb-3 last:border-b-0">
            <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold text-gray-800">{subject}</h4>
                <div className="text-sm text-gray-600 hidden sm:block">
                    Nachhilfelehrer: <span className="font-medium text-indigo-600">{tutor}</span>
                </div>
            </div>
            
            <div className="flex items-center justify-between text-sm flex-wrap">
                <div className={`font-bold ${getGradeColor(currentGrade)}`}>
                    Akt. Pkt.: {currentPoints} (Vorher: {initialPoints})
                </div>
                <div className={`px-2 py-0.5 rounded-full text-xs font-bold mt-1 sm:mt-0 ${improvement > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {improvement > 0 ? `+${improvement} Punkte verbessert` : `Punkte unverändert`}
                </div>
            </div>

            <div className="text-xs text-gray-500 mt-2 flex justify-between">
                <div>
                    Aufgewendete Stunden: <span className="font-bold text-gray-700">{hours}</span>
                </div>
                {efficiency !== null && (
                    <div className="font-semibold text-indigo-700">
                        Effizienz: <span className="text-base">{efficiency.toFixed(1)}</span> Pkt./Std.
                    </div>
                )}
            </div>
            
            <p className="text-xs text-gray-400 mt-1">
                Geschätzte Note: {currentGrade} (Vorher: {initialGrade})
            </p>
        </div>
    );
};

const ChartPlaceholder = ({ data, label, color, type, labels }) => {
    const maxVal = type === 'grade' ? 4.5 : Math.max(...data) * 1.1; 
    const minVal = type === 'grade' ? 1 : 0; 
    
    return (
        <div className="p-4 bg-white rounded-lg shadow-inner mt-4">
            <h4 className="font-bold text-gray-800 mb-3">{label}</h4>
            <div className="h-40 flex items-end border-b border-gray-300">
                {data.map((val, index) => {
                    let height;
                    let barColor;

                    if (type === 'grade') {
                        const invertedVal = maxVal - val;
                        const range = maxVal - minVal;
                        height = (invertedVal / (range || 1)) * 90 + 10; 
                        
                        if (val <= 2) barColor = 'bg-green-500';
                        else if (val <= 3) barColor = 'bg-lime-500';
                        else if (val <= 4) barColor = 'bg-yellow-500';
                        else barColor = 'bg-red-500';
                        
                    } else { 
                        const range = maxVal - minVal;
                        height = (val / (range || 1)) * 90 + 10;
                        barColor = color;
                    }

                    return (
                        <div key={index} className="flex-1 px-1 flex flex-col items-center justify-end h-full">
                            <span className="text-xs text-gray-600 mb-1">{val.toFixed(type === 'grade' ? 1 : 0)}</span>
                            <div 
                                className={`w-full rounded-t-lg ${barColor} transition-all duration-500`} 
                                style={{ height: `${height}%` }}
                            ></div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
                {(labels || ['Aug', 'Sep', 'Okt', 'Nov', 'Dez', 'Jan']).map((label, i) => (
                     <span key={i} className="flex-1 text-center">{label}</span>
                ))}
            </div>
        </div>
    );
};

const RadarChartPlaceholder = ({ data }) => {
    return (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h5 className="font-semibold text-gray-700 mb-3">Beherrschungsgrad (%)</h5>
            <div className="space-y-2">
                {data.labels.map((label, index) => (
                    <div key={label} className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-600">{label}</span>
                        <div className="flex items-center gap-3">
                            <div className="text-xs">
                                <span className="text-indigo-500 font-bold">{data.current[index]}%</span> aktuell
                            </div>
                            <div className="text-xs text-gray-400">
                                ({data.initial[index]}% vorher)
                            </div>
                            <TrendingUp 
                                className={`w-4 h-4 ${data.current[index] > data.initial[index] ? 'text-green-500' : 'text-red-500'}`} 
                            />
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">Visualisiert die Schließung von Wissenslücken in den Unterthemen.</p>
        </div>
    );
};


const EfficiencyChartPlaceholder = ({ data }) => {
    const efficientData = data
        .filter(d => (d.currentPoints - d.initialPoints) > 0)
        .map(d => ({
            subject: d.subject,
            improvement: d.currentPoints - d.initialPoints,
            efficiency: (d.currentPoints - d.initialPoints) / d.hours, 
        }))
        .sort((a, b) => b.efficiency - a.efficiency); 
    
    const maxEfficiency = Math.max(...efficientData.map(d => d.efficiency));
    
    return (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h5 className="font-semibold text-gray-700 mb-3">Punkte/Std. Verbesserung (Effizienz)</h5>
            <div className="space-y-3">
                {efficientData.map((item) => (
                    <div key={item.subject} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-20 flex-shrink-0">{item.subject}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 flex items-center overflow-hidden">
                            <div 
                                className="h-full bg-blue-500 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold whitespace-nowrap" 
                                style={{ width: `${(item.efficiency / maxEfficiency) * 100}%`, minWidth: '40px' }}
                            >
                                {item.efficiency.toFixed(1)} Pkt./Std. 
                            </div>
                            <span className="text-xs text-gray-700 pl-2"> (+{item.improvement} Pkt.) </span>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">Höhere Werte = effizientere Nachhilfe (mehr Punktgewinn pro Stunde).</p>
        </div>
    );
};

// **KORRIGIERT:** Visuelle Darstellung der Punkte-zu-Note-Skala mit Inline-CSS Farbwerten
const PointsToGradeVisualizer = ({ currentPoints, latestPoints = [] }) => {
    const maxPoints = 100;
    // Skala mit prozentualen Minima UND den tatsächlichen CSS-Hintergrundfarben (Hex-Codes für Tailwind-Farben)
    const scale = [
        { min: 90, grade: 1.0, cssColor: '#10B981' },     // Green-500
        { min: 80, grade: 2.0, cssColor: '#84CC16' },     // Lime-500
        { min: 65, grade: 3.0, cssColor: '#FBBF24' },     // Yellow-500
        { min: 50, grade: 4.0, cssColor: '#F97316' },     // Orange-500
        { min: 30, grade: 5.0, cssColor: '#EF4444' },     // Red-500
        { min: 0, grade: 6.0, cssColor: '#B91C1C' },      // Red-700
    ];
    
    const estimatedGrade = getGradeFromPoints(currentPoints);
    const estimatedGradeColor = getGradeColor(estimatedGrade);

    return (
        <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Probeklausurpunkte: <span className="text-indigo-600">{currentPoints} / 100</span></h4>
            
            {/* Balken */}
            <div className="relative h-4 rounded-full bg-gray-300 overflow-hidden">
                {/* Farbsegmente (Skala) */}
                {scale.map((item, index) => {
                    const nextMin = scale[index - 1]?.min || maxPoints;
                    const currentMin = item.min;
                    
                    const widthPercentage = (nextMin - currentMin) / maxPoints * 100;
                    const leftPercentage = currentMin / maxPoints * 100;
                    
                    return (
                        <div 
                            key={item.grade}
                            className={`h-full absolute top-0`}
                            style={{ 
                                // Verwendung des direkten Farbcodes im Style-Attribut
                                background: item.cssColor, 
                                left: `${leftPercentage}%`,
                                width: `${widthPercentage}%`
                            }}
                        />
                    );
                })}
                
                {/* Aktueller Punktemarker (schwarz) */}
                <div 
                    className="absolute top-0 bottom-0 w-1.5 bg-black rounded-full shadow-lg z-10"
                    style={{ left: `${(currentPoints / maxPoints) * 100}%`, transform: 'translateX(-50%)' }}
                ></div>
                
                {/* Historische Punkte (kleine, helle Punkte) */}
                {latestPoints.slice(0, -1).map((points, index) => (
                    <div 
                        key={index}
                        className="absolute top-0 bottom-0 w-1 h-full bg-black/30 rounded-full"
                        style={{ left: `${(points / maxPoints) * 100}%`, transform: 'translateX(-50%)' }}
                    ></div>
                ))}
            </div>

            {/* Noten-Titel */}
            <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">Geschätzte Note (Pkt-Score):</span>
                <span className={`text-xl font-extrabold ${estimatedGradeColor}`}>
                    {estimatedGrade.toFixed(1)}
                </span>
            </div>
        </div>
    );
};

// Karte für aktuelle Leistung pro Fach (integriert die Visualisierung)
const CurrentGradesCard = ({ subject, grade, modules, points, latestExamPoints }) => {
    const estimatedGradeModule = getGradeFromModules(modules);

    return (
        <div className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white">
            <h3 className="font-bold text-lg text-gray-700">{subject}</h3>
            
            <PointsToGradeVisualizer currentPoints={points} latestPoints={latestExamPoints} />

            <div className="mt-2 flex justify-between items-center border-t pt-2">
                <span className="text-sm text-gray-500">Offizielle Zeugnisnote:</span>
                <span className={`text-lg font-bold ${getGradeColor(grade)}`}>
                    {grade.toFixed(1)}
                </span>
            </div>
            
            <div className="mt-1 flex justify-between items-center">
                <span className="text-sm text-gray-500">Abgeschl. Module:</span>
                <span className="text-lg font-bold text-indigo-500">
                    {modules}
                </span>
            </div>
            <div className="mt-1 text-xs text-gray-400">
                (Modul-Score entspricht ca. Note {estimatedGradeModule.toFixed(1)})
            </div>
        </div>
    );
};


// ====================================================================
// 4. ParentDashboard Hauptkomponente
// ====================================================================

const ParentDashboard = () => {
    const LegendScale = [
        { min: '90%', grade: 1.0, color: 'bg-green-500' },
        { min: '80%', grade: 2.0, color: 'bg-lime-500' },
        { min: '65%', grade: 3.0, color: 'bg-yellow-500' },
        { min: '50%', grade: 4.0, color: 'bg-orange-500' },
        { min: '30%', grade: 5.0, color: 'bg-red-500' },
        { min: '0%', grade: 6.0, color: 'bg-red-700' },
    ];
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
                
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Eltern-Dashboard</h1>
                    <p className="text-lg text-gray-500 mt-1">
                        Übersicht über den Fortschritt von <span className="font-semibold text-indigo-600">{mockDashboardData.studentName}</span>
                    </p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <DashboardCard 
                        icon={<Zap />} 
                        title="Abgeschlossene Module" 
                        value={mockDashboardData.totalModulesCompleted} 
                        color="text-indigo-600" 
                    />
                    <DashboardCard 
                        icon={<Clock />} 
                        title="Nachhilfestunden (Gesamt)" 
                        value={`${mockDashboardData.totalTutoringHours} Std.`} 
                        color="text-blue-600" 
                    />
                    <DashboardCard 
                        icon={<BarChart3 />} 
                        title="Durchschn. Notenverbesserung" 
                        value={`${mockDashboardData.averageGradeImprovement.toFixed(1)} Noten`} 
                        color="text-green-600" 
                    />
                    <DashboardCard 
                        icon={<Users />} 
                        title="Fächer mit Nachhilfe" 
                        value={mockDashboardData.tutorEffectiveness.length} 
                        color="text-yellow-600" 
                    />
                </div>

                {/* 2. Visualisierungen (Grafiken: Aktivität vs. Trend) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-200">
                        <h2 className="text-xl font-bold text-gray-800">Monatliche Lernaktivität (Stunden)</h2>
                        <p className="text-sm text-gray-500 mb-4">Zeigt das Engagement im Zeitverlauf.</p>
                        <ChartPlaceholder 
                            data={mockDashboardData.monthlyActivity} 
                            label="Stunden" 
                            color="bg-indigo-500"
                            type="activity"
                        />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-200">
                        <h2 className="text-xl font-bold text-gray-800">Gesamtnote Trend (Letzte 6 Monate)</h2>
                        <p className="text-sm text-gray-500 mb-4">Ziel: Die Kurve soll fallen (niedrigere Note ist besser).</p>
                        <ChartPlaceholder 
                            data={mockDashboardData.gradeTrend} 
                            label="Note" 
                            color="bg-green-500"
                            type="grade"
                        />
                    </div>
                </div>
                
                {/* 3. Nachhilfe-Effektivität und erweiterte Grafiken */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-green-100">Effektivität der Nachhilfestunden (Metrik: Probeklausurpunkte)</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold text-gray-700 mb-2">Quantifizierte Effizienz</h3>
                            <EfficiencyChartPlaceholder data={mockDashboardData.tutorEffectiveness} />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold text-gray-700 mb-2">Mathematik: Fähigkeitszuwachs</h3>
                            <RadarChartPlaceholder data={mockDashboardData.mathCompetence} />
                        </div>
                         <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col justify-center items-center">
                            <h3 className="text-lg font-bold text-gray-700 mb-2">Punkte-Skala Legende</h3>
                            <div className="space-y-2 text-left w-full">
                                {LegendScale.map(item => (
                                    <div key={item.grade} className="flex justify-between text-sm">
                                        <span className="flex items-center gap-1">
                                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div> 
                                            Note {item.grade.toFixed(1)}
                                        </span> 
                                        <span className="text-gray-500">{item.min} bis {LegendScale[LegendScale.findIndex(s => s.grade === item.grade) - 1]?.min || '100%'}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-3">Detailierte Visualisierung in den Fächerkarten.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-6">
                        {mockDashboardData.tutorEffectiveness.map((item, index) => (
                            <ImprovementBar key={index} {...item} />
                        ))}
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        **Probeklausurpunkte** dienen als Metrik für den Fortschritt. Die Effizienz gibt den **Punktgewinn pro Stunde** an.
                    </p>
                </div>
                
                {/* 1. AKTUELLE LEISTUNG PRO FACH (MIT PUNKT-VISUALISIERUNG) */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-100">Aktuelle Leistung pro Fach (Probeklausurpunkte)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mockDashboardData.currentGrades.map(item => (
                            <CurrentGradesCard key={item.subject} {...item} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ParentDashboard;
