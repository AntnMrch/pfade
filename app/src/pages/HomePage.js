import React, { useState, useRef } from "react";
import {
  Lock,
  Pin,
  RotateCcw,
  Check,
  Menu,
  BookOpen,
  Globe,
  Brain,
  Calculator,
  ChevronDown
} from "lucide-react";

// ====================================================================
// 1. KOMPONENTE: PRICING CARD
// ====================================================================

const PricingCard = ({ 
    title, 
    price, 
    icon: Icon, 
    features, 
    theme, 
    isHighlighted, 
    hasButton = true 
}) => {
    
    const themes = {
        free: {
            main: "bg-gray-100",
            header: "bg-gray-100",
            text: "text-gray-600",
            iconBg: "bg-purple-700",
            iconColor: "text-white"
            //button: null
        },
        basic: {
            main: "bg-[#7c3aed]",
            header: "bg-[#6d28d9]",
            text: "text-white",
            iconBg: "bg-white/20",
            iconColor: "text-white",
            button: "text-[#7c3aed]"
        },
        professor: {
            main: "bg-[#1e1b4b]",
            header: "bg-[#3b82f6]",
            text: "text-white",
            iconBg: "bg-[#3b82f6]",
            iconColor: "text-white",
            button: "text-[#1e1b4b]"
        },
        headmaster: {
            main: "bg-[#67e8f9]",
            header: "bg-[#22d3ee]",
            text: "text-white",
            iconBg: "bg-white/20",
            iconColor: "text-white",
            button: "text-[#0ea5e9]"
        }
    };

    const style = themes[theme];
    const containerClasses = `
        flex flex-col relative rounded-none shadow-xl overflow-hidden
        ${style.main} 
        ${style.text}
        ${isHighlighted ? 'transform scale-105 z-10 rounded-lg shadow-2xl my-[-10px]' : 'my-0'}
        transition-all duration-300 h-full
    `;

    return (
        <div className={containerClasses}>
            <div className={`p-6 flex flex-col items-center ${theme === 'free' ? 'border-b border-gray-300' : ''}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg ${theme === 'free' ? style.iconBg : 'bg-white/20'}`}>
                    <Icon className={`w-8 h-8 ${style.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2 tracking-wide lowercase">{title}</h3>
            </div>

            {price !== null ? (
                <div className={`py-8 w-full text-center ${style.header}`}>
                    <span className="text-5xl font-bold">{price}</span>
                </div>
            ) : (
                <div className="h-4 w-full"></div>
            )}

            <div className="p-6 flex-grow flex flex-col items-center justify-between">
                <ul className="space-y-4 w-full text-center sm:text-left mb-8">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm font-medium leading-tight">
                            <div className={`mt-0.5 min-w-[20px] h-5 rounded-full flex items-center justify-center ${theme === 'free' ? 'bg-gray-300' : 'bg-white'}`}>
                                <Check className={`w-3 h-3 ${theme === 'free' ? 'text-white' : style.button}`} strokeWidth={4} />
                            </div>
                            <span className="opacity-90">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* ÄNDERUNG: Button wurde zu einem a-Tag (Link) geändert */}
                {hasButton && (
                    <a 
                        href="/path"
                        className={`
                            px-8 py-2 mb-6 rounded-full font-bold bg-white shadow-md hover:scale-105 transition-transform cursor-pointer
                            ${style.button}
                        `}
                    >
                        Choose
                    </a>
                )}
            </div>
        </div>
    );
};

// ====================================================================
// 2. KOMPONENTE: PFAD AUSWAHL CARD
// ====================================================================

const PathCard = ({ title, icon: Icon, color, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className={`w-20 h-20 rounded-full bg-${color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-10 h-10 text-${color}-600`} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {title}
            </h3>
            <span className="text-sm text-gray-500 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Starten <ChevronDown size={16} />
            </span>
        </button>
    );
};

// ====================================================================
// 3. MAIN LANDING PAGE
// ====================================================================

const LandingPage = () => {
    const [showPricing, setShowPricing] = useState(false);
    const pricingRef = useRef(null);

    // Funktion zum Anzeigen und Scrollen
    const handlePathSelect = () => {
        setShowPricing(true);
        setTimeout(() => {
            pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const paths = [
        { title: "Mathe", icon: Calculator, color: "indigo" },
        { title: "Deutsch", icon: BookOpen, color: "pink" },
        { title: "Englisch", icon: Globe, color: "blue" },
        { title: "Naturwissenschaften", icon: Brain, color: "emerald" },
    ];

    const plans = [
        {
            id: 'free',
            title: 'free',
            price: null,
            theme: 'free',
            icon: Lock,
            features: ['Teste alle Tools, Lernspiele und Inhalte', 'Lerne die möglichen Lernpfade kennen', 'Nutze unseren AI-Studybuddy'],
            hasButton: true
        },
        {
            id: 'basic',
            title: 'bAIsic',
            price: '7,00',
            theme: 'basic',
            icon: Lock,
            features: ['Mehr als 100 Learning-Paths', 'AI-Lerntools – sicher & exklusiv', 'Tausende Übungsaufgaben'],
        },
        {
            id: 'professor',
            title: 'professor',
            price: '89,00',
            theme: 'professor',
            icon: Pin,
            isHighlighted: true,
            features: ['Alle AI-Tools inklusive', '1 Std/Woche persönlicher Nachhilfelehrer', 'Lerne mit einem echten Menschen'],
        },
        {
            id: 'headmaster',
            title: 'headmaster',
            price: '199,00',
            theme: 'headmaster',
            icon: RotateCcw,
            features: ['Alle AI-Tools inklusive', '3 Std/Woche persönlicher Nachhilfelehrer', 'Maximale Flexibilität'],
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* NAVIGATION */}
            <nav className="bg-[#1a1a7a] border-b border-blue-900 sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                            <div className="bg-[#1a1a7a] text-white font-sans font-black text-3xl tracking-tighter">STUDY</div>
                            <div className="bg-[#4dd0e1] text-white font-sans font-black text-3xl px-2 py-1 rounded-md tracking-tighter">HUB</div>
                        </div>
                        <div className="hidden md:flex gap-6">
                            <button className="text-white hover:text-cyan-300 font-bold transition">Login</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION (PFAD AUSWAHL) */}
            <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-white to-gray-100">
                <div className="text-center max-w-3xl mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a1a7a] mb-6 tracking-tight">
                        Wähle deinen Pfad.
                    </h1>
                    <p className="text-xl text-gray-500 font-medium">
                        Egal welches Fach – wir haben den perfekten Lernplan für dich. <br className="hidden md:block"/>
                        Klicke auf ein Fach, um deine Reise zu starten.
                    </p>
                </div>

                {/* GRID FÜR DIE PFADE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                    {paths.map((path) => (
                        <PathCard 
                            key={path.title} 
                            {...path} 
                            onClick={handlePathSelect}
                        />
                    ))}
                </div>
            </div>

            {/* PRICING SECTION (WIRD EINGEBLENDET) */}
            <div ref={pricingRef} className={`bg-white transition-all duration-1000 ${showPricing ? 'opacity-100' : 'opacity-0 hidden'}`}>
                <div className="w-full max-w-[1400px] mx-auto py-24 px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a7a] mb-4">
                            Perfekt. Wähle jetzt deinen Zugang.
                        </h2>
                        <p className="text-gray-500">
                            Transparente Preise für maximalen Lernerfolg.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-0">
                        {plans.map((plan) => (
                            <PricingCard key={plan.id} {...plan} />
                        ))}
                    </div>
                </div>
                
                <footer className="bg-gray-50 py-12 text-center text-gray-400 text-sm border-t">
                    © 2025 Study Hub. Alle Preise in Euro inkl. MwSt.<br/> Diese Website ist kein offizielles Produkt einer Bildungseinrichtung, sondern dient nur zu Illustrationszwecken und Demonstration für eine Vorlesung.
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
