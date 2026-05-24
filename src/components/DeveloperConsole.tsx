import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, ShieldAlert, Database, Users, Cpu, Layers, Settings, LogOut, 
  RefreshCw, Search, Trash2, Play, CheckCircle2, HardDrive, Globe, 
  Activity, Wifi, Bell, Shield, ShieldCheck, Sliders, ChevronDown, Check, Info, FileCode, Monitor
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

interface DeveloperConsoleProps {
  handleLogout: () => void;
}

interface LogEntry {
  id: string;
  email: string;
  role: string;
  timestamp: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  userAgent: string;
}

export const DeveloperConsole = ({ handleLogout }: DeveloperConsoleProps) => {
  const [activeSubTab, setActiveSubTab] = useState<'status' | 'audit' | 'database' | 'notifications'>('status');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 24,
    memory: 68,
    dbLatency: 12,
    apiStatus: 'Operational'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    title: 'Simulasi Push Notifikasi',
    body: 'Notifikasi push berhasil terkirim ke perangkat ini!'
  });

  // Settings features state
  const [featureFlags, setFeatureFlags] = useState({
    bypassRecaptcha: false,
    debugMode: true,
    mockLocation: false,
    analyticsActive: true
  });

  // Load logs
  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    const savedLogs = localStorage.getItem('dev_login_logs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        setLogs([]);
      }
    } else {
      // Seed initial mock logs so the dashboard isn't blank
      const mockSeeds: LogEntry[] = [
        {
          id: 'LOG-3321',
          email: 'developer@gmail.com',
          role: 'developer',
          timestamp: '24 Mei 2026 12:47:11',
          ip: '180.244.135.228',
          city: 'Jakarta',
          region: 'DKI Jakarta',
          country: 'Indonesia',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        },
        {
          id: 'LOG-1210',
          email: 'admin@gmail.com',
          role: 'admin',
          timestamp: '24 Mei 2026 10:15:33',
          ip: '114.122.14.99',
          city: 'Surabaya',
          region: 'Jawa Timur',
          country: 'Indonesia',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0'
        },
        {
          id: 'LOG-8802',
          email: 'budi.santoso@gmail.com',
          role: 'user',
          timestamp: '23 Mei 2026 16:22:45',
          ip: '103.144.175.12',
          city: 'Bandung',
          region: 'Jawa Barat',
          country: 'Indonesia',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15'
        }
      ];
      localStorage.setItem('dev_login_logs', JSON.stringify(mockSeeds));
      setLogs(mockSeeds);
    }
  };

  const handleRefreshMetrics = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSystemMetrics({
        cpu: Math.floor(15 + Math.random() * 45),
        memory: Math.floor(55 + Math.random() * 25),
        dbLatency: Math.floor(8 + Math.random() * 10),
        apiStatus: 'Operational'
      });
      setIsRefreshing(false);
    }, 800);
  };

  const handleClearLogs = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua rekam log masuk?')) {
      localStorage.removeItem('dev_login_logs');
      setLogs([]);
    }
  };

  const handleMockNotification = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNotificationPopup(true);
    setTimeout(() => {
      setShowNotificationPopup(false);
    }, 4500);
  };

  // Generate Recharts data
  const chartData = [
    { name: '12:00', load: 30, latency: 12 },
    { name: '12:10', load: 45, latency: 15 },
    { name: '12:20', load: 38, latency: 14 },
    { name: '12:30', load: 55, latency: 18 },
    { name: '12:40', load: systemMetrics.cpu, latency: systemMetrics.dbLatency },
  ];

  const filteredLogs = logs.filter(log => 
    log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col lg:flex-row font-sans">
      {/* Simulation Push Notification Portal */}
      <AnimatePresence>
        {showNotificationPopup && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 right-6 z-[100] max-w-sm w-full bg-neutral-900 border border-emerald-500/30 rounded-lg p-4 shadow-2xl backdrop-blur-md"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-400">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{notificationMessage.title}</span>
                  <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded uppercase">Baru</span>
                </h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {notificationMessage.body}
                </p>
                <div className="mt-3 flex items-center justify-end">
                  <button 
                    onClick={() => setShowNotificationPopup(false)}
                    className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider font-semibold"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar untuk Developer */}
      <aside className="w-full lg:w-64 bg-neutral-900 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-neutral-800 gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded flex items-center justify-center text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-sm tracking-wider text-white">DEV ACCESS</h1>
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Tribuana Engine</p>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-1">
          <div className="px-3 mb-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">
            Menu Kontroler
          </div>
          <button 
            onClick={() => setActiveSubTab('status')}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded font-mono text-xs text-left transition-colors ${activeSubTab === 'status' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
          >
            <Activity className="w-4 h-4" />
            <span>01. Status Sistem</span>
          </button>
          <button 
            onClick={() => setActiveSubTab('audit')}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded font-mono text-xs text-left transition-colors ${activeSubTab === 'audit' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
          >
            <Globe className="w-4 h-4" />
            <span>02. Audit Geomark</span>
          </button>
          <button 
            onClick={() => setActiveSubTab('database')}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded font-mono text-xs text-left transition-colors ${activeSubTab === 'database' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
          >
            <Database className="w-4 h-4" />
            <span>03. Data Explorer</span>
          </button>
          <button 
            onClick={() => setActiveSubTab('notifications')}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded font-mono text-xs text-left transition-colors ${activeSubTab === 'notifications' ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`}
          >
            <Bell className="w-4 h-4" />
            <span>04. Notifikasi Push</span>
          </button>
        </div>

        <div className="p-4 border-t border-neutral-800 space-y-3">
          <div className="bg-neutral-950 p-3 rounded border border-neutral-800 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-[10px] font-mono text-neutral-400 leading-tight">
              <span className="block text-white font-bold">MODE DEVELOPMENT</span>
              <span>Host Intern / SSL Akses</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded font-mono text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Panel</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        {/* Top bar header info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-4">
          <div>
            <h2 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
              <span>Developer Panel Console</span>
              <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-normal uppercase tracking-widest">ROOT</span>
            </h2>
            <p className="text-xs text-neutral-400">Panel khusus developper untuk uji tanding performa, audit sesi log, dan status.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-500">API Latensi: {systemMetrics.dbLatency}ms</span>
            <button 
              onClick={handleRefreshMetrics}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white px-3 py-1.5 text-xs font-mono rounded hover:bg-neutral-800 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'MEMUAT...' : 'REFRESH METRIC'}</span>
            </button>
          </div>
        </div>

        {/* 1. STATUS TAB */}
        {activeSubTab === 'status' && (
          <div className="space-y-6">
            {/* Bento Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">CPU UTILIZATION</span>
                  <h3 className="text-2xl font-mono font-bold text-emerald-400">{systemMetrics.cpu}%</h3>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-4">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${systemMetrics.cpu}%` }}></div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">MEMORY USAGE</span>
                  <h3 className="text-2xl font-mono font-bold text-amber-500">{systemMetrics.memory}%</h3>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-4">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${systemMetrics.memory}%` }}></div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">SIMULATED DATA DB</span>
                  <h3 className="text-2xl font-mono font-bold text-emerald-400">{systemMetrics.apiStatus}</h3>
                </div>
                <p className="text-[10px] text-neutral-500 mt-4 leading-none">Status: Siaga Operasional</p>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">LOGGED SESSIONS</span>
                  <h3 className="text-2xl font-mono font-bold text-white">{logs.length} Log</h3>
                </div>
                <p className="text-[10px] text-neutral-500 mt-4 leading-none">Database Audit: OK</p>
              </div>
            </div>

            {/* Performance charts view */}
            <div className="bg-neutral-900/30 border border-neutral-800 p-6 rounded">
              <h3 className="text-xs font-mono font-bold uppercase text-neutral-400 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Simulasi Real-Time CPU & Latensi G-Engine</span>
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis dataKey="name" stroke="#525252" fontSize={11} fontFamily="monospace" />
                    <YAxis stroke="#525252" fontSize={11} fontFamily="monospace" />
                    <Tooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', color: '#fff' }} />
                    <Area type="monotone" dataKey="load" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" name="Load %" />
                    <Area type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorLatency)" name="Latensi (ms)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Feature Flags */}
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Bypass & Feature Flag Kontroler (Local Toggle)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: 'bypassRecaptcha',
                    title: 'Bypass Captcha Verification',
                    desc: 'Lewati verifikasi reCaptcha saat proses login untuk mempercepat testing.',
                    status: featureFlags.bypassRecaptcha
                  },
                  {
                    key: 'debugMode',
                    title: 'Force App Debug Logs',
                    desc: 'Output debug info secara mendalam pada console pengembang.',
                    status: featureFlags.debugMode
                  },
                  {
                    key: 'mockLocation',
                    title: 'Simulasi Overwrite Lokasi',
                    desc: 'Paksa data lokasi koordinat palsu di peta pelacakan.',
                    status: featureFlags.mockLocation
                  },
                  {
                    key: 'analyticsActive',
                    title: 'Kamera & Cookies Telemetry',
                    desc: 'Aktifkan telemetry pelaporan untuk Cookies Consent dan PWA.',
                    status: featureFlags.analyticsActive
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-800 rounded">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-white">{item.title}</h4>
                      <p className="text-[10px] text-neutral-400 mt-1">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => setFeatureFlags(prev => ({ ...prev, [item.key]: !prev.status }))}
                      className={`w-11 h-6 rounded-full p-1 transition-colors ${item.status ? 'bg-emerald-500' : 'bg-neutral-800'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.status ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. AUDIT LOG GEOMARK TAB */}
        {activeSubTab === 'audit' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900/30 border border-neutral-800 p-4 rounded">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Filter berdasarkan email, IP, atau kota..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 text-xs text-white pl-9 pr-4 py-2 rounded focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={loadLogs}
                  className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 px-3 py-1.5 text-xs font-mono rounded text-neutral-300"
                >
                  Segarkan Log
                </button>
                <button 
                  onClick={handleClearLogs}
                  className="bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 px-3 py-1.5 text-xs font-mono rounded text-red-400 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Semua Log</span>
                </button>
              </div>
            </div>

            <div className="bg-neutral-900/30 border border-neutral-800 rounded overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-800 bg-neutral-900/50 flex justify-between items-center bg-gradient-to-r from-neutral-900 to-neutral-800">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Daftar Audit Keamanan & Lokasi Login User (Geomark IP)</span>
                </h3>
                <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                  {filteredLogs.length} Entri Ditemukan
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-neutral-950 text-neutral-500 border-b border-neutral-800">
                      <th className="px-6 py-3 font-normal">Sesi ID</th>
                      <th className="px-6 py-3 font-normal">Email Akun</th>
                      <th className="px-6 py-3 font-normal">Hak Akses</th>
                      <th className="px-6 py-3 font-normal">Waktu Masuk</th>
                      <th className="px-6 py-3 font-normal">IP Address</th>
                      <th className="px-6 py-3 font-normal">Lokasi</th>
                      <th className="px-6 py-3 font-normal">Browser / OS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/50">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-neutral-900/30 text-neutral-300">
                        <td className="px-6 py-4 font-bold text-neutral-500">{log.id}</td>
                        <td className="px-6 py-4 text-white font-bold">{log.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${log.role === 'developer' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : log.role === 'admin' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20' : 'bg-neutral-700 text-neutral-300'}`}>
                            {log.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-400">{log.timestamp}</td>
                        <td className="px-6 py-4 text-teal-400 font-bold">{log.ip}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-white">
                            <span className="w-2 h-2 rounded-full bg-red-500 block" />
                            <span>{log.city}, {log.region} ({log.country})</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[10px] text-neutral-500 max-w-xs truncate" title={log.userAgent}>
                          {log.userAgent}
                        </td>
                      </tr>
                    ))}
                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-neutral-500 italic">
                          Tidak ditemukan rekam data login yang cocok dengan filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-neutral-950 p-4 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Bagaimana Lokasi Diperoleh?</strong> Sistem memproses alamat IP publik pengirim saat mengeklik tombol login di halaman masuk utama, kemudian me-resolvenya lewat query real-time penyedia API Geolocation (ipapi.co). Fallback default akan aktif jika browser pengguna mengalami pembatasan CORS atau pemblokiran iklan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. STORAGE EXPLORER TAB */}
        {activeSubTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded text-xs text-yellow-300 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-1">Peringatan Akses Database Explorer</h4>
                <p className="leading-relaxed">Modul ini membaca tabel model data yang tersimpan di ruang memori klien lokal (localStorage). Menghapus database di bawah ini akan mengatur ulang sistem Tribuana ke template bawaan awal.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Docs Count */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-5 rounded space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-mono font-bold text-white">Database Dokumen (tribuana_docs)</h4>
                  </div>
                  <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded font-mono text-neutral-400">Aktif</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">Menyimpan daftar manifes pelayaran, Bill of Lading (B/L), faktur invoice, surat jalan, dan lisensi/izin kapal PT Tribuana Cargo Indonesia.</p>
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    onClick={() => {
                      const docs = localStorage.getItem('tribuana_docs');
                      if (docs) {
                        alert(JSON.stringify(JSON.parse(docs), null, 2));
                      } else {
                        alert('Tidak ada dokumen yang tersimpan');
                      }
                    }}
                    className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs font-mono py-1.5 px-3 rounded text-neutral-300"
                  >
                    Tampilkan JSON Raw
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Atur ulang seluruh dokumen kembali ke bawaan pabrik?')) {
                        localStorage.removeItem('tribuana_docs');
                        window.location.reload();
                      }
                    }}
                    className="bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-xs font-mono py-1.5 px-3 rounded text-red-400"
                  >
                    Format Ulang Tabel
                  </button>
                </div>
              </div>

              {/* Cookie Consent Checker */}
              <div className="bg-neutral-900/50 border border-neutral-800 p-5 rounded space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-500" />
                    <h4 className="text-sm font-mono font-bold text-white">Status Prefs Cookies (cookie-consent)</h4>
                  </div>
                  <span className="text-xs bg-neutral-800 px-2 py-0.5 rounded font-mono text-neutral-400">Aktif</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  Isi Storage Cookie-Consent:
                  <code className="block bg-neutral-950 p-2 rounded text-[10px] text-amber-400 mt-2 overflow-x-auto">
                    {localStorage.getItem('cookieConsent') || 'Belum di-set (default popup ditolak)'}
                  </code>
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    onClick={() => {
                      localStorage.removeItem('cookieConsent');
                      alert('Status persetujuan cookie berhasil dihapus. Banner cookie akan muncul kembali saat re-render.');
                      window.location.reload();
                    }}
                    className="bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-xs font-mono py-1.5 px-3 rounded text-red-400 w-full"
                  >
                    Reset Persetujuan Cookie
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. NOTIFICATION CENTER */}
        {activeSubTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-neutral-900/30 border border-neutral-800 p-6 rounded max-w-2xl">
              <h3 className="text-sm font-mono font-bold uppercase text-white mb-2 ml-0.5 flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" />
                <span>Simulasi Konsol Push Notifikasi</span>
              </h3>
              <p className="text-xs text-neutral-400 mb-6">Berikut adalah area simulasi Push Notification lokal untuk melihat perilaku dan letak trigger popup atau toast.</p>

              <form onSubmit={handleMockNotification} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-500 tracking-wider">Judul Notifikasi</label>
                  <input 
                    type="text" 
                    value={notificationMessage.title}
                    onChange={(e) => setNotificationMessage(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 focus:outline-none p-2.5 text-xs text-white rounded font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-neutral-500 tracking-wider">Pesan Notifikasi (Body)</label>
                  <textarea 
                    value={notificationMessage.body}
                    onChange={(e) => setNotificationMessage(prev => ({ ...prev, body: e.target.value }))}
                    rows={3}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 focus:outline-none p-2.5 text-xs text-white rounded font-mono"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button 
                    type="submit"
                    className="bg-emerald-500 text-neutral-950 px-6 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Luncurkan Push Notif</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
