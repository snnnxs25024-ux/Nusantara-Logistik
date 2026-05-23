import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cookie, ArrowRight, ShieldCheck, Check } from 'lucide-react';

type ConsentSettings = {
  necessary: boolean; // Always true
  performance: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultSettings: ConsentSettings = {
  necessary: true,
  performance: false,
  functional: false,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>(defaultSettings);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie_consent');
    if (hasConsented) {
      try {
        setSettings(JSON.parse(hasConsented));
      } catch (e) {
        // Fallback
      }
    } else {
      setTimeout(() => setShowBanner(true), 1500); // Small delay before showing
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      performance: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleStrictlyNecessary = () => {
    saveConsent(defaultSettings);
  };

  const handleSaveSettings = () => {
    saveConsent(settings);
  };

  const saveConsent = (newSettings: ConsentSettings) => {
    localStorage.setItem('cookie_consent', JSON.stringify(newSettings));
    setSettings(newSettings);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleToggle = (key: keyof ConsentSettings) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-7xl mx-auto bg-charcoal text-white rounded-sm shadow-2xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6 relative overflow-hidden">
                {/* Yellow accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow"></div>
              
              <div className="flex-1 max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                    <Cookie className="w-6 h-6 text-brand-yellow" />
                    <h3 className="text-xl font-bold font-display uppercase tracking-widest text-brand-yellow">Persutujuan Data & Cookie</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-light">
                  Website ini menggunakan cookie dan teknologi serupa untuk menyediakan pengalaman online yang optimal dan menyesuaikan konten sesuai minat Anda. Dengan mengklik "Terima Semua", Anda menyetujui penyimpanan cookie di perangkat Anda untuk meningkatkan navigasi situs, menganalisis penggunaan situs, dan mendukung upaya pemasaran kami. Untuk menyesuaikan preferensi Anda, klik "Pengaturan Consent".
                </p>
                <div className="mt-2 text-xs text-gray-400">
                    Pelajari lebih lanjut di <a href="#" className="underline hover:text-white transition-colors">Kebijakan Privasi</a> dan <a href="#" className="underline hover:text-white transition-colors">Ketentuan Layanan</a> kami.
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-2.5 bg-transparent border border-gray-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 hover:border-gray-500 transition-colors rounded-sm whitespace-nowrap"
                >
                  Pengaturan Consent
                </button>
                <button
                  onClick={handleStrictlyNecessary}
                  className="px-6 py-2.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors rounded-sm whitespace-nowrap"
                >
                  Hanya yang Diperlukan
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 bg-brand-yellow text-charcoal text-xs font-bold uppercase tracking-widest hover:bg-brand-yellow-hover transition-colors rounded-sm shadow-lg whitespace-nowrap"
                >
                  Terima Semua
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
              onClick={() => {
                if(!localStorage.getItem('cookie_consent')) setShowBanner(true);
                setShowSettings(false);
              }}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-charcoal text-white p-6 relative">
                 {/* Yellow accent bar */}
                 <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow"></div>
                <button 
                  onClick={() => {
                    if(!localStorage.getItem('cookie_consent')) setShowBanner(true);
                    setShowSettings(false);
                  }}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold font-display tracking-wide mb-2 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-yellow" />
                    Manajemen Preferensi Consent
                </h2>
                <p className="text-sm text-gray-400 font-light pr-8">
                  Kustomisasi preferensi cookie Anda di bawah ini. Cookie yang Sangat Diperlukan selalu aktif untuk memastikan situs berfungsi dengan baik.
                </p>
              </div>

              {/* Body */}
              <div className="overflow-y-auto p-6 space-y-4 bg-gray-50 flex-1">
                {/* Necessary */}
                <div className="bg-white border text-left border-gray-200 rounded-sm p-4 w-full cursor-not-allowed">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-charcoal text-sm uppercase tracking-wide">Teknologi yang Sangat Diperlukan</h3>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest flex items-center gap-1">
                        <Check className="w-3 h-3" /> Selalu Aktif
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-light">
                    Teknologi ini diperlukan agar inti dari situs web kami dapat berfungsi dengan baik, seperti keamanan, login, dan keranjang belanja.
                  </p>
                </div>

                {/* Performance */}
                <div onClick={() => handleToggle('performance')} className="bg-white border border-gray-200 rounded-sm p-4 w-full cursor-pointer hover:border-brand-yellow transition-colors group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-charcoal text-sm uppercase tracking-wide group-hover:text-brand-yellow transition-colors">Teknologi Performa (Performance)</h3>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.performance ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.performance ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-light">
                    Membantu kami memahami bagaimana pengunjung berinteraksi dengan situs web dengan mengumpulkan dan melaporkan informasi secara anonim.
                  </p>
                </div>

                {/* Functional */}
                <div onClick={() => handleToggle('functional')} className="bg-white border border-gray-200 rounded-sm p-4 w-full cursor-pointer hover:border-brand-yellow transition-colors group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-charcoal text-sm uppercase tracking-wide group-hover:text-brand-yellow transition-colors">Teknologi Fungsional (Functional)</h3>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.functional ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.functional ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-light">
                    Memungkinkan situs web untuk menyediakan fungsionalitas dan personalisasi yang ditingkatkan, seperti menyimpan preferensi bahasa.
                  </p>
                </div>

                {/* Analytics */}
                <div onClick={() => handleToggle('analytics')} className="bg-white border border-gray-200 rounded-sm p-4 w-full cursor-pointer hover:border-brand-yellow transition-colors group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-charcoal text-sm uppercase tracking-wide group-hover:text-brand-yellow transition-colors">Teknologi Analitik (Analytics)</h3>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.analytics ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.analytics ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-light">
                    Menganalisis lalu lintas untuk membantu kami meningkatkan desain konten, memahami halaman yang paling banyak dikunjungi.
                  </p>
                </div>

                {/* Marketing */}
                <div onClick={() => handleToggle('marketing')} className="bg-white border border-gray-200 rounded-sm p-4 w-full cursor-pointer hover:border-brand-yellow transition-colors group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-charcoal text-sm uppercase tracking-wide group-hover:text-brand-yellow transition-colors">Teknologi Pemasaran (Marketing)</h3>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.marketing ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.marketing ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-light">
                    Digunakan untuk melacak pengunjung di seluruh situs web untuk menampilkan iklan yang relevan dan menarik bagi pengguna secara individu.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
                 <button
                  onClick={handleSaveSettings}
                  className="px-6 py-3 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors rounded-sm shadow-sm w-full sm:w-auto"
                >
                  Konfirmasi Pilihan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
