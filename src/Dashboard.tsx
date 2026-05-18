import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Anchor, LayoutDashboard, Package, Truck, Users, Settings, 
  LogOut, Bell, Search, Menu, X, ArrowUpRight, ArrowDownRight,
  MapPin, Clock, BarChart3, CreditCard
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const deliveryData = [
  { name: 'Sen', volume: 120 },
  { name: 'Sel', volume: 180 },
  { name: 'Rab', volume: 150 },
  { name: 'Kam', volume: 220 },
  { name: 'Jum', volume: 280 },
  { name: 'Sab', volume: 160 },
  { name: 'Min', volume: 90 },
];

const resentShipments = [
  { id: 'SHP-9921', from: 'Jakarta', to: 'Surabaya', status: 'In Transit', date: 'Hari ini, 09:30' },
  { id: 'SHP-9922', from: 'Bandung', to: 'Makassar', status: 'Pending', date: 'Hari ini, 10:15' },
  { id: 'SHP-9923', from: 'Semarang', to: 'Medan', status: 'Delivered', date: 'Kemarin, 16:45' },
  { id: 'SHP-9924', from: 'Yogyakarta', to: 'Bali', status: 'In Transit', date: 'Kemarin, 14:20' },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-soft-gray flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-charcoal/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-yellow flex items-center justify-center rounded-sm">
              <Anchor className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-charcoal">NUSANTARA</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 overflow-y-auto">
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-brand-yellow/10 text-brand-yellow-hover rounded-sm font-medium">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-charcoal hover:bg-gray-50 rounded-sm font-medium transition-colors">
              <Package className="w-5 h-5" />
              <span>Pengiriman</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-charcoal hover:bg-gray-50 rounded-sm font-medium transition-colors">
              <Truck className="w-5 h-5" />
              <span>Armada</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-charcoal hover:bg-gray-50 rounded-sm font-medium transition-colors">
              <MapPin className="w-5 h-5" />
              <span>Lacak Posisi</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-charcoal hover:bg-gray-50 rounded-sm font-medium transition-colors">
              <Users className="w-5 h-5" />
              <span>Pelanggan</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-charcoal hover:bg-gray-50 rounded-sm font-medium transition-colors">
              <CreditCard className="w-5 h-5" />
              <span>Keuangan</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-charcoal hover:bg-gray-50 rounded-sm font-medium transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span>Laporan</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-gray-500 hover:text-charcoal hover:bg-gray-50 rounded-sm font-medium transition-colors">
              <Settings className="w-5 h-5" />
              <span>Pengaturan</span>
            </a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-red-500 hover:bg-red-50 rounded-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0">
          <div className="flex items-center flex-1">
            <button 
              className="p-2 -ml-2 mr-2 text-gray-500 hover:text-charcoal lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center max-w-md w-full relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3" />
              <input 
                type="text" 
                placeholder="Cari ID pengiriman, nama pelanggan, dll..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow rounded-sm text-sm transition-colors outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-charcoal transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-charcoal">Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-yellow text-white flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold text-charcoal">Ringkasan Dasbor</h1>
              <p className="text-sm text-gray-500">Pantau aktivitas logistik dan performa hari ini.</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Pengiriman</p>
                    <h3 className="text-2xl font-bold text-charcoal">1,248</h3>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-blue-50 flex items-center justify-center text-blue-600">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm">
                  <span className="text-green-600 flex items-center font-medium">
                    <ArrowUpRight className="w-4 h-4 mr-0.5" /> 12%
                  </span>
                  <span className="text-gray-400">vs bulan lalu</span>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Sedang Transit</p>
                    <h3 className="text-2xl font-bold text-charcoal">342</h3>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-brand-yellow/10 flex items-center justify-center text-brand-yellow-hover">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm">
                  <span className="text-amber-600 flex items-center font-medium">
                    <ArrowUpRight className="w-4 h-4 mr-0.5" /> 4%
                  </span>
                  <span className="text-gray-400">vs bulan lalu</span>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Masalah Tertunda</p>
                    <h3 className="text-2xl font-bold text-charcoal">18</h3>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-red-50 flex items-center justify-center text-red-600">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm">
                  <span className="text-green-600 flex items-center font-medium">
                    <ArrowDownRight className="w-4 h-4 mr-0.5" /> 8%
                  </span>
                  <span className="text-gray-400">vs bulan lalu</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Pendapatan (Juta)</p>
                    <h3 className="text-2xl font-bold text-charcoal">Rp 485.2</h3>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-green-50 flex items-center justify-center text-green-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm">
                  <span className="text-green-600 flex items-center font-medium">
                    <ArrowUpRight className="w-4 h-4 mr-0.5" /> 24%
                  </span>
                  <span className="text-gray-400">vs bulan lalu</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Chart */}
              <div className="bg-white p-5 sm:p-6 rounded-sm shadow-sm border border-gray-100 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-charcoal">Volume Aktivitas Mingguan</h3>
                  <select className="bg-gray-50 border-none text-sm text-gray-600 py-1.5 px-3 rounded-sm font-medium focus:ring-0 outline-none">
                     <option>7 Hari Terakhir</option>
                     <option>Bulan Ini</option>
                  </select>
                </div>
                <div className="h-72 w-full -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={deliveryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EAB308" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="volume" stroke="#EAB308" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white p-5 sm:p-6 rounded-sm shadow-sm border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-charcoal">Status Terbaru</h3>
                  <a href="#" className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-hover">Lihat Semua</a>
                </div>
                <div className="flex-1 space-y-4">
                  {resentShipments.map((shipment, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 bg-soft-gray rounded-sm border border-gray-100/50">
                      <div className={`p-2 rounded-sm ${
                        shipment.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                        shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                        <Package className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-semibold text-charcoal truncate">{shipment.id}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                             shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                             shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                             'bg-amber-100 text-amber-700'
                          }`}>
                            {shipment.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{shipment.from} → {shipment.to}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{shipment.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
