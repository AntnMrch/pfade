import React, { useState, useMemo, useCallback } from "react";
import {
  Star,
  BookOpen,
  Globe,
  Calculator,
  Brain,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Zap,
} from "lucide-react";

// ====================================================================
// Mock Daten (unverändert)
// ====================================================================

const mockTutors = [
  { id: 1, name: "Dr. Anna Müller", subject: "Mathe", rating: 4.8, reviews: 85, bio: "Experte für Analysis und Algebra. 10 Jahre Erfahrung an Gymnasien.", isFavorite: true },
  { id: 2, name: "Max Schmidt", subject: "Deutsch", rating: 4.5, reviews: 120, bio: "Fokus auf Grammatik, Rechtschreibung und Textanalyse. Geduldig und motivierend.", isFavorite: false },
  { id: 3, name: "Lisa Huber", subject: "Englisch", rating: 4.9, reviews: 60, bio: "Muttersprachlerin mit Spezialisierung auf Konversation und Business English.", isFavorite: true },
  { id: 4, name: "Prof. Jens Koch", subject: "Naturwissenschaften", rating: 4.7, reviews: 45, bio: "Physik und Chemie leicht verständlich. Ehemaliger Universitätsdozent.", isFavorite: false },
  { id: 5, name: "Sabine Wagner", subject: "Mathe", rating: 4.6, reviews: 105, bio: "Hilft Schülern der Unter- und Mittelstufe mit Grundlagen und Prüfungen.", isFavorite: false },
];

const getMockAvailability = (tutorId, date) => {
    // Generiert Alibi-Öffnungszeiten
    const availableSlots = [];
    const baseHour = 14;
    const endHour = 19;

    for (let h = baseHour; h < endHour; h++) {
        availableSlots.push(`${String(h).padStart(2, '0')}:00`);
        availableSlots.push(`${String(h).padStart(2, '0')}:30`);
    }

    const filteredSlots = availableSlots.filter(() => Math.random() > 0.3);
    return filteredSlots;
};

// ====================================================================
// HELPER KOMPONENTEN (unverändert)
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

const TutorCard = ({ tutor, onSelect }) => {
    const isFavorite = tutor.isFavorite;

    const subjectColors = {
        Mathe: 'bg-indigo-100 text-indigo-700',
        Deutsch: 'bg-pink-100 text-pink-700',
        Englisch: 'bg-blue-100 text-blue-700',
        Naturwissenschaften: 'bg-emerald-100 text-emerald-700',
    };
    const colorClass = subjectColors[tutor.subject] || 'bg-gray-100 text-gray-700';

    return (
        <div
            onClick={() => onSelect(tutor)}
            className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-transparent hover:border-blue-400 relative"
        >
            {isFavorite && (
                <div className="absolute -top-3 -left-1 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                    <Zap className="w-4 h-4" /> Lieblingslehrer
                </div>
            )}
            
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                    <User className="w-10 h-10" />
                </div>
                
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 truncate">{tutor.name}</h3>
                    
                    <div className="flex items-center space-x-3 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
                            {tutor.subject}
                        </span>
                        
                        <div className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            {tutor.rating} ({tutor.reviews})
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="text-sm text-gray-700 mt-3 border-t border-gray-100 pt-3">
                {tutor.bio}
            </p>
        </div>
    );
};

// Kalender-Ansicht zur Terminauswahl
const BookingCalendar = ({ selectedTutor, onDateSelect, onSlotSelect, selectedDate, selectedSlot, onConfirm }) => {
    
    const dates = useMemo(() => {
        const d = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            d.push(date);
        }
        return d;
    }, []);

    const availability = getMockAvailability(selectedTutor.id, selectedDate);
    // HIER: Frequency State wird lokal gehalten und ist für den Crash nicht mehr gefährlich
    const [frequency, setFrequency] = useState('once'); 

    // Mapping für die Anzeige
    const frequencyLabels = {
        once: 'Einmalig',
        weekly: 'Wöchentlich',
        'alle 2 wochen': 'Alle 2 Wochen' 
    };
    
    // Die Confirm-Funktion muss jetzt die lokale Frequenz verwenden
    const handleLocalConfirm = () => {
        onConfirm(frequency);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" /> Kalender für {selectedTutor.name}
            </h3>

            {/* 1. Datumsauswahl */}
            <div className="mb-6">
                <p className="font-semibold text-gray-700 mb-3">1. Wähle den Tag:</p>
                <div className="flex overflow-x-auto space-x-3 pb-2">
                    {dates.map((date, index) => {
                        const dayName = index === 0 ? "Heute" : date.toLocaleDateString('de-DE', { weekday: 'short' });
                        const dateString = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
                        const isSelected = selectedDate === date.toDateString();

                        return (
                            <button
                                key={index}
                                onClick={() => onDateSelect(date.toDateString())}
                                className={`flex-shrink-0 w-24 p-3 rounded-lg border transition-all duration-200
                                    ${isSelected ? 'bg-blue-600 text-white shadow-md border-blue-700' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}
                                `}
                            >
                                <span className="font-bold text-sm">{dayName}</span>
                                <span className="block text-xs mt-1">{dateString}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 2. Zeitauswahl */}
            <div className="mb-6 border-t pt-4">
                <p className="font-semibold text-gray-700 mb-3">2. Wähle die Zeit (45 Min):</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-2">
                    {availability.length > 0 ? (
                        availability.map((slot, index) => {
                            const isSelected = selectedSlot === slot;
                            return (
                                <button
                                    key={index}
                                    onClick={() => onSlotSelect(slot)}
                                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                                        ${isSelected ? 'bg-emerald-500 text-white shadow-md border-emerald-600' : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300'}
                                    `}
                                >
                                    {slot}
                                </button>
                            );
                        })
                    ) : (
                        <p className="col-span-4 text-gray-500 italic">An diesem Tag ist der Lehrer ausgebucht.</p>
                    )}
                </div>
            </div>
            
            {/* 3. Wiederholungsfrequenz */}
            {selectedSlot && (
                 <div className="mb-8 border-t pt-4">
                    <p className="font-semibold text-gray-700 mb-3">3. Frequenz (optional):</p>
                    <div className="flex space-x-3">
                        {['Einmalig', 'Wöchentlich', 'Alle 2 Wochen'].map((option) => {
                            const value = option.includes('Einmalig') ? 'once' : option.includes('Wöchentlich') ? 'weekly' : 'alle 2 wochen';
                            const isSelected = frequency === value;
                            return (
                                <button
                                    key={value}
                                    onClick={() => setFrequency(value)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all
                                        ${isSelected 
                                            ? 'bg-purple-600 text-white border-purple-700 shadow-md' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'}
                                    `}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Bestätigungs-Button: Verwendet die neue, stabile Confirm-Funktion */}
            <button
                onClick={handleLocalConfirm}
                disabled={!selectedSlot}
                className={`w-full py-3 font-bold text-lg rounded-xl shadow-lg transition-colors
                    ${selectedSlot
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                `}
            >
                {/* Text Anzeige ist jetzt stabil */}
                {selectedSlot ? `Termin buchen (${frequencyLabels[frequency]})` : 'Zeit und Tag auswählen'}
            </button>
        </div>
    );
};


// ====================================================================
// HAUPT-KOMPONENTE: TutoringPage (handleBookingConfirm angepasst)
// ====================================================================

const TutoringPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("Alle Fächer");
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const subjects = [
    "Alle Fächer", "Mathe", "Deutsch", "Englisch", "Naturwissenschaften",
  ];

  const filteredTutors = useMemo(() => {
    let sortedTutors = [...mockTutors];
    sortedTutors.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
    if (selectedSubject !== "Alle Fächer") {
      sortedTutors = sortedTutors.filter((tutor) => tutor.subject === selectedSubject);
    }
    return sortedTutors;
  }, [selectedSubject]);

  const handleTutorSelect = useCallback((tutor) => {
    setSelectedTutor(tutor);
    setSelectedSlot(null);
  }, []);
  
  // HIER: Funktion empfängt jetzt die Frequenz als Argument
  const handleBookingConfirm = (frequency) => {
      if (!selectedTutor || !selectedDate || !selectedSlot) return;
      
      const frequencyDisplay = frequency === 'once' ? 'Einmalig' : frequency === 'weekly' ? 'Wöchentlich' : 'Alle 2 Wochen';
      
      alert(`Erfolgreich gebucht!
        Lehrer: ${selectedTutor.name}
        Datum: ${selectedDate}
        Uhrzeit: ${selectedSlot}
        Frequenz: ${frequencyDisplay}`);
        
      // Zustand zurücksetzen
      setSelectedTutor(null);
      setSelectedDate(new Date().toDateString());
      setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <header className="text-center mb-12 bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-500">
          <h1 className="text-4xl font-extrabold text-[#1a1a7a] mb-3">
            Lehrer-Börse
          </h1>
          <p className="text-xl text-gray-500">
            Finde deinen perfekten Nachhilfelehrer und buche deine erste Stunde.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LINKES PANEL: LEHRER-AUSWAHL */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-5 rounded-xl shadow-md">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Filter nach Fach</h2>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                      ${selectedSubject === subject
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map((tutor) => (
                      <TutorCard key={tutor.id} tutor={tutor} onSelect={handleTutorSelect} />
                    ))
                ) : (
                    <div className="bg-white p-8 rounded-xl text-center text-gray-500">
                        Keine Lehrer in dieser Kategorie gefunden.
                    </div>
                )}
            </div>
          </div>
          
          {/* RECHTES PANEL: KALENDER / BUCHUNG */}
          <div className="lg:col-span-1 sticky top-24 h-fit">
            {selectedTutor ? (
                <BookingCalendar
                    selectedTutor={selectedTutor}
                    onDateSelect={setSelectedDate}
                    onSlotSelect={setSelectedSlot}
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                    onConfirm={handleBookingConfirm} // Wird nun direkt aufgerufen
                />
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-2xl border-l-4 border-indigo-500">
                <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-indigo-500" />
                    <h3 className="text-xl font-bold text-gray-800">Terminauswahl</h3>
                </div>
                <p className="text-gray-600">
                  Wähle links einen Lehrer aus, um seinen Kalender und seine Verfügbarkeiten zu sehen und direkt einen Termin zu buchen.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringPage;