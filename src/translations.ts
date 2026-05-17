export type Language = 'id' | 'en';

export const translations = {
  id: {
    loading: {
      starting: "Memulai Sistem..."
    },
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      services: "Layanan",
      network: "Jaringan Global",
      contact: "Kontak",
      consultation: "Konsultasi",
      consultationNow: "Konsultasi Sekarang"
    },
    tracking: {
      title: "Lacak Pengiriman",
      desc: "Masukkan nomor resi (AWB/BL) untuk melihat status pengiriman.",
      placeholder: "Contoh: NLP-8823901",
      status: "Status Aktif",
      inTransit: "Sedang Dikirim (In Transit)",
      awb: "No. Resi",
      notFound: "Nomor resi tidak ditemukan. Silakan periksa kembali nomor Anda.",
      step1: "Penerimaan Barang",
      step2: "Customs Clearance",
      step3: "Dalam Perjalanan Kapal",
      step4: "Tiba di Gudang Tujuan"
    },
    hero: {
      badge: "Global Supply Chain",
      title1: "Solusi Export Import &",
      title2: "Logistik Global",
      desc: "Mengelola kebutuhan pengiriman, distribusi, dan logistik internasional secara profesional dan terpercaya untuk efisiensi bisnis Anda.",
      btnLearn: "Pelajari Layanan",
      btnContact: "Hubungi Kami"
    },
    about: {
      badge: "Profil Perusahaan",
      title: "Mitra Logistik Internasional dengan Standar Enterprise",
      desc1: "Nusantara Logistik Perdana hadir sebagai jembatan untuk aktivitas perdagangan internasional Anda. Kami menyederhanakan kompleksitas rantai pasok global melalui layanan komprehensif mulai dari pengiriman antar negara hingga manajemen pergudangan domestik.",
      desc2: "Dengan infrastruktur modern dan tim yang berpengalaman dalam regulasi kepabeanan, kami menjamin keamanan, ketepatan waktu, dan efisiensi biaya untuk setiap kargo yang Anda percayakan.",
      expYears: "Tahun Pengalaman",
      expCountries: "Negara Tujuan",
      expSuccess: "Tingkat Keberhasilan"
    },
    services: {
      badge: "Layanan Kami",
      title: "Infrastruktur Logistik Terpadu",
      desc: "Portofolio layanan komprehensif kami dirancang untuk menangani seluruh aspek rantai pasok Anda, memberikan ketenangan pikiran dalam mengeksekusi bisnis global.",
      items: [
        { title: "Pengiriman Laut", desc: "Solusi FCL dan LCL untuk pengiriman kargo dalam volume besar dengan biaya efisien di seluruh jaringan global." },
        { title: "Pengiriman Udara", desc: "Prioritas pengiriman cepat dan aman untuk kargo yang sensitif terhadap waktu dengan jadwal keberangkatan harian." },
        { title: "Customs Clearance", desc: "Penanganan kepabeanan yang profesional untuk memastikan barang Anda lolos inspeksi dengan mematuhi regulasi." },
        { title: "Pergudangan", desc: "Fasilitas penyimpanan modern dengan sistem manajemen inventaris (WMS) yang terintegrasi secara real-time." },
        { title: "Distribusi Barang", desc: "Layanan logistik end-to-end dari pelabuhan hingga ke tangan penerima akhir (last-mile delivery)." },
        { title: "Trucking", desc: "Armada truk darat yang handal untuk distribusi domestik dengan pemantauan lokasi menggunakan GPS tracker." }
      ],
      learnMore: "Pelajari lebih lanjut"
    },
    insights: {
      badge: "Business Insights",
      title: "Performa Operasional & Pertumbuhan Bisnis",
      desc: "Data agregat dari operasional pengiriman, kapasitas distribusi, dan jaringan mitra global selama 12 bulan terakhir.",
      stats: [
        { label: "JUMLAH PENGIRIMAN", value: "144.520", trend: "+18,4%" },
        { label: "NEGARA TUJUAN", value: "82", trend: "+6 negara" },
        { label: "KAPASITAS DISTRIBUSI", value: "260K TEU", trend: "+12,1%" },
        { label: "MITRA LOGISTIK", value: "350+", trend: "Aktif" }
      ],
      chart1Title: "Pertumbuhan Pengiriman",
      chart1Subtitle: "Volume bulanan (kontainer)",
      chart2Title: "Top Negara Tujuan",
      chart2Subtitle: "Volume YTD per negara",
    },
    network: {
      badge: "Jaringan Global",
      title: "Konektivitas Tanpa Batas",
      hub: "Hub Center",
      branch: "Port Cabang"
    },
    whyUs: {
      items: [
        { title: "Tepat Waktu", desc: "Komitmen kuat pada jadwal keberangkatan dan kedatangan." },
        { title: "Aman & Terlindungi", desc: "Asuransi kargo dan pengawasan terpadu untuk setiap rute." },
        { title: "Pelayanan Profesional", desc: "Tim operasional dedikasi yang selalu siap membantu 24/7." },
        { title: "Sistem Enterprise", desc: "Teknologi pemantauan logistik mutakhir." }
      ]
    },
    cta: {
      title: "Siap Mengembangkan Distribusi Global Anda?",
      desc: "Konsultasikan kebutuhan logistik perusahaan Anda dengan para ahli kami dan temukan solusi pengiriman terbaik.",
      btnPrimary: "Konsultasi Sekarang",
      btnSecondary: "Hubungi Kami"
    },
    footer: {
      desc: "Perusahaan penyedia solusi export import dan logistik terkemuka di Indonesia, mendukung pergerakan logistik global secara efisien.",
      company: "Perusahaan",
      servicesTitle: "Layanan Utama",
      hq: "Kantor Pusat",
      menuCompany: ["Tentang Kami", "Layanan", "Jaringan Global", "Karir"],
      menuServices: ["Pengiriman Laut FCL/LCL", "Kargo Udara", "Customs Clearance", "Manajemen Pergudangan"],
      address: "Gedung Logistik Sentral Lt. 12",
      address2: "Jl. Pelabuhan Tanjung Priok No.45",
      address3: "Jakarta Utara, 14310",
      copyright: "© 2026 Nusantara Logistik Perdana. Hak Cipta Dilindungi Undang-Undang.",
      privacy: "Privasi",
      terms: "Syarat & Ketentuan"
    }
  },
  en: {
    loading: {
      starting: "Starting System..."
    },
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      network: "Global Network",
      contact: "Contact",
      consultation: "Consultation",
      consultationNow: "Consultation Now"
    },
    tracking: {
      title: "Track Shipment",
      desc: "Enter your tracking number (AWB/BL) to view the shipping status.",
      placeholder: "Example: NLP-8823901",
      status: "Active Status",
      inTransit: "In Transit",
      awb: "Tracking No.",
      notFound: "Tracking number not found. Please verify your number.",
      step1: "Cargo Receipt",
      step2: "Customs Clearance",
      step3: "In Transit (Vessel)",
      step4: "Arrived at Destination"
    },
    hero: {
      badge: "Global Supply Chain",
      title1: "Export Import &",
      title2: "Global Logistics Solution",
      desc: "Professionally and reliably manage your international shipping, distribution, and logistics needs for your business efficiency.",
      btnLearn: "Learn Services",
      btnContact: "Contact Us"
    },
    about: {
      badge: "Company Profile",
      title: "International Logistics Partner with Enterprise Standards",
      desc1: "Nusantara Logistik Perdana serves as a bridge for your international trade activities. We simplify the complexity of global supply chains through comprehensive services ranging from cross-border shipping to domestic warehouse management.",
      desc2: "With modern infrastructure and a team experienced in customs regulations, we guarantee security, timeliness, and cost efficiency for every cargo you entrust to us.",
      expYears: "Years Experience",
      expCountries: "Destination Countries",
      expSuccess: "Success Rate"
    },
    services: {
      badge: "Our Services",
      title: "Integrated Logistics Infrastructure",
      desc: "Our comprehensive service portfolio is designed to handle all aspects of your supply chain, providing peace of mind in executing global business.",
      items: [
        { title: "Ocean Freight", desc: "FCL and LCL solutions for large volume cargo shipments efficiently across the global network." },
        { title: "Air Freight", desc: "Fast and secure priority shipping for time-sensitive cargo with daily departure schedules." },
        { title: "Customs Clearance", desc: "Professional customs handling to ensure your goods pass inspection seamlessly in compliance with regulations." },
        { title: "Warehousing", desc: "Modern storage facilities with fully integrated real-time warehouse management systems (WMS)." },
        { title: "Goods Distribution", desc: "End-to-end logistics from the port direct to the final receiver's hands (last-mile delivery)." },
        { title: "Trucking", desc: "A reliable fleet of land trucks for domestic distribution featuring GPS location tracking." }
      ],
      learnMore: "Learn more"
    },
    insights: {
      badge: "Business Insights",
      title: "Operational Performance & Business Growth",
      desc: "Aggregated data from shipping operations, distribution capacity, and global partner network over the past 12 months.",
      stats: [
        { label: "TOTAL SHIPMENTS", value: "144,520", trend: "+18.4%" },
        { label: "DESTINATION COUNTRIES", value: "82", trend: "+6 countries" },
        { label: "DISTRIBUTION CAPACITY", value: "260K TEU", trend: "+12.1%" },
        { label: "LOGISTICS PARTNERS", value: "350+", trend: "Active" }
      ],
      chart1Title: "Shipment Growth",
      chart1Subtitle: "Monthly volume (containers)",
      chart2Title: "Top Destination Countries",
      chart2Subtitle: "YTD volume per country",
    },
    network: {
      badge: "Global Network",
      title: "Limitless Connectivity",
      hub: "Hub Center",
      branch: "Branch Port"
    },
    whyUs: {
      items: [
        { title: "On-Time", desc: "Strong commitment to departure and arrival schedules." },
        { title: "Safe & Secure", desc: "Cargo insurance and integrated supervision for every route." },
        { title: "Professional Service", desc: "A dedicated operational team always ready to assist 24/7." },
        { title: "Enterprise System", desc: "Cutting edge logistics monitoring technology." }
      ]
    },
    cta: {
      title: "Ready to Expand Your Global Distribution?",
      desc: "Consult your company's logistics needs with our experts and discover the best shipping solutions.",
      btnPrimary: "Consult Now",
      btnSecondary: "Contact Us"
    },
    footer: {
      desc: "A leading provider of export-import and logistics solutions in Indonesia, efficiently supporting global logistics movements.",
      company: "Company",
      servicesTitle: "Main Services",
      hq: "Headquarters",
      menuCompany: ["About Us", "Services", "Global Network", "Careers"],
      menuServices: ["Ocean Freight FCL/LCL", "Air Freight", "Customs Clearance", "Warehouse Management"],
      address: "Logistik Sentral Building 12th Fl",
      address2: "Jl. Pelabuhan Tanjung Priok No.45",
      address3: "North Jakarta, 14310",
      copyright: "© 2026 Nusantara Logistik Perdana. All Rights Reserved.",
      privacy: "Privacy",
      terms: "Terms & Conditions"
    }
  }
};
