import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { 
  Ship, Plane, Package, Truck, Globe, ShieldCheck, Clock, 
  MapPin, Menu, X, ArrowRight, BarChart3, Users, Building, ChevronRight, Anchor, ChevronDown, Search, CheckCircle2, Clock3
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';
import { cn } from './lib/utils';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Language } from './translations';
import Login from './Login';

// --- DATA ---
const deliveryData = [
  { name: 'Jan', TEU: 800 },
  { name: 'Feb', TEU: 900 },
  { name: 'Mar', TEU: 900 },
  { name: 'Apr', TEU: 1100 },
  { name: 'Mei', TEU: 1250 },
  { name: 'Jun', TEU: 1300 },
  { name: 'Jul', TEU: 1400 },
  { name: 'Agu', TEU: 1400 },
  { name: 'Sep', TEU: 1550 },
  { name: 'Okt', TEU: 1650 },
  { name: 'Nov', TEU: 1750 },
  { name: 'Des', TEU: 1800 },
];

// --- COMPONENTS ---

// 1. Loading Screen
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useLanguage();
  
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-yellow flex items-center justify-center">
            <Anchor className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">NUSANTARA LOGISTICS</h1>
        </div>
        
        {/* Loading Bar */}
        <div className="w-48 h-[2px] bg-gray-200 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-brand-yellow"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-4 text-sm text-gray-500 font-medium tracking-widest uppercase text-xs">{t.loading.starting}</p>
      </motion.div>
    </motion.div>
  );
};

// 2. Navbar
const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-yellow transition-colors border-l border-gray-200 pl-4 ml-2"
      >
        <img 
          src={language === 'id' ? "https://flagcdn.com/w20/id.png" : "https://flagcdn.com/w20/gb.png"} 
          width="20" 
          alt={language === 'id' ? "IDN" : "ENG"} 
          className="rounded-sm shadow-sm"
        />
        <span>{language === 'id' ? "IDN" : "ENG"}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 bg-white shadow-xl border border-gray-100 rounded-md overflow-hidden min-w-[120px]"
          >
            <button 
              onClick={() => toggleLanguage('id')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-soft-gray transition-colors text-left text-gray-700"
            >
              <img src="https://flagcdn.com/w20/id.png" width="20" alt="IDN" className="rounded-sm shadow-sm" />
              <span>Indonesia</span>
            </button>
            <button 
              onClick={() => toggleLanguage('en')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-soft-gray transition-colors text-left text-gray-700"
            >
              <img src="https://flagcdn.com/w20/gb.png" width="20" alt="ENG" className="rounded-sm shadow-sm" />
              <span>English</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "beranda" },
    { name: t.nav.about, href: "tentang-kami" },
    { name: t.nav.services, href: "layanan" },
    { name: t.nav.network, href: "jaringan-global" },
    { name: t.nav.contact, href: "kontak" }
  ];

  return (
    <header className={cn(
      "fixed top-0 w-full z-40 transition-all duration-300 border-b",
      isScrolled ? "bg-white/95 backdrop-blur-sm border-gray-100 py-3 shadow-sm" : "bg-white border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-yellow flex items-center justify-center">
            <Anchor className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">NUSANTARA</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center items-center">
          <div className="flex gap-8 items-center">
            {navLinks.map((link, idx) => (
              <a key={idx} href={`#${link.href}`} 
                 className="text-sm font-medium text-gray-600 hover:text-brand-yellow transition-colors cursor-pointer">
                {link.name}
              </a>
            ))}
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link to="/login" className="bg-brand-yellow hover:bg-brand-yellow-hover text-white px-5 py-2.5 text-sm font-medium transition-colors inline-block">
            {t.nav.login}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link, idx) => (
                <a key={idx} href={`#${link.href}`} 
                   className="text-sm font-medium text-gray-800 py-2 border-b border-gray-50 uppercase tracking-wider"
                   onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <Link to="/login" className="bg-brand-yellow text-white px-5 py-3 text-sm font-medium w-full mt-4 text-center block">
                {t.nav.login}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// 3. Hero Section
const TrackingWidget = () => {
  const { t } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | 'found' | 'not_found'>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsSearching(true);
    // Mock simulation
    setTimeout(() => {
      setIsSearching(false);
      if (trackingNumber.length > 5) {
        setSearchResult('found');
      } else {
        setSearchResult('not_found');
      }
    }, 1500);
  };

  const steps = [
    { label: t.tracking.step1, date: "12 May 2026", active: true, completed: true },
    { label: t.tracking.step2, date: "13 May 2026", active: true, completed: true },
    { label: t.tracking.step3, date: "14 May 2026", active: true, completed: false },
    { label: t.tracking.step4, date: "Pending", active: false, completed: false }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="bg-white p-5 md:p-6 lg:p-8 shadow-xl border-t-4 border-brand-yellow w-full rounded-sm relative z-30"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-8">
        <div className="md:w-5/12 lg:w-1/2">
          <h3 className="text-xl font-bold text-charcoal mb-1">{t.tracking.title}</h3>
          <p className="text-sm text-gray-500 font-light leading-relaxed mb-0">{t.tracking.desc}</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative md:w-7/12 lg:w-1/2 w-full">
          <div className="flex shadow-sm rounded-sm overflow-hidden flex-col sm:flex-row border border-gray-100">
            <input 
              type="text" 
              placeholder={t.tracking.placeholder}
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full bg-soft-gray hover:bg-gray-100/50 px-4 py-3 focus:outline-none focus:bg-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-colors placeholder:text-gray-400 text-charcoal text-sm"
            />
            <button 
              type="submit" 
              disabled={isSearching}
              className="px-6 py-3 sm:py-0 bg-brand-yellow hover:bg-brand-yellow-hover text-white transition-colors flex items-center justify-center disabled:opacity-80 font-medium text-sm"
              aria-label="Search"
            >
              {isSearching ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>

      {/* Render Results */}
      {searchResult === 'found' && (
        <div className="mt-8 border-t border-gray-100 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center justify-between mb-8">
             <div>
               <span className="text-xs text-brand-yellow font-bold uppercase tracking-widest block mb-1">{t.tracking.status}</span>
               <h4 className="font-bold text-lg text-charcoal">{t.tracking.inTransit}</h4>
             </div>
             <div className="text-right">
               <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">{t.tracking.awb}</span>
               <h4 className="font-mono text-lg font-semibold text-gray-700">{trackingNumber}</h4>
             </div>
           </div>

           <div className="relative">
              {/* Horizontal line for desktop, vertical line for mobile */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gray-200 md:w-auto md:h-px md:left-[50px] md:right-[50px] md:top-[15px] md:bottom-auto z-0"></div>
              
              <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-4 flex-1">
                     <div className={cn(
                       "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white transition-colors",
                       step.completed ? "border-brand-yellow text-brand-yellow" : 
                       step.active ? "border-brand-yellow border-dashed" : "border-gray-200 text-gray-200"
                     )}>
                       {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <div className={cn("w-2 h-2 rounded-full", step.active ? "bg-brand-yellow animate-pulse" : "bg-gray-200")} />}
                     </div>
                     <div className="md:text-center mt-0.5 md:mt-0">
                       <p className={cn("text-sm font-bold mb-1", step.active ? "text-charcoal" : "text-gray-400")}>{step.label}</p>
                       <p className="text-xs text-gray-500 font-medium flex items-center md:justify-center gap-1.5 uppercase tracking-wider">
                         <Clock3 className="w-3.5 h-3.5" /> {step.date}
                       </p>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {searchResult === 'not_found' && (
        <div className="mt-8 border-t border-gray-100 pt-8 text-center bg-red-50/50 rounded-sm pb-6">
          <p className="text-base text-red-600 font-bold mb-2">Error</p>
          <p className="text-sm text-gray-600">{t.tracking.notFound}</p>
        </div>
      )}

    </motion.div>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="beranda" className="relative pt-32 pb-32 md:pt-40 md:pb-40 min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-charcoal">
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="/Video Project.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-charcoal/60 mix-blend-multiply pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center md:text-left">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto md:mx-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 mb-6 backdrop-blur-sm rounded-sm">
            <Globe className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-semibold text-brand-yellow uppercase tracking-widest">{t.hero.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-white font-display">
            {t.hero.title1} <br className="hidden md:block" /> <span className="text-brand-yellow">{t.hero.title2}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl font-light mx-auto md:mx-0">
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#layanan" className="bg-brand-yellow hover:bg-brand-yellow-hover text-white px-8 py-3.5 font-medium transition-colors flex items-center justify-center gap-2 rounded-sm shadow-lg">
              {t.hero.btnLearn} <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#kontak" className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 font-medium transition-colors flex items-center justify-center rounded-sm backdrop-blur-sm">
              {t.hero.btnContact}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// 4. About Section
const About = () => {
  const { t } = useLanguage();
  return (
    <section id="tentang-kami" className="py-16 md:py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
             <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">{t.about.badge}</h3>
             <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
               {t.about.title}
             </h2>
             <p className="text-gray-600 mb-6 font-light leading-relaxed">
               {t.about.desc1}
             </p>
             <p className="text-gray-600 mb-8 font-light leading-relaxed">
               {t.about.desc2}
             </p>
             <div className="flex flex-col sm:flex-row gap-6">
               <div className="border-l-2 border-brand-yellow pl-4">
                 <div className="text-3xl font-bold text-charcoal mb-1">15+</div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{t.about.expYears}</div>
               </div>
               <div className="border-l-2 border-brand-yellow pl-4">
                 <div className="text-3xl font-bold text-charcoal mb-1">50+</div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{t.about.expCountries}</div>
               </div>
               <div className="border-l-2 border-brand-yellow pl-4">
                 <div className="text-3xl font-bold text-charcoal mb-1">99%</div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{t.about.expSuccess}</div>
               </div>
             </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden shadow-lg relative z-10">
              <img src="https://i.imgur.com/sfetoA8.jpeg" alt="Warehouse Operation" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-yellow z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Services Section
const Services = () => {
  const { t } = useLanguage();
  const serviceIcons = [
    <Ship className="w-6 h-6" />,
    <Plane className="w-6 h-6" />,
    <ShieldCheck className="w-6 h-6" />,
    <Building className="w-6 h-6" />,
    <Package className="w-6 h-6" />,
    <Truck className="w-6 h-6" />
  ];

  return (
    <section id="layanan" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">{t.services.badge}</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
            {t.services.title}
          </h2>
          <p className="text-gray-600 font-light">
            {t.services.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((svc, idx) => (
            <div key={idx} className="group border border-gray-100 hover:border-brand-yellow/50 bg-white p-6 lg:p-8 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
               <div className="w-12 h-12 bg-soft-gray group-hover:bg-brand-yellow flex items-center justify-center text-dark-gray group-hover:text-white transition-colors mb-4 lg:mb-6 duration-300">
                 {serviceIcons[idx]}
               </div>
               <h4 className="text-xl font-bold mb-3 text-charcoal">{svc.title}</h4>
               <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                 {svc.desc}
               </p>
               <a href="#" className="inline-flex items-center text-sm font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors">
                 {t.services.learnMore} <ChevronRight className="w-4 h-4 ml-1" />
               </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Insights Section
const Insights = () => {
  const { t, language } = useLanguage();
  
  // Use localized route Data if needed, or default
  const localizedRouteData = [
    { name: language === 'en' ? 'Singapore' : 'Singapura', volume: 320 },
    { name: language === 'en' ? 'China' : 'Tiongkok', volume: 280 },
    { name: language === 'en' ? 'Japan' : 'Jepang', volume: 210 },
    { name: language === 'en' ? 'Netherlands' : 'Belanda', volume: 190 },
    { name: language === 'en' ? 'Americas' : 'Amerika', volume: 160 },
    { name: language === 'en' ? 'Germany' : 'Jerman', volume: 140 },
  ];

  return (
    <section className="py-16 md:py-24 bg-soft-gray border-t border-gray-100 text-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">{t.insights.badge}</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">
            {t.insights.title}
          </h2>
          <p className="text-gray-600 font-light max-w-3xl leading-relaxed">
            {t.insights.desc}
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100 p-6 md:p-8 mb-8 bg-white shadow-sm">
          {t.insights.stats?.map((stat: any, idx: number) => (
            <div key={idx} className={cn("flex flex-col", idx < 3 ? "md:border-r md:border-gray-100 pr-4" : "")}>
              <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{stat.label}</span>
              <span className="text-3xl md:text-4xl font-bold text-charcoal mb-2">{stat.value}</span>
              <span className="text-xs md:text-sm font-medium text-brand-yellow font-mono">{stat.trend}</span>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="border border-gray-100 bg-white shadow-sm max-w-full overflow-hidden">
          <div className="grid lg:grid-cols-2">
             {/* Chart 1: Area Chart */}
             <div className="w-full p-6 md:p-8 lg:border-r lg:border-gray-100 border-b lg:border-b-0 border-gray-100">
               <div className="flex justify-between items-start mb-10">
                 <div>
                   <h4 className="font-bold text-charcoal mb-1">{t.insights.chart1Title}</h4>
                   <p className="text-sm text-gray-500 font-light">{t.insights.chart1Subtitle}</p>
                 </div>
                 <span className="bg-brand-yellow font-bold text-xs py-1 px-3 text-white rounded-sm">2026</span>
               </div>
               
               <div className="h-64 w-full relative -ml-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={deliveryData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} dx={-5} domain={[0, 1800]} ticks={[0, 450, 900, 1350, 1800]} />
                     <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                     <Area type="monotone" dataKey="TEU" stroke="#EAB308" strokeWidth={2} fill="#FEF08A" fillOpacity={0.4} />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
             </div>

             {/* Chart 2: Bar Chart */}
             <div className="w-full p-6 md:p-8">
                <div className="mb-10">
                   <h4 className="font-bold text-charcoal mb-1">{t.insights.chart2Title}</h4>
                   <p className="text-sm text-gray-500 font-light">{t.insights.chart2Subtitle}</p>
                 </div>
                 <div className="h-64 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={localizedRouteData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                       <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                       <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 320]} ticks={[0, 80, 160, 240, 320]} />
                       <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#4b5563', fontSize: 12 }} width={80} />
                       <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                       <Bar dataKey="volume" fill="#EAB308" barSize={14} radius={[0, 4, 4, 0]} />
                     </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// 7. Global Network
const GlobalNetwork = () => {
  const { t } = useLanguage();
  return (
    <section id="jaringan-global" className="py-16 md:py-20 bg-soft-gray overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">{t.network.badge}</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
            {t.network.title}
          </h2>
        </div>
        
        <div className="relative aspect-video max-h-[500px] w-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
           {/* Decorative Map Pattern - simpler aesthetic to represent network without complex SVG maps */}
           <div className="absolute inset-0 opacity-10" 
                style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
           </div>
           
           <div className="z-10 flex flex-col md:flex-row gap-8 md:gap-24 relative p-8">
             <div className="flex flex-col items-center bg-white p-4 shadow-sm border border-gray-100">
                <MapPin className="text-brand-yellow w-8 h-8 mb-2" />
                <span className="font-bold text-lg">Jakarta, ID</span>
                <span className="text-xs text-gray-500 uppercase">{t.network.hub}</span>
             </div>
             
             {/* Animating connection line */}
             <div className="hidden md:flex absolute top-1/2 left-32 right-32 h-[1px] bg-gray-200 -z-10">
               <motion.div 
                 className="h-full bg-brand-yellow" 
                 animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               />
             </div>

             <div className="flex flex-col items-center bg-white p-4 shadow-sm border border-gray-100">
                <MapPin className="text-dark-gray w-8 h-8 mb-2" />
                <span className="font-bold text-lg">Shanghai, CN</span>
                <span className="text-xs text-gray-500 uppercase">{t.network.branch}</span>
             </div>
             <div className="flex flex-col items-center bg-white p-4 shadow-sm border border-gray-100">
                <MapPin className="text-dark-gray w-8 h-8 mb-2" />
                <span className="font-bold text-lg">Rotterdam, NL</span>
                <span className="text-xs text-gray-500 uppercase">{t.network.branch}</span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// 8. Why Us
const WhyUs = () => {
  const { t } = useLanguage();
  const icons = [
    <Clock className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow mx-auto mb-3 lg:mb-4" />,
    <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow mx-auto mb-3 lg:mb-4" />,
    <Users className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow mx-auto mb-3 lg:mb-4" />,
    <BarChart3 className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow mx-auto mb-3 lg:mb-4" />
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6 lg:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {t.whyUs.items.map((item, idx) => (
            <div key={idx} className="p-4 lg:p-6">
              {icons[idx]}
              <h4 className="text-base lg:text-lg font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 9. CTA
const CTA = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-20 bg-brand-yellow relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {t.cta.title}
        </h2>
        <p className="text-brand-yellow-hover font-medium mb-10 max-w-2xl mx-auto text-lg text-white">
          {t.cta.desc}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#kontak" className="bg-charcoal text-white px-8 py-4 font-bold hover:bg-gray-800 transition-colors flex items-center justify-center text-center">
            {t.cta.btnPrimary}
          </a>
          <a href="#layanan" className="bg-transparent border-2 border-charcoal text-charcoal px-8 py-4 font-bold hover:bg-charcoal hover:text-white transition-colors flex items-center justify-center text-center">
            {t.cta.btnSecondary}
          </a>
        </div>
      </div>
    </section>
  );
};

// 10. Footer
const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer id="kontak" className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 border-b border-gray-800 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-yellow flex items-center justify-center">
                  <Anchor className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight">NUSANTARA</span>
              </div>
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                {t.footer.desc}
              </p>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6 tracking-wide">{t.footer.company}</h4>
             <ul className="space-y-3">
               {t.footer.menuCompany.map((item, idx) => (
                 <li key={idx}><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">{item}</a></li>
               ))}
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6 tracking-wide">{t.footer.servicesTitle}</h4>
             <ul className="space-y-3">
               {t.footer.menuServices.map((item, idx) => (
                 <li key={idx}><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">{item}</a></li>
               ))}
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6 tracking-wide">{t.footer.hq}</h4>
             <address className="not-italic text-sm text-gray-400 font-light space-y-4">
               <div>
                 <strong className="block text-gray-300 mb-1">{t.footer.address.split(',')[0] || "Jakarta, Indonesia"}</strong>
                 {t.footer.address}<br />
                 {t.footer.address2}<br />
                 {t.footer.address3}
               </div>
               <div>
                 <a href="mailto:info@nusantaralogistik.co.id" className="hover:text-brand-yellow transition-colors">info@nusantaralogistik.co.id</a><br/>
                 <a href="tel:+622144556677" className="hover:text-brand-yellow transition-colors">+62 21 4455 6677</a>
               </div>
             </address>
          </div>

        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xs text-gray-500 font-light mb-4 md:mb-0">
          {t.footer.copyright}
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">{t.footer.privacy}</a>
          <a href="#" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">{t.footer.terms}</a>
        </div>
      </div>
    </footer>
  );
};

const AppContent = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8 }}
        >
          <Navbar />
          <main>
            <Hero />
            <div className="bg-soft-gray w-full pt-[1px]">
              <div className="relative -mt-20 md:-mt-[4.5rem] lg:-mt-16 z-30 max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 w-full">
                <TrackingWidget />
              </div>
            </div>
            <About />
            <Services />
            <Insights />
            <GlobalNetwork />
            <WhyUs />
            <CTA />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}


