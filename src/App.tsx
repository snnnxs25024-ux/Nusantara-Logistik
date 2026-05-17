import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ship, Plane, Package, Truck, Globe, ShieldCheck, Clock, 
  MapPin, Menu, X, ArrowRight, BarChart3, Users, Building, ChevronRight, Anchor
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar 
} from 'recharts';
import { cn } from './lib/utils';

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
        <p className="mt-4 text-sm text-gray-500 font-medium tracking-widest uppercase text-xs">Memulai Sistem...</p>
      </motion.div>
    </motion.div>
  );
};

// 2. Navbar
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ["Beranda", "Tentang Kami", "Layanan", "Jaringan Global", "Kontak"];

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
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-8">
            {navLinks.map((link, idx) => (
              <a key={idx} href={`#${link.toLowerCase().replace(' ', '-')}`} 
                 className="text-sm font-medium text-gray-600 hover:text-brand-yellow transition-colors cursor-pointer">
                {link}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button className="bg-brand-yellow hover:bg-brand-yellow-hover text-white px-5 py-2.5 text-sm font-medium transition-colors">
            Konsultasi
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
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
                <a key={idx} href={`#${link.toLowerCase().replace(' ', '-')}`} 
                   className="text-sm font-medium text-gray-800 py-2 border-b border-gray-50 uppercase tracking-wider">
                  {link}
                </a>
              ))}
              <button className="bg-brand-yellow text-white px-5 py-3 text-sm font-medium w-full mt-4">
                Konsultasi Sekarang
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
  return (
    <section id="beranda" className="relative pt-24 pb-12 md:pt-28 md:pb-16 min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.video 
          src="https://assets.mixkit.co/videos/preview/mixkit-logistics-and-shipping-containers-in-a-port-41130-large.mp4" 
          className="w-full h-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-charcoal/85 mix-blend-multiply"></div>
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
                <span className="text-xs font-semibold text-brand-yellow uppercase tracking-widest">Global Supply Chain</span>
              </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white font-display">
              Solusi Export Import & <span className="text-brand-yellow">Logistik Global</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl font-light">
              Mengelola kebutuhan pengiriman, distribusi, dan logistik internasional secara profesional dan terpercaya untuk efisiensi bisnis Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brand-yellow hover:bg-brand-yellow-hover text-white px-8 py-3.5 font-medium transition-colors flex items-center justify-center gap-2">
                Pelajari Layanan <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 font-medium transition-colors flex items-center justify-center">
                Hubungi Kami
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
  return (
    <section id="tentang-kami" className="py-16 md:py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
             <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">Profil Perusahaan</h3>
             <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
               Mitra Logistik Internasional dengan Standar Enterprise
             </h2>
             <p className="text-gray-600 mb-6 font-light leading-relaxed">
               Nusantara Logistik Perdana hadir sebagai jembatan untuk aktivitas perdagangan internasional Anda. Kami menyederhanakan kompleksitas rantai pasok global melalui layanan komprehensif mulai dari pengiriman antar negara hingga manajemen pergudangan domestik.
             </p>
             <p className="text-gray-600 mb-8 font-light leading-relaxed">
               Dengan infrastruktur modern dan tim yang berpengalaman dalam regulasi kepabeanan, kami menjamin keamanan, ketepatan waktu, dan efisiensi biaya untuk setiap kargo yang Anda percayakan.
             </p>
             <div className="flex flex-col sm:flex-row gap-6">
               <div className="border-l-2 border-brand-yellow pl-4">
                 <div className="text-3xl font-bold text-charcoal mb-1">15+</div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Tahun Pengalaman</div>
               </div>
               <div className="border-l-2 border-brand-yellow pl-4">
                 <div className="text-3xl font-bold text-charcoal mb-1">50+</div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Negara Tujuan</div>
               </div>
               <div className="border-l-2 border-brand-yellow pl-4">
                 <div className="text-3xl font-bold text-charcoal mb-1">99%</div>
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Tingkat Keberhasilan</div>
               </div>
             </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden shadow-lg relative z-10">
              <img src="https://images.unsplash.com/photo-1566847438217-76e82d383f84?q=80&w=2000&auto=format&fit=crop" alt="Warehouse Operation" className="w-full h-full object-cover" />
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
  const services = [
    { icon: <Ship className="w-6 h-6" />, title: "Pengiriman Laut", desc: "Solusi FCL dan LCL untuk pengiriman kargo dalam volume besar dengan biaya efisien di seluruh jaringan global." },
    { icon: <Plane className="w-6 h-6" />, title: "Pengiriman Udara", desc: "Prioritas pengiriman cepat dan aman untuk kargo yang sensitif terhadap waktu dengan jadwal keberangkatan harian." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Customs Clearance", desc: "Penanganan kepabeanan yang profesional untuk memastikan barang Anda lolos inspeksi dengan mematuhi regulasi." },
    { icon: <Building className="w-6 h-6" />, title: "Pergudangan", desc: "Fasilitas penyimpanan modern dengan sistem manajemen inventaris (WMS) yang terintegrasi secara real-time." },
    { icon: <Package className="w-6 h-6" />, title: "Distribusi Barang", desc: "Layanan logistik end-to-end dari pelabuhan hingga ke tangan penerima akhir (last-mile delivery)." },
    { icon: <Truck className="w-6 h-6" />, title: "Trucking", desc: "Armada truk darat yang handal untuk distribusi domestik dengan pemantauan lokasi menggunakan GPS tracker." },
  ];

  return (
    <section id="layanan" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">Layanan Kami</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
            Infrastruktur Logistik Terpadu
          </h2>
          <p className="text-gray-600 font-light">
            Portofolio layanan komprehensif kami dirancang untuk menangani seluruh aspek rantai pasok Anda, memberikan ketenangan pikiran dalam mengeksekusi bisnis global.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <div key={idx} className="group border border-gray-100 hover:border-brand-yellow/50 bg-white p-6 lg:p-8 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
               <div className="w-12 h-12 bg-soft-gray group-hover:bg-brand-yellow flex items-center justify-center text-dark-gray group-hover:text-white transition-colors mb-4 lg:mb-6 duration-300">
                 {svc.icon}
               </div>
               <h4 className="text-xl font-bold mb-3 text-charcoal">{svc.title}</h4>
               <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
                 {svc.desc}
               </p>
               <a href="#" className="inline-flex items-center text-sm font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors">
                 Pelajari lebih lanjut <ChevronRight className="w-4 h-4 ml-1" />
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
  return (
    <section className="py-16 md:py-20 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">Business Insights</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Kinerja Berbasis Data
            </h2>
            <p className="text-gray-400 font-light mb-8">
              Kami memonitor setiap pergerakan kargo secara presisi. Transparansi data operasional memberikan kepercayaan bagi mitra kami bahwa distribusi barang ditangani dengan standar enterprise.
            </p>
            
            <div className="space-y-6">
              <div className="p-5 border border-gray-700 bg-gray-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-300">Akurasi Pengiriman</span>
                  <span className="text-brand-yellow font-bold text-xl">98.5%</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5">
                  <div className="bg-brand-yellow h-1.5" style={{ width: '98.5%' }}></div>
                </div>
              </div>
              
              <div className="p-5 border border-gray-700 bg-gray-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-300">Kapasitas Distribusi (Tonase)</span>
                  <span className="text-brand-yellow font-bold text-xl">150K+</span>
                </div>
                <div className="w-full bg-gray-700 h-1.5">
                  <div className="bg-brand-yellow h-1.5" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 p-6 md:p-8 relative">
            <h4 className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">Distribusi Wilayah Tujuan</h4>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={routeData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
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
  return (
    <section id="jaringan-global" className="py-16 md:py-20 bg-soft-gray overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-sm font-bold text-brand-yellow uppercase tracking-widest mb-3">Jaringan Global</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
            Konektivitas Tanpa Batas
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
                <span className="text-xs text-gray-500 uppercase">Hub Center</span>
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
                <span className="text-xs text-gray-500 uppercase">Port Cabang</span>
             </div>
             <div className="flex flex-col items-center bg-white p-4 shadow-sm border border-gray-100">
                <MapPin className="text-dark-gray w-8 h-8 mb-2" />
                <span className="font-bold text-lg">Rotterdam, NL</span>
                <span className="text-xs text-gray-500 uppercase">Port Cabang</span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// 8. Why Us
const WhyUs = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6 lg:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-4 lg:p-6">
             <Clock className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow mx-auto mb-3 lg:mb-4" />
             <h4 className="text-base lg:text-lg font-bold mb-2">Tepat Waktu</h4>
             <p className="text-sm text-gray-500 font-light">Komitmen kuat pada jadwal keberangkatan dan kedatangan.</p>
          </div>
          <div className="p-4 lg:p-6">
             <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow mx-auto mb-3 lg:mb-4" />
             <h4 className="text-base lg:text-lg font-bold mb-2">Aman & Terlindungi</h4>
             <p className="text-sm text-gray-500 font-light">Asuransi kargo dan pengawasan terpadu untuk setiap rute.</p>
          </div>
          <div className="p-4 lg:p-6">
             <Users className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow mx-auto mb-3 lg:mb-4" />
             <h4 className="text-base lg:text-lg font-bold mb-2">Pelayanan Profesional</h4>
             <p className="text-sm text-gray-500 font-light">Tim operasional dedikasi yang selalu siap membantu 24/7.</p>
          </div>
          <div className="p-4 lg:p-6">
             <BarChart3 className="w-8 h-8 lg:w-10 lg:h-10 text-brand-yellow mx-auto mb-3 lg:mb-4" />
             <h4 className="text-base lg:text-lg font-bold mb-2">Sistem Enterprise</h4>
             <p className="text-sm text-gray-500 font-light">Teknologi pemantauan logistik mutakhir.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 9. CTA
const CTA = () => {
  return (
    <section className="py-16 md:py-20 bg-brand-yellow relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Siap Mengembangkan Distribusi Global Anda?
        </h2>
        <p className="text-brand-yellow-hover font-medium mb-10 max-w-2xl mx-auto text-lg text-white">
          Konsultasikan kebutuhan logistik perusahaan Anda dengan para ahli kami dan temukan solusi pengiriman terbaik.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-charcoal text-white px-8 py-4 font-bold hover:bg-gray-800 transition-colors">
            Konsultasi Sekarang
          </button>
          <button className="bg-transparent border-2 border-charcoal text-charcoal px-8 py-4 font-bold hover:bg-charcoal hover:text-white transition-colors">
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  );
};

// 10. Footer
const Footer = () => {
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
                Perusahaan penyedia solusi export import dan logistik terkemuka di Indonesia, mendukung pergerakan logistik global secara efisien.
              </p>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6 tracking-wide">Perusahaan</h4>
             <ul className="space-y-3">
               <li><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">Tentang Kami</a></li>
               <li><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">Layanan</a></li>
               <li><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">Jaringan Global</a></li>
               <li><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">Karir</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6 tracking-wide">Layanan Utama</h4>
             <ul className="space-y-3">
               <li><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">Pengiriman Laut FCL/LCL</a></li>
               <li><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">Kargo Udara</a></li>
               <li><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">Customs Clearance</a></li>
               <li><a href="#" className="text-gray-400 hover:text-brand-yellow text-sm font-light transition-colors">Manajemen Pergudangan</a></li>
             </ul>
          </div>

          <div>
             <h4 className="font-bold text-lg mb-6 tracking-wide">Kantor Pusat</h4>
             <address className="not-italic text-sm text-gray-400 font-light space-y-4">
               <div>
                 <strong className="block text-gray-300 mb-1">Jakarta, Indonesia</strong>
                 Gedung Logistik Sentral Lt. 12<br />
                 Jl. Pelabuhan Tanjung Priok No.45<br />
                 Jakarta Utara, 14310
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
          © 2026 Nusantara Logistik Perdana. Hak Cipta Dilindungi Undang-Undang.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">Privasi</a>
          <a href="#" className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">Syarat & Ketentuan</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
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
}

