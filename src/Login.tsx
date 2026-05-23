import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, Lock, LogIn, Anchor, KeyRound, Send, UserPlus, FileText, Phone, CreditCard, Building, MapPin, User, FileDigit, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile';

const Login = () => {
  const [view, setView] = useState<'login' | 'forgot-password' | 'register'>('login');
  
  // Login & Forgot Password state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  // Register state
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  
  // Detailed Address State
  const [addressLine, setAddressLine] = useState('');
  const [rt, setRt] = useState('');
  const [rw, setRw] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kota, setKota] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kodePos, setKodePos] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true' || sessionStorage.getItem('isAuthenticated') === 'true';
    if (isAuth) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaVerified) {
      setError('Harap selesaikan verifikasi captcha.');
      return;
    }
    if (email === 'admin@gmail.com' && password === 'admin123') {
      setError('');
      if (rememberMe) {
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        sessionStorage.setItem('isAuthenticated', 'true');
      }
      navigate('/dashboard');
    } else {
      setError('Email atau password salah');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset link
    setIsResetSent(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Register logic here
    console.log({ 
      fullName, nik, whatsapp, bankAccount, bankName, accountHolderName, 
      address: { addressLine, rt, rw, kelurahan, kecamatan, kota, provinsi, kodePos }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal relative overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src="/Video Project.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-charcoal/80 mix-blend-multiply pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Back Button */}
        <div className="w-full flex justify-start mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors bg-white/5 px-4 py-2 rounded-sm backdrop-blur-sm border border-white/10">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Beranda</span>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {view === 'login' ? (
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 pb-6 text-center border-b border-gray-100">
                <div className="w-28 h-28 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img src="https://i.imgur.com/QN8Pxlv.png" alt="PT TRIBUANA CARGO INDONESIA" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-1 font-display uppercase tracking-tight">TRIBUANA CARGO</h2>
                <h3 className="text-sm font-bold text-gray-400 mb-2 font-display">PT TRIBUANA CARGO INDONESIA</h3>
                <p className="text-xs text-gray-500 font-light italic">"Solusi Logistik Terpercaya"</p>
              </div>

              <div className="p-8 pt-6">
                <form onSubmit={handleLogin} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-sm">
                      {error}
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-charcoal" htmlFor="email">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                        placeholder="nama@perusahaan.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-charcoal" htmlFor="password">Password</label>
                      <button type="button" onClick={() => { setView('forgot-password'); setIsResetSent(false); }} className="text-xs font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors">Lupa Password?</button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-yellow focus:ring-brand-yellow"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                      Ingat Saya
                    </label>
                  </div>

                  <div className="flex justify-center my-4">
                    <Turnstile
                      siteKey="0x4AAAAAADUi0iOB4TrrBC1B"
                      onSuccess={() => setIsCaptchaVerified(true)}
                      onError={() => setIsCaptchaVerified(false)}
                      onExpire={() => setIsCaptchaVerified(false)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-charcoal hover:bg-gray-800 text-white p-3 font-bold transition-colors rounded-sm"
                  >
                    <LogIn className="w-4 h-4" /> Masuk
                  </button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500 font-light">Atau lanjutkan dengan</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 shadow-sm bg-white text-sm font-semibold text-charcoal hover:bg-soft-gray transition-colors rounded-sm"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Masuk dengan Google
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-soft-gray p-6 text-center border-t border-gray-100 mt-2">
                <p className="text-sm text-gray-600 font-light">
                  Belum memiliki akun?{' '}
                  <button onClick={() => setView('register')} className="font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors">
                    Daftar sekarang
                  </button>
                </p>
              </div>
            </motion.div>
          ) : view === 'forgot-password' ? (
            <motion.div 
              key="forgot-password"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 pb-6 text-center border-b border-gray-100 relative">
                <button 
                  onClick={() => setView('login')}
                  className="absolute left-6 top-8 text-gray-400 hover:text-charcoal transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-4 rounded-sm">
                  <KeyRound className="text-charcoal w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-2 font-display">Lupa Password</h2>
                <p className="text-sm text-gray-500 font-light">Masukkan email Anda. Kami akan mengirimkan tautan untuk mengatur ulang password.</p>
              </div>

              <div className="p-8 pt-6">
                {!isResetSent ? (
                  <form onSubmit={handleResetPassword} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-charcoal" htmlFor="reset-email">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="reset-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="nama@perusahaan.com"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-white p-3 font-bold transition-colors rounded-sm"
                    >
                      <Send className="w-4 h-4" /> Kirim Tautan Reset
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 flex items-center justify-center rounded-full mx-auto mb-4">
                      <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-charcoal mb-2">Periksa Email Anda</h3>
                    <p className="text-sm text-gray-500 font-light mb-6">
                      Kami telah mengirimkan tautan reset password ke <span className="font-semibold text-charcoal">{email}</span>. Silakan periksa inbox atau folder spam Anda.
                    </p>
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="w-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-charcoal p-3 font-bold transition-colors rounded-sm"
                    >
                      Kembali ke Login
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg bg-white rounded-sm shadow-2xl overflow-hidden my-8"
            >
              {/* Header */}
              <div className="p-8 pb-6 text-center border-b border-gray-100 relative">
                <button 
                  onClick={() => setView('login')}
                  className="absolute left-6 top-8 text-gray-400 hover:text-charcoal transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-4 rounded-sm">
                  <UserPlus className="text-charcoal w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-2 font-display">Pendaftaran Akun Baru</h2>
                <p className="text-sm text-gray-500 font-light">Lengkapi data diri Anda di bawah ini untuk mendaftar</p>
              </div>

              <div className="p-8 pt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-yellow" /> Data Diri
                    </h3>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-charcoal" htmlFor="fullName">Nama Lengkap</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="Nama Lengkap sesuai KTP"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-charcoal" htmlFor="nik">NIK KTP</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileDigit className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="nik"
                          type="text"
                          required
                          value={nik}
                          onChange={(e) => setNik(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="16 digit NIK"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-charcoal" htmlFor="whatsapp">Nomor WA</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="whatsapp"
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="Contoh: 08123456789"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-gray-100 pt-4 mt-2">
                    <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-yellow" /> Alamat Lengkap
                    </h3>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal" htmlFor="addressLine">Jalan / Gedung</label>
                      <input
                        id="addressLine"
                        type="text"
                        required
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                        placeholder="Nama jalan, gedung, no. rumah"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-charcoal" htmlFor="rt">RT</label>
                        <input
                          id="rt"
                          type="text"
                          required
                          value={rt}
                          onChange={(e) => setRt(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="001"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-charcoal" htmlFor="rw">RW</label>
                        <input
                          id="rw"
                          type="text"
                          required
                          value={rw}
                          onChange={(e) => setRw(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="002"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-charcoal" htmlFor="kelurahan">Kelurahan / Desa</label>
                        <input
                          id="kelurahan"
                          type="text"
                          required
                          value={kelurahan}
                          onChange={(e) => setKelurahan(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="Kelurahan"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-charcoal" htmlFor="kecamatan">Kecamatan</label>
                        <input
                          id="kecamatan"
                          type="text"
                          required
                          value={kecamatan}
                          onChange={(e) => setKecamatan(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="Kecamatan"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-charcoal" htmlFor="kota">Kota / Kabupaten</label>
                        <input
                          id="kota"
                          type="text"
                          required
                          value={kota}
                          onChange={(e) => setKota(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="Kota"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-charcoal" htmlFor="provinsi">Provinsi</label>
                        <input
                          id="provinsi"
                          type="text"
                          required
                          value={provinsi}
                          onChange={(e) => setProvinsi(e.target.value)}
                          className="block w-full px-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="Provinsi"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-charcoal" htmlFor="kodePos">Kode Pos</label>
                      <input
                        id="kodePos"
                        type="text"
                        required
                        value={kodePos}
                        onChange={(e) => setKodePos(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                        placeholder="Kode Pos"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-gray-100 pt-4 mt-2">
                    <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-brand-yellow" /> Data Bank
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-charcoal" htmlFor="bankName">Jenis Bank</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="bankName"
                            type="text"
                            required
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                            placeholder="BCA, Mandiri, dll."
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-charcoal" htmlFor="bankAccount">Nomor Rekening</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CreditCard className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="bankAccount"
                            type="text"
                            required
                            value={bankAccount}
                            onChange={(e) => setBankAccount(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                            placeholder="Nomor rekening valid"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-charcoal" htmlFor="accountHolderName">Nama Penerima / Pemilik Rekening</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="accountHolderName"
                          type="text"
                          required
                          value={accountHolderName}
                          onChange={(e) => setAccountHolderName(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 bg-soft-gray text-charcoal focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-colors placeholder:text-gray-400 sm:text-sm rounded-sm"
                          placeholder="Atas nama di buku rekening"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 flex justify-center items-center gap-2 bg-charcoal hover:bg-gray-800 text-white p-3 font-bold transition-colors rounded-sm"
                  >
                    <UserPlus className="w-4 h-4" /> Daftar Sekarang
                  </button>
                </form>
              </div>
              
              <div className="bg-soft-gray p-6 text-center border-t border-gray-100 mt-2">
                <p className="text-sm text-gray-600 font-light">
                  Sudah memiliki akun?{' '}
                  <button onClick={() => setView('login')} className="font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors">
                    Masuk di sini
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer info minimal for login */}
        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 font-light">
              © {new Date().getFullYear()} PT TRIBUANA CARGO INDONESIA. All rights reserved.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
