import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ship, Plane, Package, Truck, Globe, ShieldCheck, Clock, 
  MapPin, Menu, X, ArrowRight, BarChart3, Users, Building, ChevronRight, Anchor, ChevronDown
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';
import { cn } from './lib/utils';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Language } from './translations';

// --- DATA ---
const deliveryData = [
  { name: 'Jan', TEU: 4000 },
  { name: 'Feb', TEU: 3000 },
  { name: 'Mar', TEU: 5000 },
  { name: 'Apr', TEU: 4500 },
  { name: 'Mei', TEU: 6000 },
  { name: 'Jun', TEU: 7500 },
];

const routeData = [
  { name: 'Asia Pasifik', volume: 85 },
  { name: 'Eropa', volume: 65 },
  { name: 'Timur Tengah', volume: 45 },
  { name: 'Amerika', volume: 30 },
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
          <button className="bg-brand-yellow hover:bg-brand-yellow-hover text-white px-5 py-2.5 text-sm font-medium transition-colors">
            {t.nav.consultation}
          </button>
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
              <button className="bg-brand-yellow text-white px-5 py-3 text-sm font-medium w-full mt-4">
                {t.nav.consultationNow}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// 3. Hero Section
const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="beranda" className="relative pt-24 pb-12 md:pt-28 md:pb-16 min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-charcoal">
        <video
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          src="/Video Project.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-charcoal/60 mix-blend-multiply pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-3xl">
          
          {/* Left: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
                <Globe className="w-4 h-4 text-brand-yellow" />
                <span className="text-xs font-semibold text-brand-yellow uppercase tracking-widest">{t.hero.badge}</span>
              </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white font-display">
              {t.hero.title1} <span className="text-brand-yellow">{t.hero.title2}</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl font-light">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brand-yellow hover:bg-brand-yellow-hover text-white px-8 py-3.5 font-medium transition-colors flex items-center justify-center gap-2">
                {t.hero.btnLearn} <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 font-medium transition-colors flex items-center justify-center">
                {t.hero.btnContact}
              </button>
            </div>
          </motion.div>
        </div>
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
  const { t } = useLanguage();
  
  const localizedRouteData = routeData.map((d, i) => ({
    ...d,
    name: t.insights.routes[i] || d.name
  }));

  return (
    <section className="py-16 md:py-20 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">{t.insights.badge}</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {t.insights.title}
            </h2>
            <p className="text-gray-400 font-light mb-8">
              {t.insights.desc}
            </p>
            
            <div className="space-y-6">
              <div className="p-5 border border-gray-700 bg-gray-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-300">{t.insights.accuracy}</span>
                  <span className="text-brand-yellow font-bold text-xl">98.5%</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5">
                  <div className="bg-brand-yellow h-1.5" style={{ width: '98.5%' }}></div>
                </div>
              </div>
              
              <div className="p-5 border border-gray-700 bg-gray-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-300">{t.insights.capacity}</span>
                  <span className="text-brand-yellow font-bold text-xl">150K+</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5">
                  <div className="bg-brand-yellow h-1.5" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 p-6 md:p-8 relative">
            <h4 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">{t.insights.distribution}</h4>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={localizedRouteData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                   <Tooltip cursor={{fill: '#1f2937'}} contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', color: '#fff' }} />
                   <Bar dataKey="volume" fill="#EAB308" barSize={24} />
                 </BarChart>
               </ResponsiveContainer>
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
          <button className="bg-charcoal text-white px-8 py-4 font-bold hover:bg-gray-800 transition-colors">
            {t.cta.btnPrimary}
          </button>
          <button className="bg-transparent border-2 border-charcoal text-charcoal px-8 py-4 font-bold hover:bg-charcoal hover:text-white transition-colors">
            {t.cta.btnSecondary}
          </button>
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
       <AppContent />
    </LanguageProvider>
  )
}


