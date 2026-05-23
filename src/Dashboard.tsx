import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Anchor, LayoutDashboard, Package, Truck, Users, Settings, 
  LogOut, Bell, Search, Menu, X, ArrowUpRight, ArrowDownRight,
  MapPin, Clock, BarChart3, Plus, Filter, ChevronRight,
  Ship, Plane, Info, CheckCircle2, AlertCircle, RefreshCw,
  FileText, ChevronDown, ChevronUp, Download, Eye, FileSpreadsheet, FileArchive, File,
  Edit, Trash2, Printer, Check, XCircle, Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const deliveryData = [
  { name: 'Sen', volume: 120, revenue: 45 },
  { name: 'Sel', volume: 180, revenue: 52 },
  { name: 'Rab', volume: 150, revenue: 48 },
  { name: 'Kam', volume: 220, revenue: 61 },
  { name: 'Jum', volume: 280, revenue: 75 },
  { name: 'Sab', volume: 160, revenue: 58 },
  { name: 'Min', volume: 90, revenue: 32 },
];

const resentShipments = [
  { id: 'SHP-9921', from: 'Jakarta', to: 'Surabaya', status: 'In Transit', date: 'Hari ini, 09:30', weight: '2.5 Ton' },
  { id: 'SHP-9922', from: 'Bandung', to: 'Makassar', status: 'Pending', date: 'Hari ini, 10:15', weight: '1.2 Ton' },
  { id: 'SHP-9923', from: 'Semarang', to: 'Medan', status: 'Delivered', date: 'Kemarin, 16:45', weight: '500 Kg' },
  { id: 'SHP-9924', from: 'Yogyakarta', to: 'Bali', status: 'In Transit', date: 'Kemarin, 14:20', weight: '3.1 Ton' },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isNewShipmentModalOpen, setIsNewShipmentModalOpen] = useState(false);
  
  // Document CRUD State
  const [activeDocs, setActiveDocs] = useState<any>(() => {
    const saved = localStorage.getItem('tribuana_docs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      'docs-manifest': [
        { id: 'MNF-2024-001', name: 'Manifest Pelayaran Jawa-Sumatera', date: '15 Mei 2026', size: '1.2 MB', type: 'PDF', status: 'Verified' },
        { id: 'MNF-2024-002', name: 'Manifest Ekspor Batam-Singapore', date: '14 Mei 2026', size: '850 KB', type: 'Excel', status: 'Pending' },
        { id: 'MNF-2024-003', name: 'Manifest Domestik Surabaya-Makassar', date: '12 Mei 2026', size: '2.1 MB', type: 'PDF', status: 'Verified' },
      ],
      'docs-bol': [
        { id: 'BOL-55219', name: 'B/L - PT. Maju Bersama (JKT-SRB)', date: '16 Mei 2026', size: '450 KB', type: 'PDF', status: 'Verified' },
        { id: 'BOL-55220', name: 'B/L - CV. Global Tekno (MDN-JKT)', date: '15 Mei 2026', size: '420 KB', type: 'PDF', status: 'Verified' },
      ],
      'docs-invoice': [
        { id: 'INV-88210', name: 'Komersial Invoice #88210 - Indo Food', date: '16 Mei 2026', size: '120 KB', type: 'PDF', status: 'Paid' },
        { id: 'INV-88211', name: 'Tagihan Layanan Logistik Q2', date: '10 Mei 2026', size: '310 KB', type: 'Excel', status: 'Overdue' },
      ],
      'docs-sj': [
        { id: 'SJ-9901', name: 'Surat Jalan G-001 (Cakung - Priok)', date: '17 Mei 2026', size: '95 KB', type: 'PDF', status: 'In Transit' },
        { id: 'SJ-9902', name: 'Surat Jalan G-002 (Balaraja)', date: '17 Mei 2026', size: '102 KB', type: 'PDF', status: 'Pending' },
      ],
      'docs-izin': [
        { id: 'LIC-001', name: 'Izin Trayek Alur Laut Tribuana', date: 'Berlaku s/d 2028', size: '4.5 MB', type: 'PDF', status: 'Active' },
        { id: 'LIC-002', name: 'Sertifikasi ISO 9001:2015 Logistik', date: 'Berlaku s/d 2027', size: '2.8 MB', type: 'PDF', status: 'Active' },
        { id: 'LIC-003', name: 'Izin Bongkar Muat B3', date: 'Berlaku s/d 2026', size: '1.2 MB', type: 'PDF', status: 'Expired' },
      ],
    };
  });

  const [notification, setNotification] = useState<{show: boolean, message: string, type: 'success'|'error'}>({show: false, message: '', type: 'success'});

  useEffect(() => {
    localStorage.setItem('tribuana_docs', JSON.stringify(activeDocs));
  }, [activeDocs]);

  const showNotification = (message: string, type: 'success'|'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };


  const [docModal, setDocModal] = useState<{isOpen: boolean, mode: 'add' | 'edit' | 'view', data: any, previewUrl?: string | null}>({
    isOpen: false,
    mode: 'view',
    data: null,
    previewUrl: null
  });

  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [selectedFleet, setSelectedFleet] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleDocAction = (action: 'add' | 'edit' | 'view' | 'delete', doc?: any) => {
    if (action === 'delete') {
      if (confirm(`Apakah Anda yakin ingin menghapus dokumen ${doc.id}?`)) {
        const category = activeTab;
        setActiveDocs((prev: any) => ({
          ...prev,
          [category]: prev[category].filter((d: any) => d.id !== doc.id)
        }));
        showNotification('Dokumen berhasil dihapus!', 'success');
      }
      return;
    }

    if (action === 'view') {
      setDocModal({ isOpen: true, mode: action, data: doc || null });
      return;
    }

    setDocModal({ isOpen: true, mode: action, data: doc || null });
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newDoc = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      date: formData.get('date') as string || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      size: formData.get('size') as string || '0 KB',
      type: formData.get('type') as string,
      status: formData.get('status') as string,
    };

    const category = activeTab;
    if (docModal.mode === 'add') {
      setActiveDocs((prev: any) => ({
        ...prev,
        [category]: [newDoc, ...(prev[category] || [])]
      }));
      showNotification('Dokumen baru berhasil ditambahkan!', 'success');
    } else {
      setActiveDocs((prev: any) => ({
        ...prev,
        [category]: (prev[category] || []).map((d: any) => d.id === docModal.data.id ? newDoc : d)
      }));
      showNotification('Dokumen berhasil diperbarui!', 'success');
    }
    setDocModal({ ...docModal, isOpen: false });
  };

  const getBase64ImageFromUrl = async (imageUrl: string): Promise<string | null> => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch(err) {
      console.error(err);
      return null;
    }
  };

  const generatePdfInstance = async (docItem?: any, activeTitle: string = '', activeDataArray: any[] = []) => {
    const doc = new jsPDF();
    
    let dataArray: any[] = [];
    if (docItem) {
      dataArray = [docItem];
    } else {
      dataArray = activeDataArray;
    }

    // ===== Corporate Header Styling =====
    doc.setFillColor(255, 255, 255); // bg-white
    doc.rect(0, 0, 210, 48, 'F');
    
    doc.setFillColor(253, 216, 53); // bg-brand-yellow
    doc.rect(0, 48, 210, 3, 'F');
    
    const logoBase64 = await getBase64ImageFromUrl('https://i.imgur.com/QN8Pxlv.png');
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 14, 10, 26, 26);
    } else {
      // --- Abstract Corporate Logo ---
      // Yellow top-left square
      doc.setFillColor(253, 216, 53);
      doc.rect(14, 15, 7, 7, 'F');
      // White surrounding squares representing cargo boxes
      doc.setFillColor(255, 255, 255);
      doc.rect(22, 15, 7, 7, 'F');
      doc.rect(14, 23, 7, 7, 'F');
      doc.rect(22, 23, 7, 7, 'F');
    }

    doc.setTextColor(31, 41, 55);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("TRIBUANA", 44, 23);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    doc.text("PT TRIBUANA CARGO INDONESIA", 44, 29);
    doc.setFontSize(9);
    doc.text("International Freight Forwarder & Logistics Provider", 44, 34);

    // Header Right Details
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("TANGGAL CETAK", 145, 20);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    doc.text(new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }), 145, 25);
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(107, 114, 128);
    doc.text("STATUS SISTEM", 145, 33);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(234, 179, 8); // text-yellow-500
    doc.text("Terverifikasi & Resmi", 145, 38);

    // ===== Title =====
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    
    let titleText = docItem ? `Detail Rekam Dokumen` : `Laporan Manajemen Dokumen`;
    doc.text(titleText, 14, 68);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);
    doc.text(docItem ? `ID Referensi: ${docItem.id}  —  Nama Form: ${docItem.name}` : `Kategori Modul: ${activeTitle}`, 14, 76);
    
    if (docItem) {
       // ===== Detail Box =====
       doc.setFillColor(249, 250, 251);
       doc.setDrawColor(220, 220, 220);
       doc.setLineWidth(0.5);
       doc.roundedRect(14, 85, 182, 85, 4, 4, 'FD');
       
       doc.setTextColor(31, 41, 55);
       doc.setFontSize(11);
       
       const labels = ['ID Dokumen', 'Nama Berkas', 'Kategori / Format', 'Status Validasi', 'Tanggal Diperbarui', 'Ukuran Berkas'];
       const values = [docItem.id, docItem.name, docItem.type, docItem.status, docItem.date, docItem.size];
       
       for (let i = 0; i < labels.length; i++) {
         // Zebra striping for lines
         if (i % 2 === 0) {
           doc.setFillColor(243, 244, 246);
           doc.rect(15, 87 + (i * 13), 180, 13, 'F');
         }
         doc.setFont("helvetica", "bold");
         doc.text(labels[i], 20, 95 + (i * 13));
         doc.setFont("helvetica", "normal");
         doc.text(`:   ${values[i]}`, 75, 95 + (i * 13));
       }
       
       // Watermark/Footer text
       doc.setFontSize(9);
       doc.setTextColor(150, 150, 150);
       doc.text("Dokumen ini valid dan diterbitkan oleh Sistem Logistik PT Tribuana Cargo Indonesia.", 14, 185);
       doc.text("Segala bentuk pemalsuan terhadap dokumen ini dapat ditindak sesuai dengan peraturan yang berlaku.", 14, 190);

    } else {
      // ===== Table Styling =====
      autoTable(doc, {
        startY: 85,
        head: [['ID Dokumen', 'Nama Berkas', 'Tanggal', 'Status', 'Tipe', 'Ukuran']],
        body: dataArray.map((d: any) => [d.id, d.name, d.date, d.status, d.type, d.size]),
        styles: { font: 'helvetica', fontSize: 9, cellPadding: 4 },
        headStyles: { fillColor: [31, 41, 55], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10 },
        alternateRowStyles: { fillColor: [249, 250, 251] },
        margin: { top: 85, left: 14, right: 14 }
      });
      
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("Laporan ini valid dan diterbitkan oleh Sistem Logistik PT Tribuana Cargo Indonesia.", 14, (doc as any).lastAutoTable.finalY + 15);
      doc.text("Segala bentuk perubahan data dapat dilacak melalui log aktivitas sistem internal.", 14, (doc as any).lastAutoTable.finalY + 20);
    }
    
    return doc;
  };

  const handleExport = (format: 'PDF' | 'EXCEL', docItem?: any) => {
    setIsExporting(format);
    
    setTimeout(async () => {
      try {
        const docTitles: any = {
          'docs-manifest': 'Manifest Kapal (Ship Manifest)',
          'docs-bol': 'Bill of Lading (B/L)',
          'docs-invoice': 'Invoice & Faktur Komersial',
          'docs-sj': 'Surat Jalan (Delivery Order)',
          'docs-izin': 'Izin Operasional & Sertifikasi',
        };
        const activeTitle = docTitles[activeTab] || 'Dokumen ' + activeTab;

        if (format === 'EXCEL') {
          let dataArray: any[] = [];
          if (docItem) {
            dataArray = [docItem];
          } else {
            dataArray = activeDocs[activeTab] || [];
          }
          
          const exportData = dataArray.map((d: any) => ({
            'ID Dokumen': d.id,
            'Nama Berkas': d.name,
            'Tanggal Dibuat/Update': d.date,
            'Status': d.status,
            'Tipe Format': d.type,
            'Ukuran Berkas': d.size
          }));

          const worksheet = XLSX.utils.json_to_sheet([]);
          XLSX.utils.sheet_add_aoa(worksheet, [
            ["PT TRIBUANA CARGO INDONESIA"],
            ["International Freight Forwarder & Logistics Provider"],
            [],
            [docItem ? `Detail Dokumen: ${docItem.id}` : `Laporan Dokumen: ${activeTitle}`],
            [`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`],
            []
          ], { origin: "A1" });

          XLSX.utils.sheet_add_json(worksheet, exportData, { origin: "A7" });
          
          worksheet['!cols'] = [
            { wch: 20 },
            { wch: 45 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
          ];

          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Dokumen");
          
          let fileName = docItem ? `${docItem.id}.xlsx` : `${activeTitle}.xlsx`;
          
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
          const url = window.URL.createObjectURL(data);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          
          showNotification(`Excel berhasil diunduh!`, 'success');
        } else if (format === 'PDF') {
          const doc = await generatePdfInstance(docItem, activeTitle, activeDocs[activeTab]);
          
          let fileName = docItem ? `${docItem.id}.pdf` : `${activeTitle}.pdf`;
          
          const blob = doc.output('blob');
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          
          showNotification(`PDF berhasil diunduh!`, 'success');
        }
      } catch (err) {
        console.error(err);
        showNotification(`Gagal mengunduh ${format}`, 'error');
      } finally {
        setIsExporting(null);
      }
    }, 500);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shipments', label: 'Pengiriman', icon: Package },
    { id: 'fleet', label: 'Armada', icon: Truck },
    { id: 'tracking', label: 'Lacak Posisi', icon: MapPin },
    { 
      id: 'docs', 
      label: 'Dokumen', 
      icon: FileText,
      hasChildren: true,
      children: [
        { id: 'docs-manifest', label: 'Manifest Kapal' },
        { id: 'docs-bol', label: 'Bill of Lading' },
        { id: 'docs-invoice', label: 'Invoices' },
        { id: 'docs-sj', label: 'Surat Jalan' },
        { id: 'docs-izin', label: 'Izin Operasional' },
      ]
    },
    { id: 'customers', label: 'Pelanggan', icon: Users },
    { id: 'reports', label: 'Laporan', icon: BarChart3 },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">Ringkasan Dasbor</h1>
                <p className="text-sm text-gray-500">Pantau aktivitas logistik dan performa hari ini.</p>
              </div>
              <button 
                onClick={() => setIsNewShipmentModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-white px-4 py-2 text-sm font-bold rounded-sm hover:bg-brand-yellow-hover transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Pengiriman Baru</span>
              </button>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Total Pengiriman', value: '1,248', icon: Package, color: 'blue', change: '+12%', trend: 'up' },
                { label: 'Sedang Transit', value: '342', icon: Truck, color: 'amber', change: '+4%', trend: 'up' },
                { label: 'Masalah Pending', value: '18', icon: Clock, color: 'red', change: '-8%', trend: 'down' },
                { label: 'Efisiensi Rute', value: '94.2%', icon: BarChart3, color: 'green', change: '+2.1%', trend: 'up' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-sm shadow-sm border border-gray-100 group hover:border-brand-yellow transition-colors duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-charcoal">{stat.value}</h3>
                    </div>
                    <div className={`w-10 h-10 rounded-sm flex items-center justify-center 
                      ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                        stat.color === 'amber' ? 'bg-brand-yellow/10 text-brand-yellow-hover' :
                        stat.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}
                    `}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm">
                    <span className={`flex items-center font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />} {stat.change}
                    </span>
                    <span className="text-gray-400">vs bulan lalu</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="bg-white p-5 sm:p-6 rounded-sm shadow-sm border border-gray-100 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-charcoal">Volume Aktivitas Mingguan</h3>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-xs text-brand-yellow font-bold uppercase tracking-widest">
                       <span className="w-2 h-2 rounded-full bg-brand-yellow"></span> Keluar (Ton)
                    </span>
                  </div>
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
                  <button onClick={() => setActiveTab('shipments')} className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors">Lihat Semua</button>
                </div>
                <div className="flex-1 space-y-4">
                  {resentShipments.map((shipment, i) => (
                    <div key={i} className="group flex items-start gap-4 p-3 bg-soft-gray hover:bg-white hover:shadow-md transition-all duration-200 border border-gray-100/50 rounded-sm cursor-pointer">
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
                            {shipment.status === 'Delivered' ? 'Selesai' : shipment.status === 'In Transit' ? 'Transit' : 'Pending'}
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
        );
      case 'shipments':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">Manajemen Pengiriman</h1>
                <p className="text-sm text-gray-500">Kelola dan pantau semua logistik pengiriman barang.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Cari manifest..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-gray-200 text-sm rounded-sm outline-none focus:border-brand-yellow transition-colors w-48 sm:w-64"
                  />
                </div>
                <button className="p-2 border border-gray-200 bg-white rounded-sm hover:bg-soft-gray text-gray-500">
                  <Filter className="w-4 h-4" />
                </button>
                <button onClick={() => setIsNewShipmentModalOpen(true)} className="bg-brand-yellow text-white px-4 py-2 text-sm font-bold rounded-sm hover:bg-brand-yellow-hover shadow-sm">
                  Baru
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b border-gray-100">
                     <tr>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">ID Pesanan</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Detail Rute</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Layanan</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Sopir / Kurir</th>
                       <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Estimasi</th>
                       <th className="px-6 py-4"></th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {[
                       { id: 'NSA-22910', from: 'Jakarta', to: 'Surabaya', svc: 'Sea Freight', status: 'In Transit', driver: 'Andi Wijaya', eta: '20 Mei' },
                       { id: 'NSA-22911', from: 'Medan', to: 'Jakarta', svc: 'Air Freight', status: 'Pending', driver: '-', eta: '19 Mei' },
                       { id: 'NSA-22912', from: 'Semarang', to: 'Balikpapan', svc: 'Sea Freight', status: 'Delivered', driver: 'Budi Santoso', eta: 'Selesai' },
                       { id: 'NSA-22913', from: 'Makassar', to: 'Sorong', svc: 'Land Transport', status: 'In Transit', driver: 'Dedi Kurniawan', eta: '22 Mei' },
                       { id: 'NSA-22914', from: 'Bali', to: 'Lombok', svc: 'Land Transport', status: 'Delivered', driver: 'Eko Putra', eta: 'Selesai' },
                     ].filter(s => s.id.includes(searchQuery.toUpperCase()) || s.from.toLowerCase().includes(searchQuery.toLowerCase())).map((row, i) => (
                       <tr key={i} className="hover:bg-soft-gray transition-colors group">
                         <td className="px-6 py-4 text-sm font-bold text-charcoal">{row.id}</td>
                         <td className="px-6 py-4">
                           <div className="flex flex-col">
                             <span className="text-sm text-charcoal font-medium">{row.from} → {row.to}</span>
                             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Manifest #88219</span>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              {row.svc === 'Sea Freight' ? <Ship className="w-3.5 h-3.5 text-blue-500" /> : 
                               row.svc === 'Air Freight' ? <Plane className="w-3.5 h-3.5 text-indigo-500" /> : 
                               <Truck className="w-3.5 h-3.5 text-orange-500" />}
                              <span className="text-xs text-gray-600">{row.svc}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4 text-sm">
                           <span className={`px-2 py-1 text-[10px] font-bold rounded-sm uppercase tracking-wider ${
                             row.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                             row.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                             'bg-amber-100 text-amber-700'
                           }`}>
                             {row.status === 'Delivered' ? 'Selesai' : row.status === 'In Transit' ? 'Transit' : 'Pending'}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-xs text-gray-500">{row.driver}</td>
                         <td className="px-6 py-4 text-xs font-bold text-gray-500">{row.eta}</td>
                         <td className="px-6 py-4 text-right">
                           <button className="text-gray-400 hover:text-brand-yellow transition-opacity">
                             <ChevronRight className="w-5 h-5" />
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        );
      case 'fleet':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">Status Armada</h1>
                <p className="text-sm text-gray-500">Monitor lokasi, performa, dan pemeliharaan armada Tribuana.</p>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-charcoal transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Segarkan Data</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { type: 'Kapal Cargo', name: 'Tribuana Pride V', loc: 'Tanjung Priok', status: 'Active', fuel: '85%', odo: '12,500 nm', driver: 'Capt. Herman Sabar' },
                { type: 'Truk Wingbox', name: 'Truk-0421 (B 9021 TX)', loc: 'Rest Area KM 57', status: 'On Delivery', fuel: '45%', odo: '42,901 Km', driver: 'Slamet Riyadi' },
                { type: 'Pesawat Cargo', name: 'NP-Air 01', loc: 'Bandara Soekarno-Hatta', status: 'Maintenance', fuel: '100%', odo: '2,100 hrs', driver: 'Pilot Firman' },
                { type: 'Truk CDE', name: 'Truk-0812 (B 1202 SX)', loc: 'Gudang Cakung', status: 'Standby', fuel: '92%', odo: '18,202 Km', driver: 'Eko Prasetyo' },
                { type: 'Kapal LCT', name: 'Bahtera Tribuana', loc: 'Selat Bali', status: 'Active', fuel: '62%', odo: '8,102 nm', driver: 'Capt. Surya' },
              ].map((item, i) => (
                <div key={i} 
                  onClick={() => setSelectedFleet(item)}
                  className="bg-white p-5 border border-gray-100 rounded-sm shadow-sm hover:shadow-md hover:border-brand-yellow transition-all duration-300 cursor-pointer group"
                >
                   <div className="flex justify-between items-start mb-4">
                     <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest">{item.type}</span>
                     <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                       item.status === 'Active' ? 'bg-green-100 text-green-700' :
                       item.status === 'On Delivery' ? 'bg-blue-100 text-blue-700' :
                       item.status === 'Maintenance' ? 'bg-red-100 text-red-700' :
                       'bg-gray-100 text-gray-600'
                     }`}>{item.status}</span>
                   </div>
                   <h4 className="font-bold text-charcoal mb-1 group-hover:text-brand-yellow transition-colors">{item.name}</h4>
                   <p className="text-xs text-gray-500 flex items-center gap-1 mb-4"><MapPin className="w-3 h-3" /> {item.loc}</p>
                   
                   <div className="space-y-3">
                     <div className="space-y-1">
                       <div className="flex justify-between text-[10px] font-bold text-gray-400">
                         <span>Level BBM</span>
                         <span>{item.fuel}</span>
                       </div>
                       <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${parseInt(item.fuel) < 50 ? 'bg-amber-500' : 'bg-brand-yellow'}`} 
                               style={{ width: item.fuel }}></div>
                       </div>
                     </div>
                     <div className="flex justify-between items-center text-[10px] border-t border-gray-50 pt-3">
                       <span className="text-gray-400 font-bold uppercase">Jarak Tempuh</span>
                       <span className="text-charcoal font-bold">{item.odo}</span>
                     </div>
                     <div className="flex items-center gap-2 mt-2">
                       <div className="w-6 h-6 rounded-full bg-soft-gray border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                         {item.driver.charAt(0)}
                       </div>
                       <span className="text-[10px] text-gray-500 font-medium">{item.driver}</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'tracking':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">Lacak Posisi Unit</h1>
                <p className="text-sm text-gray-500">Visualisasi real-time koordinat armada dan paket pelanggan.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-sm p-1 inline-flex shadow-sm">
                <button className="px-4 py-1.5 text-xs font-bold bg-brand-yellow text-white rounded-sm">Peta Utama</button>
                <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-charcoal transition-colors">Daftar Aktif</button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-270px)] min-h-[500px]">
              {/* Simulated Map Area */}
              <div className="xl:col-span-3 bg-white border border-gray-100 rounded-sm shadow-sm relative overflow-hidden flex flex-col group">
                 <div className="absolute inset-0 opacity-10" 
                      style={{ backgroundImage: 'radial-gradient(#111827 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                 </div>
                 
                 {/* Map Overlays */}
                 <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-100 p-3 shadow-lg rounded-sm max-w-[200px]">
                       <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Filter Layer</h4>
                       <div className="space-y-2">
                         <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="w-4 h-4 rounded-sm border border-gray-200 flex items-center justify-center group-hover:border-brand-yellow transition-colors bg-white">
                               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                            <span className="text-[10px] font-bold text-charcoal uppercase">Kapal (8)</span>
                         </label>
                         <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="w-4 h-4 rounded-sm border border-gray-200 flex items-center justify-center group-hover:border-brand-yellow transition-colors bg-white">
                               <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            </div>
                            <span className="text-[10px] font-bold text-charcoal uppercase">Truk (24)</span>
                         </label>
                       </div>
                    </div>
                 </div>

                 {/* Simulated Pins */}
                 <div className="absolute top-1/2 left-1/4 animate-pulse">
                    <div className="relative group">
                      <div className="w-4 h-4 bg-brand-yellow rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[10px] font-bold px-2 py-1 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        NP Pride V - Transit
                      </div>
                    </div>
                 </div>

                 <div className="absolute bottom-1/3 right-1/4">
                    <div className="relative group">
                      <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[10px] font-bold px-2 py-1 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        Truk-0421 - On Delivery
                      </div>
                    </div>
                 </div>

                 <div className="flex-1 flex items-center justify-center">
                    <div className="text-center z-10 px-6">
                      <MapPin className="w-10 h-10 text-brand-yellow mx-auto mb-4" />
                      <h3 className="text-sm font-bold text-charcoal mb-1 font-display">Antarmuka Peta Terintegrasi</h3>
                      <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">Area ini menghubungkan ke API Google Maps untuk menampilkan rute logistik sesungguhnya.</p>
                      <div className="h-px w-32 bg-gray-100 mx-auto"></div>
                    </div>
                 </div>

                 {/* Map Legend */}
                 <div className="p-3 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase bg-gray-50/50">
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Laut</span>
                       <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Darat</span>
                       <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Udara</span>
                    </div>
                    <span>Lat: -6.2088 | Lon: 106.8456</span>
                 </div>
              </div>

              {/* Feed Area */}
              <div className="bg-white border border-gray-100 rounded-sm shadow-sm flex flex-col max-h-full">
                 <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                    <h4 className="font-bold text-sm text-charcoal">Aktivitas Live</h4>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Live
                    </span>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {[
                      { time: '14:20', type: 'Arrived', text: 'NSA-22910 mencapai Pelabuhan Surabaya.', icon: CheckCircle2, color: 'green' },
                      { time: '13:55', type: 'Fuel Alert', text: 'Truk-0421 membutuhkan pengisian bahan bakar segera.', icon: AlertCircle, color: 'amber' },
                      { time: '12:10', type: 'Departure', text: 'NP-Air 01 lepas landas menuju Makassar.', icon: RefreshCw, color: 'blue' },
                      { time: '10:30', type: 'Delay', text: 'Cuaca buruk di Selat Sunda menunda kapal LCT-02.', icon: Info, color: 'red' },
                      { time: '09:15', type: 'Assigned', text: 'Dedi Kurniawan ditunjuk untuk pengiriman NSA-22913.', icon: Users, color: 'gray' },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-3 relative">
                        {i !== 4 && <div className="absolute left-[11px] top-6 bottom-[-16px] w-px bg-gray-100"></div>}
                        <div className={`mt-1 h-6 w-6 rounded-sm flex items-center justify-center shrink-0 border border-current
                          ${log.color === 'green' ? 'text-green-500 bg-green-50' : 
                            log.color === 'amber' ? 'text-amber-500 bg-amber-50' : 
                            log.color === 'blue' ? 'text-blue-500 bg-blue-50' :
                            log.color === 'red' ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-50'}
                        `}>
                          <log.icon className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-bold text-charcoal uppercase tracking-tighter">{log.type}</span>
                              <span className="text-[10px] text-gray-400 font-medium">{log.time}</span>
                           </div>
                           <p className="text-xs text-gray-500 leading-relaxed">{log.text}</p>
                        </div>
                      </div>
                    ))}
                 </div>
                 <button className="m-4 py-2 border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:border-brand-yellow hover:text-brand-yellow transition-colors rounded-sm">Lihat Log Lengkap</button>
              </div>
            </div>
          </div>
        );
      case 'customers':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">Database Pelanggan</h1>
                <p className="text-sm text-gray-500">Manajemen hubungan pelanggan (CRM) dan data kemitraan korporat.</p>
              </div>
              <button className="bg-charcoal text-white px-6 py-2 text-sm font-bold rounded-sm hover:bg-gray-800 transition-colors uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tambah Mitra
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Cari nama perusahaan atau kontak..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-brand-yellow transition-colors text-sm rounded-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-xs font-bold bg-soft-gray text-charcoal rounded-sm hover:bg-gray-100">Semua</button>
                  <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-charcoal transition-colors">VIP</button>
                  <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-charcoal transition-colors">Retail</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { name: 'PT. Maju Bersama', industry: 'Manufaktur', total: '124 Kiriman', rating: '4.8/5', location: 'Cikarang, Bekasi', contact: 'Bpk. Ridwan' },
                 { name: 'CV. Global Tekno', industry: 'Elektronik', total: '86 Kiriman', rating: '4.9/5', location: 'Tangerang', contact: 'Ibu Maya' },
                 { name: 'Store Tribuana', industry: 'E-commerce', total: '2,492 Kiriman', rating: '4.7/5', location: 'Jakarta Selatan', contact: 'Doni Pratama' },
                 { name: 'Indo Food Co.', industry: 'Pangan', total: '412 Kiriman', rating: '4.5/5', location: 'Surabaya', contact: 'Siti Aminah' },
                 { name: 'Karya Logistik', industry: 'Konstruksi', total: '12 Kiriman', rating: '4.4/5', location: 'Makassar', contact: 'Aris Munandar' },
               ].map((c, i) => (
                 <div key={i} className="bg-white p-5 border border-gray-100 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-charcoal font-bold rounded-sm border border-gray-100 group-hover:bg-brand-yellow group-hover:text-white group-hover:border-brand-yellow transition-all duration-300">
                        {c.name.charAt(4) === '.' ? c.name.charAt(4) : c.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-charcoal truncate">{c.name}</h4>
                        <p className="text-xs text-brand-yellow font-bold uppercase tracking-widest">{c.industry}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 mb-4">
                       <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-bold uppercase">Volume</span>
                          <span className="text-xs text-charcoal font-bold">{c.total}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 font-bold uppercase">Skor Loyalitas</span>
                          <span className="text-xs text-amber-500 font-bold flex items-center gap-1">★ {c.rating}</span>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="text-xs">{c.location}</span>
                       </div>
                       <div className="flex items-center gap-2 text-gray-500">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-xs">PIC: {c.contact}</span>
                       </div>
                    </div>
                    <button className="mt-6 w-full py-2 bg-soft-gray text-[10px] font-bold text-charcoal uppercase tracking-widest rounded-sm hover:bg-brand-yellow hover:text-white transition-all">Rincian Akun</button>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">Laporan Operasional</h1>
                <p className="text-sm text-gray-500">Visualisasi data kinerja logistik dan tren volume bulanan.</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-white border border-gray-200 px-4 py-2 text-xs font-bold rounded-sm hover:bg-soft-gray transition-colors uppercase tracking-widest">Filter Tanggal</button>
                <button className="bg-charcoal text-white px-4 py-2 text-xs font-bold rounded-sm hover:bg-gray-800 transition-colors uppercase tracking-widest">Ekspor CSV</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 space-y-6">
                  {/* Performance Chart */}
                  <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm">
                    <h4 className="font-bold text-sm text-charcoal mb-6 flex items-center gap-2">
                       <BarChart3 className="w-4 h-4 text-brand-yellow" /> Terget vs Realisasi (Juta Rp)
                    </h4>
                    <div className="h-64 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={deliveryData}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                           <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '4px', fontSize: '12px' }} />
                           <Bar dataKey="revenue" fill="#EAB308" radius={[2, 2, 0, 0]} barSize={32} />
                         </BarChart>
                       </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Kpi Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {[
                       { label: 'Ketepatan Pengiriman', value: '92.4%', sub: 'Target 95%', color: 'green' },
                       { label: 'Rata-rata Transit', value: '42 Jam', sub: 'Turun 2 Jam', color: 'blue' },
                       { label: 'Keluhan Pelanggan', value: '0.8%', sub: 'Industri 2.1%', color: 'amber' },
                     ].map((kpi, i) => (
                       <div key={i} className="bg-white p-5 border border-gray-100 rounded-sm shadow-sm text-center">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                          <h4 className="text-xl font-bold text-charcoal mb-1">{kpi.value}</h4>
                          <span className={`text-[10px] font-bold ${kpi.color === 'green' ? 'text-green-500' : kpi.color === 'blue' ? 'text-blue-500' : 'text-amber-500'}`}>{kpi.sub}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-6">
                  {/* Time Summary */}
                  <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-sm">
                    <h4 className="font-bold text-sm text-charcoal mb-6">Ketepatan Waktu (OTA)</h4>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                             <span className="font-bold text-green-700">Tepat Waktu</span>
                             <span className="font-bold">92%</span>
                          </div>
                          <div className="w-full h-2 bg-green-50 rounded-full overflow-hidden">
                             <div className="h-full bg-green-500" style={{ width: '92%' }}></div>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                             <span className="font-bold text-amber-700">Terlambat ( {"<"} 24 jam )</span>
                             <span className="font-bold">6%</span>
                          </div>
                          <div className="w-full h-2 bg-amber-50 rounded-full overflow-hidden">
                             <div className="h-full bg-amber-500" style={{ width: '6%' }}></div>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                             <span className="font-bold text-red-700">Terlambat Signifikan</span>
                             <span className="font-bold">2%</span>
                          </div>
                          <div className="w-full h-2 bg-red-50 rounded-full overflow-hidden">
                             <div className="h-full bg-red-500" style={{ width: '2%' }}></div>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="bg-charcoal p-6 rounded-sm shadow-sm text-center">
                     <BarChart3 className="w-10 h-10 text-brand-yellow mx-auto mb-4" />
                     <h4 className="text-white font-bold text-sm mb-2 font-display">Ingin Laporan Detail?</h4>
                     <p className="text-gray-400 text-xs mb-6">Kami menyediakan kustomisasi laporan mendalam sesuai kebutuhan bisnis Anda.</p>
                     <button className="w-full bg-brand-yellow text-white py-2.5 text-xs font-bold rounded-sm uppercase tracking-widest hover:bg-brand-yellow-hover">Hubungi Analis</button>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'docs-manifest':
      case 'docs-bol':
      case 'docs-invoice':
      case 'docs-sj':
      case 'docs-izin':
        const docTitles: any = {
          'docs-manifest': 'Manifest Kapal (Ship Manifest)',
          'docs-bol': 'Bill of Lading (B/L)',
          'docs-invoice': 'Invoice & Faktur Komersial',
          'docs-sj': 'Surat Jalan (Delivery Order)',
          'docs-izin': 'Izin Operasional & Sertifikasi',
        };
        
        const currentDocs = activeDocs[activeTab] || [];
        
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-charcoal">{docTitles[activeTab]}</h1>
                <p className="text-sm text-gray-500">Arsip dan manajemen dokumen digital operasional.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleExport('EXCEL')}
                  disabled={!!isExporting}
                  className="bg-white border border-gray-200 px-4 py-2 text-xs font-bold rounded-sm hover:bg-soft-gray transition-colors uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
                >
                  <FileSpreadsheet className="w-4 h-4 text-green-600" />
                  {isExporting === 'EXCEL' ? 'Exporting...' : 'Export Excel'}
                </button>
                <button 
                  onClick={() => handleDocAction('add')}
                  className="bg-brand-yellow text-white px-4 py-2 text-sm font-bold rounded-sm hover:bg-brand-yellow-hover transition-colors shadow-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Buat Baru
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
               <div className="p-4 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4 bg-gray-50/30">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Cari nomor dokumen..." 
                      className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 text-xs rounded-sm outline-none focus:border-brand-yellow" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Total: {currentDocs.length} Berkas</span>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <button 
                      onClick={() => handleExport('PDF')}
                      disabled={!!isExporting}
                      className="flex items-center gap-1 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <Printer className="w-3 h-3" /> Cetak PDF
                    </button>
                  </div>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="border-b border-gray-100 bg-gray-50/50">
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">ID Dokumen</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nama Berkas</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tanggal</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Format</th>
                       <th className="px-6 py-4"></th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {currentDocs
                       .filter((d: any) => d.id.toLowerCase().includes(searchQuery.toLowerCase()) || d.name.toLowerCase().includes(searchQuery.toLowerCase()))
                       .map((doc: any, i: number) => (
                       <tr key={doc.id} className="hover:bg-soft-gray transition-colors group">
                         <td className="px-6 py-4 text-xs font-bold text-charcoal">{doc.id}</td>
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                             {doc.type === 'PDF' ? <File className="w-4 h-4 text-red-500" /> : <FileSpreadsheet className="w-4 h-4 text-green-500" />}
                             <span className="text-sm text-gray-700 font-medium">{doc.name}</span>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex flex-col">
                               <span className="text-xs text-charcoal">{doc.date}</span>
                               <span className="text-[10px] text-gray-400">{doc.size}</span>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                              ['Verified', 'Paid', 'Active'].includes(doc.status) ? 'bg-green-100 text-green-700' :
                              ['Pending', 'In Transit'].includes(doc.status) ? 'bg-blue-100 text-blue-700' :
                              doc.status === 'Overdue' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                            }`}>
                               {doc.status}
                            </span>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-sm text-[10px] font-black ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                               {doc.type}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                               <button 
                                  onClick={() => handleDocAction('view', doc)}
                                  title="Lihat" 
                                  className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                               >
                                  <Eye className="w-4 h-4" />
                               </button>
                               <button 
                                  onClick={() => handleDocAction('edit', doc)}
                                  title="Edit" 
                                  className="p-1.5 text-gray-400 hover:text-brand-yellow transition-colors"
                               >
                                  <Edit className="w-4 h-4" />
                               </button>
                               <button 
                                  onClick={() => handleDocAction('delete', doc)}
                                  title="Hapus" 
                                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                               <button 
                                  onClick={() => handleExport(doc.type === 'Excel' ? 'EXCEL' : 'PDF', doc)}
                                  title="Unduh" 
                                  className="p-1.5 text-gray-400 hover:text-charcoal transition-colors"
                               >
                                  <Download className="w-4 h-4" />
                               </button>
                            </div>
                         </td>
                       </tr>
                     ))}
                     {currentDocs.length === 0 && (
                       <tr>
                         <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm italic">
                           Tidak ada dokumen ditemukan.
                         </td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-sm flex items-start gap-4">
               <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
               <div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">Keamanan Dokumen Digital</h4>
                  <p className="text-xs text-blue-700 leading-relaxed">Semua dokumen di atas telah terenkripsi end-to-end dan memiliki tanda tangan digital (E-Signature) yang sah sesuai regulasi logistik Tribuana.</p>
               </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-charcoal">Pengaturan Sistem</h1>
              <p className="text-sm text-gray-500">Kelola profil, keamanan akun, dan preferensi notifikasi.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               <div className="lg:col-span-1 space-y-2">
                  <button className="w-full text-left px-4 py-2.5 text-sm font-bold bg-brand-yellow/10 text-brand-yellow border-l-4 border-brand-yellow rounded-sm">Profil & Akun</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-sm">Keamanan</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-sm">Notifikasi</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-sm text-red-500 border-t border-gray-100 pt-4 mt-4">Hapus Akun</button>
               </div>

               <div className="lg:col-span-3 space-y-6">
                  <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
                    <h4 className="font-bold text-charcoal mb-6 border-b border-gray-50 pb-4">Profil Administratif</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5 focus-within:text-brand-yellow transition-colors">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
                        <input type="text" defaultValue="Administrator Tribuana" className="w-full p-2.5 bg-soft-gray border border-gray-100 text-sm rounded-sm outline-none focus:border-brand-yellow transition-colors text-charcoal font-medium" />
                      </div>
                      <div className="space-y-1.5 grayscale opacity-70">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID Pegawai (Read-only)</label>
                        <input type="text" readOnly value="NS-ADMIN-001" className="w-full p-2.5 bg-gray-50 border border-gray-100 text-sm rounded-sm outline-none text-gray-400 cursor-not-allowed" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Alamat Email</label>
                        <input type="email" defaultValue="admin@nusantara.logistics" className="w-full p-2.5 bg-soft-gray border border-gray-100 text-sm rounded-sm outline-none focus:border-brand-yellow transition-colors text-charcoal font-medium" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Grup Akses</label>
                        <select className="w-full p-2.5 bg-soft-gray border border-gray-100 text-sm rounded-sm outline-none focus:border-brand-yellow transition-colors text-charcoal font-medium">
                           <option>Super Admin</option>
                           <option>Manager Operasional</option>
                           <option>Staf Admin</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                       <button className="bg-brand-yellow text-white px-8 py-2.5 text-sm font-bold rounded-sm hover:bg-brand-yellow-hover shadow-sm uppercase tracking-widest transition-all">Simpan Perubahan</button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-6">
                    <h4 className="font-bold text-charcoal mb-6 border-b border-gray-50 pb-4">Preferensi Notifikasi</h4>
                    <div className="space-y-4">
                       {[
                         { title: 'Email Transit', desc: 'Dapatkan pemberitahuan setiap paket masuk atau keluar pelabuhan.', state: true },
                         { title: 'Laporan Mingguan', desc: 'Kirim ringkasan performa operasional otomatis ke email.', state: true },
                         { title: 'Peringatan Pemeliharaan', desc: 'Notifikasi saat armada mencapai batas jarak tempuh servis.', state: false },
                       ].map((pref, i) => (
                         <div key={i} className="flex items-center justify-between gap-4 p-4 hover:bg-soft-gray rounded-sm transition-colors border border-transparent hover:border-gray-50">
                            <div>
                               <h5 className="text-sm font-bold text-charcoal">{pref.title}</h5>
                               <p className="text-xs text-gray-500">{pref.desc}</p>
                            </div>
                            <button className={`w-10 h-5 rounded-full p-1 transition-colors relative ${pref.state ? 'bg-brand-yellow' : 'bg-gray-200'}`}>
                               <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${pref.state ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </button>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
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
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
              <img src="https://i.imgur.com/QN8Pxlv.png" alt="PT TRIBUANA CARGO INDONESIA" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-base tracking-tight text-charcoal leading-none">TRIBUANA</span>
              <span className="font-bold text-[10px] text-gray-400 tracking-tighter leading-none">CARGO INDONESIA</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 overflow-y-auto">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                {!item.hasChildren ? (
                  <button 
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 w-full rounded-sm font-medium transition-all duration-200
                      ${activeTab === item.id 
                        ? 'bg-brand-yellow/10 text-brand-yellow-hover border-l-4 border-brand-yellow shadow-sm' 
                        : 'text-gray-500 hover:text-charcoal hover:bg-gray-50'}
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-brand-yellow-hover animate-pulse' : ''}`} />
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <div className="space-y-1">
                    <button 
                      onClick={() => setIsDocsOpen(!isDocsOpen)}
                      className={`
                        flex items-center justify-between px-3 py-2.5 w-full rounded-sm font-medium transition-all duration-200
                        ${activeTab.startsWith('docs') 
                          ? 'bg-brand-yellow/5 text-brand-yellow-hover border-l-4 border-brand-yellow' 
                          : 'text-gray-500 hover:text-charcoal hover:bg-gray-50'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {isDocsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    
                    <AnimatePresence>
                      {isDocsOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-1"
                        >
                          {item.children?.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => {
                                setActiveTab(child.id);
                                setSidebarOpen(false);
                              }}
                              className={`
                                flex items-center gap-2 pl-11 pr-3 py-2 w-full text-xs font-semibold rounded-sm transition-colors
                                ${activeTab === child.id ? 'text-brand-yellow bg-soft-gray' : 'text-gray-400 hover:text-charcoal hover:bg-gray-50'}
                              `}
                            >
                              <div className={`w-1 h-1 rounded-full ${activeTab === child.id ? 'bg-brand-yellow' : 'bg-gray-300'}`}></div>
                              <span>{child.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
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
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0 shadow-sm">
          <div className="flex items-center flex-1">
            <button 
              className="p-2 -ml-2 mr-2 text-gray-500 hover:text-charcoal lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center max-w-md w-full relative group">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 group-focus-within:text-brand-yellow transition-colors" />
              <input 
                type="text" 
                placeholder="Cari ID pengiriman, nama pelanggan, dll..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow rounded-sm text-sm transition-all outline-none"
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
                <p className="text-sm font-semibold text-charcoal leading-none mb-1">Admin</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Super Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-yellow text-white flex items-center justify-center font-bold border-2 border-white shadow-sm ring-1 ring-gray-100">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* New Shipment Modal */}
      <AnimatePresence>
        {isNewShipmentModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewShipmentModalOpen(false)}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white shadow-2xl rounded-sm overflow-y-auto max-h-[90dvh]"
            >
              <div className="h-16 bg-charcoal flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-yellow rounded-sm flex items-center justify-center text-white">
                    <Package className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold font-display uppercase tracking-widest text-sm">Input Manifest Baru</h3>
                </div>
                <button onClick={() => setIsNewShipmentModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form className="p-6 sm:p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setIsNewShipmentModalOpen(false); }}>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Asal (Origin)</label>
                       <input required type="text" placeholder="Contoh: Jakarta" className="w-full p-2.5 bg-soft-gray border border-gray-100 text-sm rounded-sm outline-none focus:border-brand-yellow font-medium" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tujuan (Destination)</label>
                       <input required type="text" placeholder="Contoh: Surabaya" className="w-full p-2.5 bg-soft-gray border border-gray-100 text-sm rounded-sm outline-none focus:border-brand-yellow font-medium" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Layanan Logistik</label>
                       <select className="w-full p-2.5 bg-soft-gray border border-gray-100 text-sm rounded-sm outline-none focus:border-brand-yellow font-medium">
                          <option>Land Transport (Trucking)</option>
                          <option>Sea Freight (Cargo Ship)</option>
                          <option>Air Freight (Cargo Plane)</option>
                       </select>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Berat Estimasi (Kg/Ton)</label>
                       <input required type="text" placeholder="Contoh: 2.5 Ton" className="w-full p-2.5 bg-soft-gray border border-gray-100 text-sm rounded-sm outline-none focus:border-brand-yellow font-medium" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deskripsi Barang & Catatan Khusus</label>
                    <textarea placeholder="Sebutkan rincian barang, instruksi khusus penanganan, dll..." rows={3} className="w-full p-2.5 bg-soft-gray border border-gray-100 text-sm rounded-sm outline-none focus:border-brand-yellow font-medium" />
                 </div>
                 <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsNewShipmentModalOpen(false)} className="px-6 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-widest rounded-sm hover:bg-gray-50">Batal</button>
                    <button type="submit" className="px-8 py-2.5 text-xs font-bold bg-brand-yellow text-white uppercase tracking-widest rounded-sm hover:bg-brand-yellow-hover shadow-md">Simpan & Proses</button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fleet Detail Modal */}
      <AnimatePresence>
        {selectedFleet && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFleet(null)}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white shadow-2xl rounded-sm overflow-hidden"
            >
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-soft-gray rounded-sm flex items-center justify-center text-brand-yellow border border-gray-100">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal font-display uppercase tracking-widest">{selectedFleet.name}</h3>
                        <p className="text-xs text-brand-yellow font-bold uppercase">{selectedFleet.type}</p>
                      </div>
                   </div>
                   <button onClick={() => setSelectedFleet(null)} className="text-gray-400 hover:text-charcoal transition-colors p-1">
                     <X className="w-6 h-6" />
                   </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-soft-gray border border-gray-100 rounded-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                      <p className="text-sm font-bold text-charcoal">{selectedFleet.status}</p>
                   </div>
                   <div className="p-4 bg-soft-gray border border-gray-100 rounded-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Bahan Bakar</p>
                      <p className="text-sm font-bold text-charcoal">{selectedFleet.fuel}</p>
                   </div>
                   <div className="p-4 bg-soft-gray border border-gray-100 rounded-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Lokasi</p>
                      <p className="text-sm font-bold text-charcoal truncate">{selectedFleet.loc}</p>
                   </div>
                   <div className="p-4 bg-soft-gray border border-gray-100 rounded-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Odometer</p>
                      <p className="text-sm font-bold text-charcoal">{selectedFleet.odo}</p>
                   </div>
                </div>

                <div className="p-4 border border-gray-100 rounded-sm space-y-4">
                   <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Informasi Operasional</h4>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-medium truncate shrink-0 mr-4">Penanggung Jawab / Sopir:</span>
                        <span className="text-charcoal font-bold text-right">{selectedFleet.driver}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-medium">Jadwal Servis Berikutnya:</span>
                        <span className="text-charcoal font-bold">12 Juli 2026</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-medium">Kapasitas Muat Maksimal:</span>
                        <span className="text-charcoal font-bold text-right">3,500 Kg</span>
                      </div>
                   </div>
                </div>

                <div className="flex gap-3">
                   <button className="flex-1 bg-charcoal text-white py-3 text-xs font-bold rounded-sm uppercase tracking-widest hover:bg-gray-800 transition-colors">Telepon PIC</button>
                   <button onClick={() => setSelectedFleet(null)} className="flex-1 bg-brand-yellow text-white py-3 text-xs font-bold rounded-sm uppercase tracking-widest hover:bg-brand-yellow-hover transition-colors shadow-sm">Lacak di Peta</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Document CRUD Modal */}
      <AnimatePresence>
        {docModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDocModal({ ...docModal, isOpen: false })}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl sm:rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 sticky top-0 z-10">
                <h3 className="text-base sm:text-lg font-bold text-charcoal uppercase tracking-widest flex items-center gap-2 font-display">
                  {docModal.mode === 'add' ? <Plus className="w-5 h-5 text-brand-yellow" /> : 
                   docModal.mode === 'edit' ? <Edit className="w-5 h-5 text-brand-yellow" /> : 
                   <Eye className="w-5 h-5 text-brand-yellow" />}
                  {docModal.mode === 'add' ? 'Tambah Dokumen' : 
                   docModal.mode === 'edit' ? 'Edit Dokumen' : 'Detail Dokumen'}
                </h3>
                <button onClick={() => setDocModal({ ...docModal, isOpen: false })} className="text-gray-400 hover:text-charcoal p-1 bg-white rounded-full">
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              
              {docModal.mode === 'view' ? (
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="bg-white sm:rounded-sm w-full border border-gray-200 shadow-sm overflow-hidden text-left relative">
                    {/* Header */}
                    <div className="bg-white text-charcoal border-b-4 border-brand-yellow p-4 sm:p-6 relative">
                       <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                         <div className="flex items-center gap-3 sm:gap-4">
                           {/* Logo */}
                           <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0">
                             <img src="https://i.imgur.com/QN8Pxlv.png" alt="Tribuana Cargo Logo" className="w-full h-full object-contain" />
                           </div>
                           <div className="flex flex-col justify-center">
                             <h1 className="text-lg sm:text-2xl font-bold tracking-widest leading-none text-charcoal">TRIBUANA</h1>
                             <p className="text-[9px] sm:text-[11px] font-medium text-gray-500 mt-1 sm:mt-1.5">PT TRIBUANA CARGO INDONESIA</p>
                             <p className="hidden sm:block text-[9px] text-gray-400 mt-0.5">International Freight Forwarder & Logistics Provider</p>
                           </div>
                         </div>
                         <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-0 border-gray-100 pt-3 sm:pt-0 mt-1 sm:mt-0 flex flex-row sm:flex-col justify-between sm:justify-start">
                           <div>
                             <p className="text-[8px] font-bold text-gray-400 uppercase">Tanggal Cetak</p>
                             <p className="text-[10px] text-gray-600 sm:mb-2">{new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                           </div>
                           <div className="text-right">
                             <p className="text-[8px] font-bold text-gray-400 uppercase">Status Sistem</p>
                             <p className="text-[10px] font-medium text-yellow-600">Terverifikasi & Resmi</p>
                           </div>
                         </div>
                       </div>
                    </div>
                    
                    {/* Body */}
                    <div className="p-4 sm:p-6 mt-2 sm:mt-4">
                       <h2 className="text-base sm:text-lg font-bold text-charcoal">Detail Rekam Dokumen</h2>
                       <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6">ID Referensi: {docModal.data?.id} — Nama Form: {docModal.data?.name}</p>
                       
                       <div className="border border-gray-200 rounded-md overflow-hidden text-sm bg-gray-50">
                          {[
                            { label: 'ID Dokumen', value: docModal.data?.id },
                            { label: 'Nama Berkas', value: docModal.data?.name },
                            { label: 'Kategori / Format', value: docModal.data?.type },
                            { label: 'Status Validasi', value: docModal.data?.status },
                            { label: 'Tanggal Diperbarui', value: docModal.data?.date },
                            { label: 'Ukuran Berkas', value: docModal.data?.size },
                          ].map((item, idx) => (
                             <div key={idx} className={`flex flex-col sm:flex-row sm:items-center px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                               <div className="w-full sm:w-1/3 font-bold text-charcoal text-[10px] sm:text-xs mb-0.5 sm:mb-0">{item.label}</div>
                               <div className="w-full sm:w-2/3 text-gray-700 text-xs sm:text-xs font-medium sm:font-normal"><span className="hidden sm:inline">: </span>{item.value}</div>
                             </div>
                          ))}
                       </div>
                       
                       <div className="mt-6 sm:mt-8 text-[8px] sm:text-[9px] text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
                         <p>Dokumen ini valid dan diterbitkan oleh Sistem Logistik PT Tribuana Cargo Indonesia.</p>
                         <p>Segala bentuk pemalsuan terhadap dokumen ini dapat ditindak sesuai dengan peraturan yang berlaku.</p>
                       </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      type="button"
                      onClick={() => setDocModal({ ...docModal, isOpen: false })}
                      className="flex-1 px-6 py-3 border border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest rounded-sm hover:bg-soft-gray transition-colors order-2 sm:order-1"
                    >
                      Batal
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setDocModal({ ...docModal, isOpen: false });
                        handleExport(docModal.data?.type === 'Excel' ? 'EXCEL' : 'PDF', docModal.data);
                      }}
                      className="flex-1 px-6 py-3 bg-charcoal text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-gray-800 transition-colors shadow-lg order-1 sm:order-2"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Unduh
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
              <form onSubmit={handleSaveDoc} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:gap-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID Dokumen</label>
                    <input 
                      name="id"
                      required
                      readOnly={docModal.mode === 'edit'}
                      defaultValue={docModal.data?.id}
                      placeholder="e.g. DOC-2024-001"
                      className={`w-full px-3 py-2.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:border-brand-yellow focus:bg-white transition-all outline-none 
                        ${docModal.mode === 'edit' ? 'text-gray-500 cursor-not-allowed' : 'text-charcoal'}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nama Dokumen</label>
                    <input 
                      name="name"
                      required
                      defaultValue={docModal.data?.name}
                      placeholder="e.g. Manifest Jakarta"
                      className="w-full px-3 py-2.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:border-brand-yellow focus:bg-white transition-all outline-none text-charcoal"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Format</label>
                      <select 
                        name="type"
                        defaultValue={docModal.data?.type || 'PDF'}
                        className="w-full px-3 py-2.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:border-brand-yellow focus:bg-white transition-all outline-none text-charcoal"
                      >
                        <option value="PDF">PDF Document</option>
                        <option value="Excel">Excel Spreadsheet</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
                      <select 
                        name="status"
                        defaultValue={docModal.data?.status || 'Pending'}
                        className="w-full px-3 py-2.5 sm:px-4 bg-gray-50 border border-gray-200 rounded-sm text-sm focus:border-brand-yellow focus:bg-white transition-all outline-none text-charcoal"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Active">Active</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                  </div>
                  {docModal.mode !== 'add' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ukuran</label>
                        <input 
                          name="size"
                          readOnly
                          defaultValue={docModal.data?.size}
                          className="w-full px-3 py-2.5 sm:px-4 bg-gray-100 border border-gray-200 rounded-sm text-sm text-gray-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Terakhir Diperbarui</label>
                        <input 
                          name="date"
                          readOnly
                          defaultValue={docModal.data?.date}
                          className="w-full px-3 py-2.5 sm:px-4 bg-gray-100 border border-gray-200 rounded-sm text-sm text-gray-500 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button 
                    type="button"
                    onClick={() => setDocModal({ ...docModal, isOpen: false })}
                    className="flex-1 px-6 py-3 border border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest rounded-sm hover:bg-soft-gray transition-colors order-2 sm:order-1"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 bg-brand-yellow text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-brand-yellow-hover transition-colors shadow-lg shadow-brand-yellow/20 order-1 sm:order-2"
                  >
                    {docModal.mode === 'add' ? 'Simpan' : 'Perbarui'}
                  </button>
                </div>
              </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Export Loading Overlay */}
      <AnimatePresence>
        {isExporting && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal/40 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-sm shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm"
            >
              <div className="relative">
                <RefreshCw className="w-12 h-12 text-brand-yellow animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Download className="w-5 h-5 text-brand-yellow" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-charcoal">Menyiapkan Laporan</h3>
                <p className="text-xs text-gray-500 mt-1">Mengonversi data Tribuana ke format {isExporting}. Mohon tunggu sebentar...</p>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-brand-yellow"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-charcoal text-white px-5 py-3 rounded-sm shadow-xl"
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-brand-yellow" />
            ) : (
              <X className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm font-medium tracking-wide">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Dashboard;
