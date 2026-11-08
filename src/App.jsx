import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Smartphone,
  ChevronDown,
  ChevronUp,
  Star,
  Send,
  HelpCircle,
  Award
} from 'lucide-react';

const CHANNELS = [
  { label: "DM Instagram.", color: "text-[#C85A32]", platform: "Instagram", bg: "bg-[#C85A32]/10", border: "border-[#C85A32]/30" },
  { label: "Vidéos TikTok.", color: "text-[#111111]", platform: "TikTok", bg: "bg-black/10", border: "border-black/30" },
  { label: "Statuts WhatsApp.", color: "text-[#25D366]", platform: "WhatsApp", bg: "bg-[#25D366]/15", border: "border-[#25D366]/40" },
  { label: "Directs Facebook.", color: "text-[#1877F2]", platform: "Facebook", bg: "bg-[#1877F2]/10", border: "border-[#1877F2]/30" }
];

const TELEMETRY_CARDS = [
  {
    id: 1,
    title: "24h chrono",
    subtitle: "Votre catalogue en ligne demain",
    detail: "⚡ Déploiement express par Pape : nous prenons vos 5 à 15 photos aujourd'hui, votre boutique vend dès demain matin.",
    icon: Clock,
    color: "text-[#C85A32]",
    ring: "ring-[#C85A32]",
    badge: "Garantie 24h"
  },
  {
    id: 2,
    title: "3 clics",
    subtitle: "Du post TikTok au paiement Wave",
    detail: "📲 Votre client clique sur le lien en bio, choisit sa taille, et vous recevez la commande déjà calculée sur WhatsApp.",
    icon: Zap,
    color: "text-[#E09F3E]",
    ring: "ring-[#E09F3E]",
    badge: "Zéro Friction"
  },
  {
    id: 3,
    title: "+40% Ventes",
    subtitle: "Zéro client perdu par lenteur",
    detail: "📈 Les acheteurs impulsifs de 22h commandent immédiatement sans attendre 4h que vous répondiez en DM.",
    icon: TrendingUp,
    color: "text-[#C85A32]",
    ring: "ring-[#C85A32]",
    badge: "Disponibilité 24h/24"
  },
  {
    id: 4,
    title: "15 000 F",
    subtitle: "Setup unique sans abonnement lourd",
    detail: "💰 Zéro commission sur vos commandes : 100% du chiffre d'affaires encaissé par Wave ou Orange Money reste pour vous.",
    icon: Award,
    color: "text-[#2B1E16]",
    ring: "ring-[#2B1E16]",
    badge: "Rentable dès le 1er jour"
  }
];

const BOUTIQUE_PRESETS = {
  mode: {
    id: "mode",
    name: "Maison Sahel Couture",
    tagline: "Mode & Robes de Soie • Almadies",
    avatar: "👗",
    products: [
      {
        id: 1,
        name: "Robe Soie Sahel Wax",
        price: 28000,
        category: "Mode Féminine",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
        badge: "Bestseller"
      },
      {
        id: 2,
        name: "Ensemble Lin Brodé Dakar",
        price: 35000,
        category: "Couture Moderne",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
        badge: "Nouvelle Collection"
      },
      {
        id: 3,
        name: "Boubou Soie Contemporain",
        price: 45000,
        category: "Luxe & Soirée",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
        badge: "Prestige"
      }
    ]
  },
  parfum: {
    id: "parfum",
    name: "Passion Parfum Dakar",
    tagline: "Parfumerie Rare & Bakhour Royal • Mermoz",
    avatar: "🌸",
    products: [
      {
        id: 11,
        name: "Coffret Oud & Ambre Royal",
        price: 19500,
        category: "Parfumerie de Luxe",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
        badge: "Coup de Cœur"
      },
      {
        id: 12,
        name: "Brume Corporelle Musc Blanc",
        price: 12000,
        category: "Brumes Parfumées",
        image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
        badge: "Bestseller"
      },
      {
        id: 13,
        name: "Bakhour Artisanal Touba",
        price: 8500,
        category: "Senteurs d'Intérieur",
        image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80",
        badge: "Artisanal"
      }
    ]
  },
  cuir: {
    id: "cuir",
    name: "Atelier Cuir Touba",
    tagline: "Maroquinerie & Chaussures d'Exception • Ngor",
    avatar: "👜",
    products: [
      {
        id: 21,
        name: "Sac Cuir Artisanal Touba",
        price: 24000,
        category: "Maroquinerie",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
        badge: "Artisanal"
      },
      {
        id: 22,
        name: "Mocassins Cuir Pleine Fleur",
        price: 32000,
        category: "Chaussures Luxe",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
        badge: "Fait Main"
      },
      {
        id: 23,
        name: "Portefeuille & Ceinture Cuir",
        price: 15000,
        category: "Accessoires",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        badge: "Indispensable"
      }
    ]
  }
};

export default function App() {
  // Détection du mode : 'store' (Plein écran Boutique Pure pour le client) ou 'agency' (Présentation Daro Boost)
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('store') || params.get('boutique') || params.get('view') === 'store') {
        return 'store';
      }
    }
    return 'agency';
  });

  // Détection du preset boutique via URL (?store=mode | ?demo=mode | ?boutique=parfum)
  const [currentPresetKey, setCurrentPresetKey] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const storeParam = params.get('store') || params.get('boutique') || params.get('demo');
      if (storeParam && BOUTIQUE_PRESETS[storeParam]) return storeParam;
    }
    return 'mode';
  });

  const currentBoutique = BOUTIQUE_PRESETS[currentPresetKey] || BOUTIQUE_PRESETS.mode;

  // État du simulateur de commande One-Tap
  const [selectedItems, setSelectedItems] = useState([currentBoutique.products[0]]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [customerName, setCustomerName] = useState("Amina");
  const [customerAddress, setCustomerAddress] = useState("Almadies, Dakar");
  const [simScreen, setSimScreen] = useState('catalogue'); // 'catalogue' | 'whatsapp'
  const [openFaq, setOpenFaq] = useState(null);

  // État interactif de zoom dynamique pour les cartes Télémétrie et Duel
  const [activeTelemetry, setActiveTelemetry] = useState(null);
  const [activeDuel, setActiveDuel] = useState('with'); // 'with' | 'without' | null
  const [telemetryScrollIndex, setTelemetryScrollIndex] = useState(0);

  const telemetryScrollRef = useRef(null);
  const duelScrollRef = useRef(null);

  const handleTelemetryScroll = (e) => {
    const el = e.target;
    const cardWidth = el.clientWidth * 0.78;
    const index = Math.round(el.scrollLeft / (cardWidth || 1));
    setTelemetryScrollIndex(Math.min(Math.max(index, 0), TELEMETRY_CARDS.length - 1));
  };

  // Rotation dynamique des canaux (Instagram, TikTok, WhatsApp, Facebook)
  const [channelIndex, setChannelIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setChannelIndex((prev) => (prev + 1) % CHANNELS.length);
        setIsFading(false);
      }, 250);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const toggleProduct = (prod) => {
    if (selectedItems.some(i => i.id === prod.id)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter(i => i.id !== prod.id));
      }
    } else {
      setSelectedItems([...selectedItems, prod]);
    }
  };

  const totalAmount = selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  // Construction du message WhatsApp automatisé
  const generateWhatsAppMessage = () => {
    const itemsList = selectedItems.map(item => `• 1x ${item.name} (${selectedSize}) — ${item.price.toLocaleString('fr-FR')} FCFA`).join('\n');
    return `Salam ${currentBoutique.name} ! 👋\nJe souhaite passer commande via votre catalogue Daro Boost :\n\n${itemsList}\n\n💰 *Total :* ${totalAmount.toLocaleString('fr-FR')} FCFA\n📍 *Livraison :* ${customerAddress}\n👤 *Nom :* ${customerName}\n\nPaiement souhaité : Wave 🌊`;
  };

  // Si l'utilisateur consulte la boutique client en mode autonome
  if (viewMode === 'store') {
    return (
      <StandaloneStoreView 
        boutique={currentBoutique}
        currentKey={currentPresetKey}
        onSwitchPreset={(key) => {
          setCurrentPresetKey(key);
          if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', `?store=${key}`);
          }
        }}
        onSwitchToAgency={() => {
          setViewMode('agency');
          if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', `?demo=${currentPresetKey}`);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B1E16] font-sans bg-grain selection:bg-[#C85A32] selection:text-white">
      
      {/* 1. NAVBAR OFFICIELLE DARO TECH */}
      <header className="sticky top-2 sm:top-4 z-50 px-2 sm:px-4 max-w-6xl mx-auto">
        <nav className="bg-[#FAF7F0]/90 backdrop-blur-md border border-[#EBE3D3] rounded-full px-3.5 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-bold text-xs sm:text-sm tracking-wider">
              DT
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight text-[#2B1E16]">Daro TECH</span>
              <span className="hidden sm:inline-block ml-2 text-xs uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-[#EBE3D3]/60 text-[#8E381A]">
                Unité Daro Boost
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <a 
              href="#simulateur" 
              className="text-xs sm:text-sm font-semibold text-[#8E381A] hover:text-[#C85A32] transition px-1"
            >
              Démo
            </a>
            <a 
              href="https://wa.me/221778690584?text=Salam%20Serigne%2C%20je%20souhaite%20activer%20Daro%20Boost%20pour%20ma%20boutique%20TikTok%20et%20Instagram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#2B1E16] hover:bg-[#C85A32] text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 shadow-sm flex items-center gap-1.5 sm:gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-[#EBB458]" />
              <span className="hidden sm:inline">Activer en 24h</span>
              <span className="sm:hidden">15 000 F</span>
            </a>
          </div>
        </nav>
      </header>

      {/* 2. HERO : L'AUTOMATISATION DE LA DISPONIBILITÉ */}
      <section className="pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#EFE7D3]/80 border border-[#E4D5B7] px-3.5 py-1.5 rounded-full text-xs font-mono text-[#8E381A] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>Le Vendeur qui ne dort jamais à Dakar • Multi-Réseaux</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2B1E16] leading-[1.12] mb-6 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex flex-col justify-center items-center">
          <span>Ne perdez plus jamais une vente dans vos</span>
          <span 
            className={`font-serif italic font-normal transition-all duration-300 transform inline-block mt-1 ${
              isFading ? "opacity-0 -translate-y-2 scale-95" : "opacity-100 translate-y-0 scale-100"
            } ${CHANNELS[channelIndex].color}`}
          >
            {CHANNELS[channelIndex].label}
          </span>
        </h1>

        {/* Pilules interactives des canaux supportés */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CHANNELS.map((ch, idx) => (
            <button
              key={ch.platform}
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setChannelIndex(idx);
                  setIsFading(false);
                }, 150);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border transition-all duration-300 flex items-center gap-2 ${
                channelIndex === idx 
                  ? `${ch.bg} ${ch.border} ${ch.color} scale-105 shadow-sm` 
                  : 'bg-white/70 border-[#E4D5B7] text-[#6F5B4C] hover:bg-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${channelIndex === idx ? 'bg-current animate-pulse' : 'bg-[#C85A32]'}`}></span>
              <span>{ch.platform}</span>
            </button>
          ))}
        </div>

        <p className="text-lg sm:text-xl text-[#5C4535] max-w-2xl mx-auto leading-relaxed mb-10">
          Un client sur <strong className="text-[#2B1E16]">TikTok</strong>, <strong className="text-[#2B1E16]">Instagram</strong> ou <strong className="text-[#2B1E16]">WhatsApp</strong> est impulsif : s'il n'a pas de réponse en 5 minutes, il va chez le concurrent. 
          <strong className="text-[#2B1E16] font-semibold"> Daro Boost</strong> transforme vos réseaux en machine de commande automatique avec catalogue One-Tap et paniers WhatsApp structurés.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#simulateur"
            className="w-full sm:w-auto bg-[#C85A32] hover:bg-[#B04B25] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#C85A32]/20 flex items-center justify-center gap-3 text-base group"
          >
            <span>Tester le simulateur One-Tap</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
          <a 
            href="https://wa.me/221778690584?text=Salam%20Serigne%2C%20je%20veux%20en%20savoir%20plus%20sur%20Daro%20Boost%20à%2015000%20FCFA" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#FAF7F0] hover:bg-[#EFE7D3] border border-[#E4D5B7] text-[#2B1E16] font-semibold px-7 py-4 rounded-full transition flex items-center justify-center gap-2 text-base"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Commander le Pack (15 000 FCFA)</span>
          </a>
        </div>

        {/* 4 Piliers Télémétrie avec Défilement Tactile Fluide sur Mobile & Grille Desktop */}
        <div className="mt-12 sm:mt-16 text-left">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono text-[#8E381A] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping"></span>
              <span className="hidden sm:inline">✨ Touchez une carte pour zoomer et voir le détail :</span>
              <span className="sm:hidden">✨ Glissez ou touchez pour voir le détail :</span>
            </span>
            {activeTelemetry && (
              <button 
                onClick={() => setActiveTelemetry(null)}
                className="text-[11px] font-mono text-[#6F5B4C] hover:text-[#C85A32] underline"
              >
                Réduire ✕
              </button>
            )}
          </div>

          {/* Carrousel tactile horizontal sur mobile / Grille sur écran large */}
          <div 
            ref={telemetryScrollRef}
            onScroll={handleTelemetryScroll}
            className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3.5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar touch-pan-x"
          >
            {TELEMETRY_CARDS.map((card, idx) => {
              const IconComp = card.icon;
              const isActive = activeTelemetry === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveTelemetry(isActive ? null : card.id)}
                  className={`w-[78vw] max-w-[280px] sm:w-auto shrink-0 snap-center p-5 rounded-2xl cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] border ${
                    isActive 
                      ? `scale-[1.02] sm:scale-[1.06] -translate-y-1 sm:-translate-y-2.5 bg-white shadow-2xl ring-2 ${card.ring} border-transparent z-20`
                      : 'bg-[#FAF7F0] border-[#EBE3D3] hover:bg-white hover:-translate-y-1 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-[#F5F0E4]' : 'bg-white/80'}`}>
                      <IconComp className={`w-5 h-5 ${card.color} transition-transform duration-300 ${isActive ? 'scale-125' : ''}`} />
                    </div>
                    {isActive ? (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C85A32] text-white animate-pulse">
                        {card.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#9B8270] tracking-wider">
                        + détails
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-xl font-bold text-[#2B1E16] tracking-tight">
                    {card.title}
                  </div>
                  <div className="text-xs text-[#6F5B4C] mt-0.5 leading-snug font-medium">
                    {card.subtitle}
                  </div>

                  {/* Expansion fluide animée au clic */}
                  {isActive && (
                    <div className="mt-3.5 pt-3 border-t border-[#EBE3D3] text-xs text-[#5C4535] leading-relaxed animate-fadeIn">
                      {card.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Indicateur de swipe mobile avec points */}
          <div className="flex sm:hidden items-center justify-between mt-3 px-1">
            <span className="text-[11px] font-mono text-[#8E381A] flex items-center gap-1">
              <span>👉 Glissez pour voir les 4 piliers</span>
            </span>
            <div className="flex items-center gap-1.5">
              {TELEMETRY_CARDS.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    telemetryScrollIndex === idx ? 'w-5 bg-[#C85A32]' : 'w-1.5 bg-[#E4D5B7]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LE SIMULATEUR INTERACTIF PHONE ONE-TAP (L'ARTEFACT MAÎTRE) */}
      <section id="simulateur" className="py-12 sm:py-20 px-3 sm:px-6 bg-[#F5F0E4]/60 border-y border-[#E8DEC8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C85A32] font-bold">
              Expérience Interactive en Direct
            </span>
            <h2 className="text-2xl sm:text-5xl font-extrabold text-[#2B1E16] tracking-tight mt-2 mb-3 sm:mb-4">
              Testez comme si vous étiez <span className="font-serif italic font-normal text-[#C85A32]">votre propre client.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5C4535]">
              Touchez les articles dans le téléphone ci-dessous pour voir comment une commande se transforme instantanément en un message WhatsApp structuré et prêt à encaisser.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Colonne Explication & Contrôles (Placée après le téléphone sur mobile pour accès direct au jeu) */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="p-5 sm:p-6 bg-[#FDFBF7] border border-[#E4D5B7] rounded-3xl shadow-sm">
                <h3 className="font-bold text-base sm:text-lg text-[#2B1E16] mb-2 sm:mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#C85A32]" />
                  Ce qui se passe pour le client :
                </h3>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#5C4535]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span>Il clique sur votre lien en bio TikTok, Instagram ou WhatsApp (zéro application à installer).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span>Il choisit ses pièces phares en 1 clic sans poser 10 fois la question « Prix en PV ? ».</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span>Il tape son quartier et clique sur <strong>Commander via WhatsApp</strong>.</span>
                  </li>
                </ul>
              </div>

              {/* Panneau de configuration client démo */}
              <div className="p-5 sm:p-6 bg-[#FAF7F0] border border-[#E4D5B7] rounded-3xl space-y-3.5 sm:space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-[#8E381A] font-bold">
                  Personnaliser le test en direct :
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4535] mb-1">Nom du client test :</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9CEBA] rounded-xl focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4535] mb-1">Quartier à Dakar :</label>
                  <input 
                    type="text" 
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9CEBA] rounded-xl focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C4535] mb-1">Taille sélectionnée :</label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded-lg border transition ${selectedSize === size ? 'bg-[#C85A32] text-white border-[#C85A32]' : 'bg-white text-[#2B1E16] border-[#D9CEBA]'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Téléphone Interactif (Prioritaire sur mobile) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2">
              
              {/* Sélecteur de Boutique pour Démonstration Réelle */}
              <div className="flex items-center justify-center gap-1.5 p-1 bg-white border border-[#E4D5B7] rounded-full mb-4 shadow-sm">
                {Object.entries(BOUTIQUE_PRESETS).map(([key, b]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentPresetKey(key);
                      setSelectedItems([b.products[0]]);
                      setSimScreen('catalogue');
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                      currentPresetKey === key
                        ? 'bg-[#C85A32] text-white shadow-sm scale-105'
                        : 'text-[#6F5B4C] hover:bg-[#FAF7F0]'
                    }`}
                  >
                    <span>{b.avatar}</span>
                    <span className="hidden sm:inline">{b.name.split(' ')[0]}</span>
                    <span className="sm:hidden">{key.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <div className="w-full max-w-[340px] sm:max-w-[360px] bg-[#1E1610] p-2.5 sm:p-3 rounded-[2.5rem] sm:rounded-[3rem] phone-shadow">
                {/* Notch / Caméra */}
                <div className="w-24 h-4 bg-black mx-auto rounded-full mb-2"></div>
                
                {/* Écran du téléphone */}
                <div className="bg-[#FDFBF7] rounded-[2.5rem] overflow-hidden min-h-[580px] flex flex-col border border-[#3E2D22]">
                  
                  {/* Barre supérieure du téléphone */}
                  <div className="bg-[#FAF7F0] border-b border-[#EBE3D3] px-4 py-2.5 flex items-center justify-between text-xs font-mono text-[#5C4535]">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <span>{currentBoutique.avatar}</span>
                      <span className="font-bold truncate">{currentBoutique.name}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] text-emerald-700 font-bold">24h/24</span>
                    </div>
                  </div>

                  {/* Navigation Simulateur : Catalogue vs WhatsApp */}
                  <div className="flex bg-[#EFE7D3]/60 p-1 m-2 rounded-xl text-xs font-semibold">
                    <button 
                      onClick={() => setSimScreen('catalogue')}
                      className={`flex-1 py-1.5 rounded-lg transition ${simScreen === 'catalogue' ? 'bg-white shadow-sm text-[#2B1E16]' : 'text-[#8E381A]'}`}
                    >
                      1. Catalogue One-Tap
                    </button>
                    <button 
                      onClick={() => setSimScreen('whatsapp')}
                      className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1 ${simScreen === 'whatsapp' ? 'bg-[#25D366] text-white shadow-sm font-bold' : 'text-[#8E381A]'}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      2. Caisse WhatsApp
                    </button>
                  </div>

                  {/* ÉCRAN 1 : LE CATALOGUE ONE-TAP */}
                  {simScreen === 'catalogue' ? (
                    <div className="p-3 flex-1 flex flex-col justify-between overflow-y-auto">
                      <div className="space-y-2.5">
                        <div className="text-[11px] text-[#6F5B4C] font-medium flex items-center justify-between">
                          <span>Sélectionnez les articles :</span>
                          <span className="text-[10px] font-mono text-[#C85A32] font-semibold">{currentBoutique.tagline.split('•')[0]}</span>
                        </div>

                        {currentBoutique.products.map(prod => {
                          const isSelected = selectedItems.some(i => i.id === prod.id);
                          return (
                            <div 
                              key={prod.id}
                              onClick={() => toggleProduct(prod)}
                              className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${isSelected ? 'bg-white border-[#C85A32] shadow-sm ring-1 ring-[#C85A32]' : 'bg-[#FAF7F0]/60 border-[#E8DEC8] hover:bg-white'}`}
                            >
                              <img 
                                src={prod.image} 
                                alt={prod.name} 
                                className="w-14 h-14 object-cover rounded-xl"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-mono text-[#8E381A] font-bold uppercase">{prod.category}</div>
                                <div className="font-bold text-xs text-[#2B1E16] truncate">{prod.name}</div>
                                <div className="font-mono text-xs font-extrabold text-[#C85A32] mt-0.5">
                                  {prod.price.toLocaleString('fr-FR')} FCFA
                                </div>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs font-bold ${isSelected ? 'bg-[#C85A32] text-white border-[#C85A32]' : 'border-[#C85A32]/40 text-transparent'}`}>
                                ✓
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Panier & Bouton WhatsApp flottant */}
                      <div className="mt-4 pt-3 border-t border-[#E8DEC8]">
                        <div className="flex justify-between items-center mb-2 px-1">
                          <span className="text-xs text-[#5C4535]">Total sélectionné :</span>
                          <span className="font-mono font-extrabold text-sm text-[#2B1E16]">
                            {totalAmount.toLocaleString('fr-FR')} FCFA
                          </span>
                        </div>
                        <button 
                          onClick={() => setSimScreen('whatsapp')}
                          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs shadow-md shadow-[#25D366]/20 transition active:scale-95"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Commander via WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ÉCRAN 2 : LA CAISSE WHATSAPP AVEC LE MESSAGE STRUCTURÉ */
                    <div className="p-3 flex-1 flex flex-col justify-between bg-[#EFEAE2]">
                      <div className="space-y-3">
                        <div className="text-center">
                          <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full font-mono text-[#5C4535]">
                            Message pré-rempli reçu sur WhatsApp
                          </span>
                        </div>

                        {/* Bulle de message WhatsApp */}
                        <div className="bg-[#E7FFDB] p-3 rounded-2xl rounded-tr-none border border-[#D0EBC2] text-xs text-[#1E2D24] shadow-sm space-y-2">
                          <p className="font-bold text-[#075E54]">Salam Maison Sahel ! 👋</p>
                          <p>Je souhaite passer commande via votre catalogue Daro Boost :</p>
                          <div className="bg-white/70 p-2 rounded-xl font-mono text-[11px] space-y-1">
                            {selectedItems.map((item, idx) => (
                              <div key={idx}>
                                • 1x {item.name} ({selectedSize}) — <strong>{item.price.toLocaleString('fr-FR')} F</strong>
                              </div>
                            ))}
                          </div>
                          <div className="pt-1 border-t border-[#CCE8BD] flex justify-between font-bold text-xs">
                            <span>Montant à régler :</span>
                            <span className="text-[#C85A32]">{totalAmount.toLocaleString('fr-FR')} FCFA</span>
                          </div>
                          <p className="text-[10px] text-[#556B2F]">
                            📍 Livraison : <strong>{customerAddress}</strong><br />
                            👤 Client : <strong>{customerName}</strong><br />
                            🌊 Paiement : Wave / Orange Money
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="p-2.5 bg-white rounded-xl border border-[#D9CEBA] text-[11px] text-[#2B1E16]">
                          🎯 <strong>Pourquoi c'est révolutionnaire :</strong> Vous n'avez plus à taper 15 messages pour demander le prix, la taille et le quartier. La commande arrive déjà prête à encaisser !
                        </div>
                        <button 
                          onClick={() => setSimScreen('catalogue')}
                          className="w-full bg-[#FAF7F0] border border-[#D9CEBA] text-[#2B1E16] font-semibold py-2 rounded-xl text-xs transition hover:bg-white"
                        >
                          ← Retourner au catalogue
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Bouton d'ouverture de la boutique en plein écran */}
              <button
                onClick={() => {
                  setViewMode('store');
                  if (typeof window !== 'undefined') {
                    window.history.pushState(null, '', `?store=${currentPresetKey}`);
                  }
                }}
                className="mt-3.5 px-4 py-2 bg-white hover:bg-[#FAF7F0] border border-[#E4D5B7] rounded-full text-xs font-mono font-bold text-[#8E381A] hover:text-[#C85A32] flex items-center gap-2 shadow-sm transition group"
              >
                <span>📱 Ouvrir {currentBoutique.name} en plein écran</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LE DUEL : LE CHAOS DES DM VS LE STANDARD DARO BOOST */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2B1E16] tracking-tight mb-3 sm:mb-4">
            Le Choc : Pourquoi 80% des ventes se perdent sur TikTok & Instagram
          </h2>
          <p className="text-sm sm:text-base text-[#5C4535] max-w-xl mx-auto">
            Ne soyez plus un commerçant qui passe sa journée à répondre « Prix en PV », devenez une marque qui traite des commandes automatiques.
          </p>
        </div>

        {/* Sélecteur de comparaison rapide */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => {
              setActiveDuel('without');
              if (duelScrollRef.current) {
                duelScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
              }
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
              activeDuel === 'without'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20 scale-105'
                : 'bg-white border border-[#E4D5B7] text-[#6F5B4C] hover:bg-rose-50'
            }`}
          >
            <span>❌ La Galère sans Daro</span>
          </button>
          <button
            onClick={() => {
              setActiveDuel('with');
              if (duelScrollRef.current) {
                const el = duelScrollRef.current;
                el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
              }
            }}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
              activeDuel === 'with'
                ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 scale-105'
                : 'bg-white border border-[#E4D5B7] text-[#6F5B4C] hover:bg-emerald-50'
            }`}
          >
            <span>✨ Avec Daro Boost (Recommandé)</span>
          </button>
        </div>

        {/* Conteneur avec scroll horizontal fluide snap sur mobile et grille 2 cols sur desktop */}
        <div 
          ref={duelScrollRef}
          onScroll={(e) => {
            const el = e.target;
            if (el.scrollLeft > el.clientWidth * 0.4) {
              setActiveDuel('with');
            } else {
              setActiveDuel('without');
            }
          }}
          className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 items-start overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-3 md:pb-0 -mx-3 px-3 md:mx-0 md:px-0 no-scrollbar touch-pan-x"
        >
          {/* Colonne Rouge : Le Chaos Actuel */}
          <div 
            onClick={() => setActiveDuel(activeDuel === 'without' ? null : 'without')}
            className={`w-[86vw] max-w-[420px] md:w-auto shrink-0 snap-center p-6 sm:p-8 rounded-3xl space-y-4 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border ${
              activeDuel === 'without'
                ? 'scale-[1.02] sm:scale-[1.05] -translate-y-1 sm:-translate-y-2 bg-white border-rose-400 shadow-2xl ring-2 ring-rose-400 z-10'
                : 'bg-[#FAF2F2] border-[#F3D5D5] hover:bg-white hover:border-rose-300 opacity-90'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700 font-bold font-mono text-sm uppercase">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Sans Daro Boost (La Galère)</span>
              </div>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                activeDuel === 'without' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-800'
              }`}>
                {activeDuel === 'without' ? '🔍 Zoom Actif' : 'Toucher'}
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#5C4535]">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Le client commente « Prix svp » sous votre vidéo TikTok ou en DM à 21h30.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Vous répondez le lendemain matin après 4h de retard : le client est déjà parti acheter ailleurs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Échanges interminables sur WhatsApp : « Tu as quelle taille ? C'est où chez toi ? ».</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Erreurs de calculs, commandes oubliées dans les discussions WhatsApp.</span>
              </li>
            </ul>

            {/* Expansion d'impact au clic */}
            {activeDuel === 'without' && (
              <div className="mt-4 pt-4 border-t border-rose-200 bg-rose-50/70 p-3.5 rounded-2xl text-xs text-rose-900 leading-relaxed animate-fadeIn">
                <strong>📉 L'impact réel sur votre poche :</strong> Vous perdez environ 3 ventes sur 5 chaque semaine simplement parce que l'acheteur n'a pas eu de réponse instantanée le soir.
              </div>
            )}
          </div>

          {/* Colonne Verte : Le Standard Daro Boost */}
          <div 
            onClick={() => setActiveDuel(activeDuel === 'with' ? null : 'with')}
            className={`w-[86vw] max-w-[420px] md:w-auto shrink-0 snap-center p-6 sm:p-8 rounded-3xl space-y-4 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border ${
              activeDuel === 'with'
                ? 'scale-[1.02] sm:scale-[1.05] -translate-y-1 sm:-translate-y-2 bg-white border-emerald-500 shadow-2xl ring-2 ring-emerald-500 z-10'
                : 'bg-[#F2F8F4] border-[#CDE5D6] hover:bg-white hover:border-emerald-300 opacity-90'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-bold font-mono text-sm uppercase">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Avec Daro Boost (Le Vendeur 24h/24)</span>
              </div>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                activeDuel === 'with' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {activeDuel === 'with' ? '✨ Zoom Actif' : 'Toucher'}
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#264D36]">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Votre client clique sur votre lien en bio à n'importe quelle heure de la nuit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Catalogue One-Tap ultra-rapide affichant vos prix et pièces phares en FCFA.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Vous recevez la commande déjà calculée et le quartier sur WhatsApp en 1 seconde.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Vous n'avez plus qu'à envoyer votre lien Wave et expédier le colis !</span>
              </li>
            </ul>

            {/* Expansion d'impact au clic */}
            {activeDuel === 'with' && (
              <div className="mt-4 pt-4 border-t border-emerald-200 bg-emerald-50/70 p-3.5 rounded-2xl text-xs text-emerald-950 leading-relaxed animate-fadeIn">
                <strong>🚀 L'avantage décisif :</strong> Vous vous réveillez le matin avec des commandes déjà formalisées et le montant total calculé. Vous ne faites que valider et encaisser !
              </div>
            )}
          </div>
        </div>

        {/* Indicateur de swipe mobile avec points */}
        <div className="flex md:hidden items-center justify-between mt-3 px-1">
          <span className="text-[11px] font-mono text-[#8E381A]">
            👉 Glissez de gauche à droite pour comparer
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 rounded-full transition-all duration-300 ${activeDuel === 'without' ? 'w-5 bg-rose-600' : 'w-1.5 bg-[#E4D5B7]'}`} />
            <span className={`h-1.5 rounded-full transition-all duration-300 ${activeDuel === 'with' ? 'w-5 bg-emerald-700' : 'w-1.5 bg-[#E4D5B7]'}`} />
          </div>
        </div>
      </section>

      {/* 5. TARIFICATION TRANSPARENTE DARO BOOST */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 bg-[#FAF7F0] border-t border-[#E8DEC8]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#EFE7D3] border border-[#E4D5B7] px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#8E381A] mb-4">
            Offre Spéciale de Lancement Dakar
          </div>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-[#2B1E16] mb-4 sm:mb-6">
            Votre Pack Daro Boost clé en main
          </h2>
          <p className="text-sm sm:text-base text-[#5C4535] max-w-xl mx-auto mb-8 sm:mb-12">
            Pas de devis complexe ni de mois d'attente. Nous déployons votre boutique en ligne en 24h chrono.
          </p>

          <div className="bg-[#FDFBF7] border-2 border-[#C85A32] rounded-3xl p-6 sm:p-12 shadow-xl relative max-w-xl mx-auto text-left">
            <div className="absolute -top-3.5 right-6 bg-[#C85A32] text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Livré en 24h
            </div>

            <div className="font-bold text-xl sm:text-2xl text-[#2B1E16] mb-1">Pack Daro Boost Express</div>
            <div className="text-xs sm:text-sm text-[#6F5B4C] mb-6">Pour boutiques Instagram & créateurs à Dakar</div>

            <div className="flex items-baseline gap-2 mb-6 sm:mb-8">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#2B1E16]">15 000</span>
              <span className="text-base sm:text-lg font-bold text-[#C85A32]">FCFA</span>
              <span className="text-xs text-[#6F5B4C] ml-1 sm:ml-2">(Frais de setup uniques)</span>
            </div>

            <ul className="space-y-3 sm:space-y-3.5 mb-8 text-xs sm:text-sm text-[#5C4535]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C85A32] shrink-0" />
                <span>Création de votre <strong>Landing Page One-Tap</strong> mobile ultra-rapide</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C85A32] shrink-0" />
                <span>Intégration de <strong>5 à 15 produits phares</strong> avec photos et prix en FCFA</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C85A32] shrink-0" />
                <span>Bouton <strong>Commande WhatsApp Automatisée</strong> pré-remplie</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C85A32] shrink-0" />
                <span>Lien optimisé pour votre <strong>bio Instagram & TikTok</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C85A32] shrink-0" />
                <span>Maintenance & hébergement rapide : seulement <strong>2 000 FCFA/mois</strong></span>
              </li>
            </ul>

            <a 
              href="https://wa.me/221778690584?text=Salam%20Serigne%2C%20je%20veux%20lancer%20mon%20Daro%20Boost%20à%2015000%20FCFA%20pour%20ma%20boutique" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#2B1E16] hover:bg-[#C85A32] text-white font-bold py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-3 text-sm sm:text-base transition shadow-md group"
            >
              <span>Activer mon Daro Boost en 24h</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <div className="text-center text-[11px] text-[#8E381A] mt-3 font-medium">
              ⚡ Démo prête en 24h • Paiement simple par Wave ou Orange Money
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ INTERACTIVE */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#2B1E16] text-center mb-8 sm:mb-10">
          Questions Fréquentes des Commerçants
        </h2>

        <div className="space-y-3">
          {[
            {
              q: "Est-ce que j'ai besoin d'un ordinateur pour utiliser Daro Boost ?",
              a: "Absolument pas ! Tout est conçu pour fonctionner à 100% sur votre smartphone. Vous recevez vos commandes directement sur votre application WhatsApp habituelle."
            },
            {
              q: "Comment mes clients payent-ils ?",
              a: "Vos clients commandent via WhatsApp avec le montant exact déjà calculé. Vous pouvez leur faire payer directement par Wave ou Orange Money, ou à la livraison selon vos habitudes."
            },
            {
              q: "Comment puis-je modifier mes prix ou ajouter des articles ?",
              a: "Un simple message WhatsApp à l'équipe Daro TECH avec la photo et le nouveau prix, et nous mettons à jour votre catalogue en quelques minutes."
            },
            {
              q: "Quelle est la différence avec le logiciel DARO complet ?",
              a: "Daro Boost est le kit express pour vendre rapidement sur Instagram et WhatsApp. Dès que votre volume grandit, vous pouvez basculer sur le logiciel complet DARO pour gérer votre stock, vos employés et vos reçus thermiques."
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-5 bg-[#FAF7F0] border border-[#E8DEC8] rounded-2xl cursor-pointer transition hover:bg-white"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="flex items-center justify-between font-bold text-sm text-[#2B1E16]">
                <span>{item.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#C85A32]" /> : <ChevronDown className="w-4 h-4 text-[#C85A32]" />}
              </div>
              {openFaq === idx && (
                <p className="mt-3 text-sm text-[#5C4535] leading-relaxed pt-2 border-t border-[#E8DEC8]/60">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. FOOTER OFFICIEL DARO TECH */}
      <footer className="bg-[#1E1610] text-[#D9CEBA] py-12 px-4 border-t border-[#2B1E16]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="font-extrabold text-xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C85A32] text-xs flex items-center justify-center text-white">DT</span>
              <span>Daro TECH</span>
            </div>
            <p className="text-xs text-[#A89885] mt-1">
              Studio d'Ingénierie & Solutions SaaS • Dakar, Sénégal • Dirigé par Serigne
            </p>
          </div>

          <div className="text-xs text-[#A89885] space-y-1">
            <div>Daro Boost — Système d'accélération commerciale pour commerçants</div>
            <div>Contact WhatsApp Direct : <strong>+221 77 869 05 84</strong></div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ============================================================================
// COMPOSANT BOUTIQUE EN LIGNE AUTONOME (POUR LES CLIENTS FINAUX DES BOUTIQUES)
// AUCUN ARGUMENTAIRE MARKETING AGÈNCE, PURE EXPÉRIENCE E-COMMERCE MOBILE-FIRST
// ============================================================================
function StandaloneStoreView({ boutique, currentKey, onSwitchPreset, onSwitchToAgency }) {
  const [selectedItems, setSelectedItems] = useState([boutique.products[0]]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    setSelectedItems([boutique.products[0]]);
  }, [boutique]);

  const toggleProduct = (prod) => {
    if (selectedItems.some(i => i.id === prod.id)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter(i => i.id !== prod.id));
      }
    } else {
      setSelectedItems([...selectedItems, prod]);
    }
  };

  const totalAmount = selectedItems.reduce((acc, curr) => acc + curr.price, 0);

  const handleWhatsAppCheckout = () => {
    const itemsList = selectedItems.map(item => `• 1x ${item.name} (${selectedSize}) — ${item.price.toLocaleString('fr-FR')} FCFA`).join('\n');
    const nameStr = customerName.trim() ? customerName : "Client en ligne";
    const addressStr = customerAddress.trim() ? customerAddress : "Dakar";
    const msg = `Salam ${boutique.name} ! 👋\nJe souhaite passer commande sur votre catalogue en ligne :\n\n${itemsList}\n\n💰 *Total :* ${totalAmount.toLocaleString('fr-FR')} FCFA\n📍 *Livraison :* ${addressStr}\n👤 *Nom :* ${nameStr}\n\nPaiement souhaité : Wave 🌊`;
    const waUrl = `https://wa.me/221778690584?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B1E16] font-sans pb-36">
      
      {/* 1. Bandeau Démo discret pour Serigne & l'équipe */}
      <div className="bg-[#1E1610] text-[#EFE7D3] px-3 sm:px-4 py-2 text-xs flex items-center justify-between">
        <span className="font-mono truncate">
          ✨ Démo personnalisée pour <strong className="text-white">{boutique.name}</strong>
        </span>
        <button 
          onClick={onSwitchToAgency}
          className="text-[11px] font-mono text-[#EBB458] hover:underline shrink-0 ml-3"
        >
          Présentation Daro Boost ➔
        </button>
      </div>

      {/* 2. Header Officiel de la Boutique Client */}
      <header className="bg-white border-b border-[#EBE3D3] px-4 pt-5 pb-5 sticky top-0 z-40 shadow-xs">
        <div className="max-w-md mx-auto">
          {/* Sélecteur de démonstration pour tester les autres types de boutiques */}
          <div className="flex items-center justify-center gap-1.5 p-1 bg-[#FAF7F0] border border-[#E8DEC8] rounded-full mb-3.5">
            {Object.entries(BOUTIQUE_PRESETS).map(([key, b]) => (
              <button
                key={key}
                onClick={() => onSwitchPreset(key)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition flex items-center gap-1 ${
                  currentKey === key 
                    ? 'bg-[#C85A32] text-white shadow-sm' 
                    : 'text-[#6F5B4C] hover:bg-white'
                }`}
              >
                <span>{b.avatar}</span>
                <span>{b.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F0E4] border border-[#E4D5B7] flex items-center justify-center text-2xl shadow-sm shrink-0">
              {boutique.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-[#2B1E16] truncate">
                  {boutique.name}
                </h1>
                <span className="text-blue-600 text-xs font-bold shrink-0" title="Boutique vérifiée">✓</span>
              </div>
              <p className="text-xs text-[#6F5B4C] mt-0.5 font-medium truncate">
                {boutique.tagline}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ouvert 24h/24
                </span>
                <span className="text-[10px] text-[#8E381A] font-mono">
                  📦 Livraison Dakar
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Sélecteur de Taille / Option */}
      <div className="bg-[#FAF7F0] border-b border-[#EBE3D3] px-4 py-2.5">
        <div className="max-w-md mx-auto flex items-center justify-between text-xs">
          <span className="font-semibold text-[#5C4535]">Votre taille / pointure :</span>
          <div className="flex gap-1.5">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono font-bold transition flex items-center justify-center border text-xs ${
                  selectedSize === size
                    ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-sm'
                    : 'bg-white text-[#2B1E16] border-[#D9CEBA] hover:bg-[#F5F0E4]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Catalogue des Produits */}
      <main className="max-w-md mx-auto px-4 pt-5 space-y-4">
        <div className="flex items-center justify-between text-xs text-[#6F5B4C]">
          <span className="font-bold text-sm text-[#2B1E16]">Catalogue Disponible ({boutique.products.length})</span>
          <span className="font-mono text-[#8E381A]">Paiement Wave & OM</span>
        </div>

        <div className="space-y-3.5">
          {boutique.products.map(prod => {
            const isSelected = selectedItems.some(i => i.id === prod.id);

            return (
              <div
                key={prod.id}
                onClick={() => toggleProduct(prod)}
                className={`rounded-2xl border p-3 flex gap-3.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/30'
                    : 'bg-white border-[#E8DEC8] hover:border-[#C85A32]/60'
                }`}
              >
                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-[#FAF7F0]">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-[#C85A32] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                    {prod.badge}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="text-[10px] font-mono text-[#8E381A] uppercase tracking-wider font-bold">
                      {prod.category}
                    </div>
                    <h3 className="font-bold text-sm text-[#2B1E16] leading-snug line-clamp-2">
                      {prod.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="font-mono font-extrabold text-sm sm:text-base text-[#C85A32]">
                      {prod.price.toLocaleString('fr-FR')} FCFA
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#C85A32] text-white'
                        : 'bg-[#FAF7F0] border border-[#D9CEBA] text-[#5C4535]'
                    }`}>
                      {isSelected ? '✓ Choisi' : '+ Choisir'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Témoignage client de confiance */}
        <div className="p-4 bg-[#FAF7F0] border border-[#E8DEC8] rounded-2xl text-xs space-y-1 mt-6">
          <div className="flex items-center gap-1 text-[#E09F3E]">
            {'★'.repeat(5)}
            <span className="text-[#2B1E16] font-bold ml-1">4.9/5 sur Dakar</span>
          </div>
          <p className="text-[#5C4535]">
            Commandez en 1 clic. Vous recevez la confirmation par WhatsApp avec le suivi de livraison.
          </p>
        </div>
      </main>

      {/* 5. Panier & Commande WhatsApp Flottante (Fixée en bas) */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E8DEC8] p-3.5 sm:p-4 z-50 shadow-lg">
        <div className="max-w-md mx-auto space-y-2.5">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="text-[#5C4535]">
              {selectedItems.length} article{selectedItems.length > 1 ? 's' : ''} • Taille {selectedSize}
            </span>
            <div className="font-mono font-extrabold text-sm sm:text-base text-[#2B1E16]">
              Total : {totalAmount.toLocaleString('fr-FR')} FCFA
            </div>
          </div>

          {!isOrdering ? (
            <button
              onClick={() => setIsOrdering(true)}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 text-xs sm:text-sm shadow-lg shadow-[#25D366]/25 transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Commander via WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <div className="space-y-2 bg-[#FAF7F0] p-3 rounded-2xl border border-[#E8DEC8] animate-fadeIn">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Votre nom (ex: Amina)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#D9CEBA] rounded-xl focus:outline-none focus:border-[#C85A32]"
                />
                <input
                  type="text"
                  placeholder="Quartier (ex: Almadies)"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#D9CEBA] rounded-xl focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsOrdering(false)}
                  className="px-3 py-2 text-xs bg-white border border-[#D9CEBA] rounded-xl text-[#6F5B4C]"
                >
                  Annuler
                </button>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer la commande sur WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
