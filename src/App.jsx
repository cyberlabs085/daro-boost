import React, { useState, useEffect } from 'react';
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

const PRODUCTS = [
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
    name: "Coffret Oud & Ambre Royal",
    price: 19500,
    category: "Parfumerie de Luxe",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    badge: "Coup de Cœur"
  },
  {
    id: 3,
    name: "Sac Cuir Artisanal Touba",
    price: 24000,
    category: "Maroquinerie",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    badge: "Artisanal"
  }
];

export default function App() {
  // État du simulateur de commande One-Tap
  const [selectedItems, setSelectedItems] = useState([PRODUCTS[0]]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [customerName, setCustomerName] = useState("Amina");
  const [customerAddress, setCustomerAddress] = useState("Almadies, Dakar");
  const [simScreen, setSimScreen] = useState('catalogue'); // 'catalogue' | 'whatsapp'
  const [openFaq, setOpenFaq] = useState(null);

  // État interactif de zoom dynamique pour les cartes Télémétrie et Duel
  const [activeTelemetry, setActiveTelemetry] = useState(null);
  const [activeDuel, setActiveDuel] = useState('with'); // 'with' | 'without' | null

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
    return `Salam Maison Sahel ! 👋\nJe souhaite passer commande via votre catalogue Daro Boost :\n\n${itemsList}\n\n💰 *Total :* ${totalAmount.toLocaleString('fr-FR')} FCFA\n📍 *Livraison :* ${customerAddress}\n👤 *Nom :* ${customerName}\n\nPaiement souhaité : Wave 🌊`;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B1E16] font-sans bg-grain selection:bg-[#C85A32] selection:text-white">
      
      {/* 1. NAVBAR OFFICIELLE DARO TECH */}
      <header className="sticky top-4 z-50 px-4 max-w-6xl mx-auto">
        <nav className="bg-[#FAF7F0]/90 backdrop-blur-md border border-[#EBE3D3] rounded-full px-5 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-bold text-sm tracking-wider">
              DT
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-[#2B1E16]">Daro TECH</span>
              <span className="hidden sm:inline-block ml-2 text-xs uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-[#EBE3D3]/60 text-[#8E381A]">
                Unité Daro Boost
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#simulateur" 
              className="text-xs sm:text-sm font-semibold text-[#8E381A] hover:text-[#C85A32] transition"
            >
              Voir la Démo
            </a>
            <a 
              href="https://wa.me/221778690584?text=Salam%20Serigne%2C%20je%20souhaite%20activer%20Daro%20Boost%20pour%20ma%20boutique%20TikTok%20et%20Instagram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#2B1E16] hover:bg-[#C85A32] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-[#EBB458]" />
              <span>Activer en 24h</span>
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

        {/* 4 Piliers Télémétrie avec Zoom Dynamique & Expansion Fluide */}
        <div className="mt-16 text-left">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono text-[#8E381A] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping"></span>
              ✨ Touchez une carte pour zoomer et voir le détail :
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {TELEMETRY_CARDS.map((card) => {
              const IconComp = card.icon;
              const isActive = activeTelemetry === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveTelemetry(isActive ? null : card.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] border ${
                    isActive 
                      ? `scale-[1.04] sm:scale-[1.06] -translate-y-2.5 bg-white shadow-2xl ring-2 ${card.ring} border-transparent z-20`
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
        </div>
      </section>

      {/* 3. LE SIMULATEUR INTERACTIF PHONE ONE-TAP (L'ARTEFACT MAÎTRE) */}
      <section id="simulateur" className="py-20 px-4 bg-[#F5F0E4]/60 border-y border-[#E8DEC8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C85A32] font-bold">
              Expérience Interactive en Direct
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2B1E16] tracking-tight mt-2 mb-4">
              Testez comme si vous étiez <span className="font-serif italic font-normal text-[#C85A32]">votre propre client.</span>
            </h2>
            <p className="text-[#5C4535]">
              Touchez les articles ci-dessous pour voir comment une commande sur vos vidéos TikTok ou posts Instagram se transforme instantanément en un message WhatsApp structuré et prêt à encaisser.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Colonne Gauche : Explication & Contrôles */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-[#FDFBF7] border border-[#E4D5B7] rounded-3xl shadow-sm">
                <h3 className="font-bold text-lg text-[#2B1E16] mb-3 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#C85A32]" />
                  Ce qui se passe pour le client :
                </h3>
                <ul className="space-y-3 text-sm text-[#5C4535]">
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
              <div className="p-6 bg-[#FAF7F0] border border-[#E4D5B7] rounded-3xl space-y-4">
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

            {/* Colonne Droite : Le Mockup Téléphone Interactif */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-[360px] bg-[#1E1610] p-3 rounded-[3rem] phone-shadow">
                {/* Notch / Caméra */}
                <div className="w-24 h-4 bg-black mx-auto rounded-full mb-2"></div>
                
                {/* Écran du téléphone */}
                <div className="bg-[#FDFBF7] rounded-[2.5rem] overflow-hidden min-h-[580px] flex flex-col border border-[#3E2D22]">
                  
                  {/* Barre supérieure du téléphone */}
                  <div className="bg-[#FAF7F0] border-b border-[#EBE3D3] px-4 py-2.5 flex items-center justify-between text-xs font-mono text-[#5C4535]">
                    <span className="font-bold">Maison Sahel • Bio Link</span>
                    <div className="flex items-center gap-1">
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
                        <div className="text-[11px] text-[#6F5B4C] font-medium">
                          Sélectionnez les articles à commander :
                        </div>

                        {PRODUCTS.map(prod => {
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
            </div>

          </div>
        </div>
      </section>

      {/* 4. LE DUEL : LE CHAOS DES DM VS LE STANDARD DARO BOOST */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B1E16] tracking-tight mb-4">
            Le Choc : Pourquoi 80% des ventes se perdent sur TikTok & Instagram
          </h2>
          <p className="text-[#5C4535] max-w-xl mx-auto text-base">
            Ne soyez plus un commerçant qui passe sa journée à répondre « Prix en PV », devenez une marque qui traite des commandes automatiques.
          </p>
        </div>

        {/* Sélecteur de comparaison rapide */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveDuel('without')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
              activeDuel === 'without'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20 scale-105'
                : 'bg-white border border-[#E4D5B7] text-[#6F5B4C] hover:bg-rose-50'
            }`}
          >
            <span>❌ Voir la Galère sans Daro</span>
          </button>
          <button
            onClick={() => setActiveDuel('with')}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 ${
              activeDuel === 'with'
                ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 scale-105'
                : 'bg-white border border-[#E4D5B7] text-[#6F5B4C] hover:bg-emerald-50'
            }`}
          >
            <span>✨ Voir l'effet Daro Boost (Recommandé)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Colonne Rouge : Le Chaos Actuel */}
          <div 
            onClick={() => setActiveDuel(activeDuel === 'without' ? null : 'without')}
            className={`p-8 rounded-3xl space-y-4 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border ${
              activeDuel === 'without'
                ? 'scale-[1.03] sm:scale-[1.05] -translate-y-2 bg-white border-rose-400 shadow-2xl ring-2 ring-rose-400 z-10'
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
                {activeDuel === 'without' ? '🔍 Zoom Actif' : 'Toucher pour zoomer'}
              </span>
            </div>

            <ul className="space-y-3.5 text-sm text-[#5C4535]">
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
            className={`p-8 rounded-3xl space-y-4 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border ${
              activeDuel === 'with'
                ? 'scale-[1.03] sm:scale-[1.05] -translate-y-2 bg-white border-emerald-500 shadow-2xl ring-2 ring-emerald-500 z-10'
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
                {activeDuel === 'with' ? '✨ Zoom Actif' : 'Toucher pour zoomer'}
              </span>
            </div>

            <ul className="space-y-3.5 text-sm text-[#264D36]">
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
      </section>

      {/* 5. TARIFICATION TRANSPARENTE DARO BOOST */}
      <section className="py-20 px-4 bg-[#FAF7F0] border-t border-[#E8DEC8]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#EFE7D3] border border-[#E4D5B7] px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#8E381A] mb-4">
            Offre Spéciale de Lancement Dakar
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2B1E16] mb-6">
            Votre Pack Daro Boost clé en main
          </h2>
          <p className="text-[#5C4535] max-w-xl mx-auto mb-12">
            Pas de devis complexe ni de mois d'attente. Nous déployons votre boutique en ligne en 24h chrono.
          </p>

          <div className="bg-[#FDFBF7] border-2 border-[#C85A32] rounded-3xl p-8 sm:p-12 shadow-xl relative max-w-xl mx-auto text-left">
            <div className="absolute -top-3.5 right-6 bg-[#C85A32] text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Livré en 24h
            </div>

            <div className="font-bold text-2xl text-[#2B1E16] mb-1">Pack Daro Boost Express</div>
            <div className="text-sm text-[#6F5B4C] mb-6">Pour boutiques Instagram & créateurs à Dakar</div>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-extrabold font-mono text-[#2B1E16]">15 000</span>
              <span className="text-lg font-bold text-[#C85A32]">FCFA</span>
              <span className="text-xs text-[#6F5B4C] ml-2">(Frais de setup uniques)</span>
            </div>

            <ul className="space-y-3.5 mb-8 text-sm text-[#5C4535]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C85A32] shrink-0" />
                <span>Création de votre <strong>Landing Page One-Tap</strong> mobile ultra-rapide</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C85A32] shrink-0" />
                <span>Intégration de <strong>5 à 15 produits phares</strong> avec photos et prix en FCFA</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C85A32] shrink-0" />
                <span>Bouton <strong>Commande WhatsApp Automatisée</strong> pré-remplie</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C85A32] shrink-0" />
                <span>Lien optimisé pour votre <strong>bio Instagram & TikTok</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C85A32] shrink-0" />
                <span>Maintenance & hébergement rapide : seulement <strong>2 000 FCFA/mois</strong></span>
              </li>
            </ul>

            <a 
              href="https://wa.me/221778690584?text=Salam%20Serigne%2C%20je%20veux%20lancer%20mon%20Daro%20Boost%20à%2015000%20FCFA%20pour%20ma%20boutique" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#2B1E16] hover:bg-[#C85A32] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-base transition shadow-md group"
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
      <section className="py-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B1E16] text-center mb-10">
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
