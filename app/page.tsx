"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, MapPin, Clock, Wifi, Coffee, ShieldCheck, 
  Phone, Mail, X, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Komponen Reusable untuk Efek Fade In & Blur
const FadeInScroll = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

// Komponen Fitur Pop Up Promo (Diperbarui dengan Gambar)
const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Memunculkan pop up setelah 1.5 detik website dimuat
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && wa) {
      // Simpan data (User dummy dulu)
      console.log("Promo claimed by:", { name, wa });
      setIsSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-[2.5rem] p-8 max-w-md w-full relative shadow-2xl overflow-hidden"
          >
            {/* Tombol Close */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 bg-gray-100 p-2 rounded-full transition z-10"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                {/* GAMBAR PROMO PERSEGI DI INTEGRASIKAN DI SINI */}
                <div className="relative aspect-square w-full rounded-3xl overflow-hidden mb-6 border border-gray-100 mt-2 shrink-0 shadow-inner bg-gray-50">
                  <Image 
                    src="/images/popup-promo-1.png" 
                    alt="Desain Promo Heliconia Hotel" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-heliconia-dark mb-2">Ambil Diskon Anda!</h3>
                  <p className="text-sm text-gray-500 font-light px-2">Masukkan Nama dan nomor WhatsApp Anda untuk langsung mendapatkan kode promo eksklusif ini.</p>
                </div>
                
                <form onSubmit={handleClaim} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#f4f6f0] border border-gray-100 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-heliconia transition"
                      placeholder="Nama Lengkap Tamu"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      required
                      value={wa}
                      onChange={(e) => setWa(e.target.value)}
                      className="w-full bg-[#f4f6f0] border border-gray-100 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-heliconia transition"
                      placeholder="Nomor WhatsApp aktif"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-heliconia text-white py-4 rounded-xl font-bold hover:bg-heliconia-dark transition shadow-lg shadow-heliconia/30 mt-2 active:scale-[0.98]"
                  >
                    Klaim Kode Promo Sekarang
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Klaim Berhasil!</h3>
                <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">Selamat {name.split(' ')[0]}! Gunakan kode promo di bawah ini di halaman pembayaran untuk mendapatkan potongan harga.</p>
                
                <div className="bg-[#f4f6f0] border-2 border-dashed border-heliconia p-5 rounded-2xl mb-8 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-xs font-bold text-heliconia tracking-wider">KODE PROMO ANDA</span>
                  <span className="text-4xl font-black text-heliconia tracking-widest">HELIBATU26</span>
                </div>
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-200 transition active:scale-[0.98]"
                >
                  Tutup & Lanjut Pesan Kamar
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  return (
    <div className="bg-[#f9f8f6] min-h-screen font-sans text-gray-800 relative">
      
      {/* Mengaktifkan Promo Pop Up */}
      <PromoPopup />
      
      {/* Navbar Minimalis */}
      <nav className="w-full py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center -ml-4">
          <Link href="/">
            <Image 
              src="/logo heliconia.png" 
              alt="Logo Heliconia Hotel Batu" 
              width={300} 
              height={300} 
              className="h-20 md:h-28 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <Link href="/about" className="hover:text-heliconia transition">Tentang</Link>
          <Link href="/#facilities" className="hover:text-heliconia transition">Fasilitas</Link>
          <Link href="/#rooms" className="hover:text-heliconia transition">Kamar</Link>
          <Link href="/#contact" className="hover:text-heliconia transition">Kontak</Link>
        </div>
        <Link href="/#rooms" className="bg-heliconia-light/20 text-heliconia px-6 py-2.5 rounded-full font-medium hover:bg-heliconia hover:text-white transition text-sm">
          Pesan Sekarang
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-4 pb-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative rounded-[2.5rem] overflow-hidden bg-heliconia-dark h-[80vh] flex items-center"
        >
          <Image 
            src="/images/pool-1.webp" 
            alt="Fasilitas Kolam Renang Outdoor Heliconia Hotel Batu" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent z-10" />
          
          <div className="relative z-20 p-8 md:p-16 text-white max-w-2xl mt-[-80px]">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl font-light mb-6 leading-tight"
            >
              Kenyamanan berpadu dengan <span className="italic font-serif">alam Batu</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg opacity-90 mb-8 font-light"
            >
              Menghadirkan pelayanan memuaskan dan fasilitas lengkap dengan pemandangan pegunungan yang menenangkan untuk persinggahan Anda.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="#rooms" className="inline-flex bg-heliconia hover:bg-[#4a5739] text-white rounded-full px-8 py-4 items-center gap-3 transition">
                Lihat Pilihan Kamar <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap md:flex-nowrap gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-2xl flex items-center gap-4 flex-1">
              <Clock className="text-heliconia" size={24} />
              <div>
                <p className="font-bold text-sm">24 Jam</p>
                <p className="text-xs text-gray-500">Layanan Resepsionis</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-2xl flex items-center gap-4 flex-1">
              <MapPin className="text-heliconia" size={24} />
              <div>
                <p className="font-bold text-sm">Pusat Kota</p>
                <p className="text-xs text-gray-500">Dekat Jatim Park & Alun-alun</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-4 rounded-2xl flex items-center gap-4 flex-1">
              <Wifi className="text-heliconia" size={24} />
              <div>
                <p className="font-bold text-sm">Akses Gratis</p>
                <p className="text-xs text-gray-500">WiFi di Seluruh Area</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Fasilitas Section */}
      <section id="facilities" className="max-w-7xl mx-auto py-16 px-8 grid lg:grid-cols-12 gap-12 overflow-hidden">
        <div className="lg:col-span-5">
          <FadeInScroll>
            <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">Mengapa Kami</p>
            <h2 className="text-4xl font-light mb-6 text-heliconia-dark leading-tight">
              Fasilitas yang membuat Anda <span className="italic font-serif">betah berlama-lama</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-8">
              Kami menggabungkan keramahan khas Batu dengan fasilitas modern yang memadai. Setiap sudut dirancang agar tamu merasa nyaman, baik saat liburan bersama keluarga maupun perjalanan bisnis.
            </p>
            <Link href="/about" className="bg-heliconia-light/20 text-heliconia px-6 py-3 rounded-full font-medium hover:bg-heliconia hover:text-white transition inline-flex items-center gap-2 text-sm">
              Tentang Heliconia <ArrowRight size={16} />
            </Link>
          </FadeInScroll>
        </div>
        
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          <FadeInScroll delay={0.1} className="h-full">
            <div className="bg-white p-8 rounded-4xl shadow-sm border border-gray-50 h-full flex flex-col">
              <div className="w-12 h-12 bg-[#f4f6f0] rounded-2xl flex items-center justify-center mb-6 text-heliconia shrink-0">
                <Coffee size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Restoran & Kafe</h3>
              <p className="text-sm text-gray-500 font-light flex-grow">Menyajikan menu lezat ala Heliconia khusus untuk menemani waktu santai Anda.</p>
            </div>
          </FadeInScroll>
          <FadeInScroll delay={0.2} className="h-full">
            <div className="bg-white p-8 rounded-4xl shadow-sm border border-gray-50 h-full flex flex-col">
              <div className="w-12 h-12 bg-[#f4f6f0] rounded-2xl flex items-center justify-center mb-6 text-heliconia shrink-0">
                <Wifi size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Konektivitas Maksimal</h3>
              <p className="text-sm text-gray-500 font-light flex-grow">Tetap terhubung dengan keluarga atau pekerjaan melalui akses WiFi gratis berkecepatan tinggi.</p>
            </div>
          </FadeInScroll>
          <FadeInScroll delay={0.3} className="h-full">
            <div className="bg-white p-8 rounded-4xl shadow-sm border border-gray-50 h-full flex flex-col">
              <div className="w-12 h-12 bg-[#f4f6f0] rounded-2xl flex items-center justify-center mb-6 text-heliconia shrink-0">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Aman & Terjamin</h3>
              <p className="text-sm text-gray-500 font-light flex-grow">Keamanan 24 jam penuh dan layanan check-in/out ekspress yang tanpa ribet.</p>
            </div>
          </FadeInScroll>
          <FadeInScroll delay={0.4} className="h-full">
            <div className="bg-[#f4f6f0] p-8 rounded-4xl border border-heliconia/10 flex flex-col justify-center h-full">
               <h3 className="font-bold text-lg mb-2 text-heliconia">Kolam Renang</h3>
               <p className="text-sm text-gray-600 font-light">Fasilitas kolam renang outdoor dewasa dan anak-anak untuk bersantai seharian.</p>
            </div>
          </FadeInScroll>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="max-w-7xl mx-auto py-16 px-8 overflow-hidden">
        <FadeInScroll>
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-sm tracking-widest text-gray-400 uppercase mb-4">Pilihan Kami</p>
              <h2 className="text-4xl font-light text-heliconia-dark">Kamar, yang menjadi <br/><span className="italic font-serif">rumah Anda</span></h2>
            </div>
            <div className="hidden md:flex text-sm text-gray-500 items-center gap-1 opacity-0">
              Semua Kamar <ArrowRight size={16} />
            </div>
          </div>
        </FadeInScroll>

        <div className="grid md:grid-cols-2 gap-6">
          
          <FadeInScroll delay={0.2} className="h-full">
            <div className="bg-white p-4 rounded-[2.5rem] group cursor-pointer hover:shadow-lg transition duration-300 h-full flex flex-col border border-gray-100">
              <div className="h-72 bg-gray-200 rounded-4xl mb-6 relative overflow-hidden shrink-0 z-0">
                <Image 
                  src="/images/double-1.jpeg" 
                  alt="Kamar Deluxe Double Heliconia Hotel Batu Mountain View" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-heliconia-dark z-10">
                  2 Tamu
                </div>
              </div>
              <div className="px-4 pb-4 flex flex-col flex-grow z-10 bg-white">
                <h3 className="text-2xl font-medium mb-2 text-gray-800 z-10">Deluxe Double Mountain View</h3>
                <p className="text-gray-500 text-sm font-light mb-6 flex-grow z-10">Satu double bed besar dengan fasilitas lengkap dan pemandangan pegunungan yang asri.</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50 z-10">
                  <Link href="/rooms/1" className="font-medium flex items-center text-sm text-heliconia hover:text-heliconia-dark transition z-10 active:scale-[0.98]">
                    Lihat Detail & Pesan <ArrowRight size={16} className="ml-2" />
                  </Link>
                  <span className="bg-[#f4f6f0] text-heliconia px-4 py-2 rounded-full text-sm font-bold z-10">Rp 650.000</span>
                </div>
              </div>
            </div>
          </FadeInScroll>

          <FadeInScroll delay={0.4} className="h-full">
            <div className="bg-white p-4 rounded-[2.5rem] group cursor-pointer hover:shadow-lg transition duration-300 h-full flex flex-col border border-gray-100">
              <div className="h-72 bg-gray-200 rounded-4xl mb-6 relative overflow-hidden shrink-0 z-0">
                <Image 
                  src="/images/twin-1.jpeg" 
                  alt="Kamar Deluxe Twin Heliconia Hotel Batu Mountain View" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-heliconia-dark z-10">
                  2 Tamu
                </div>
              </div>
              <div className="px-4 pb-4 flex flex-col flex-grow z-10 bg-white">
                <h3 className="text-2xl font-medium mb-2 text-gray-800 z-10">Deluxe Twin Mountain View</h3>
                <p className="text-gray-500 text-sm font-light mb-6 flex-grow z-10">Dua twin bed yang nyaman, ideal untuk rekan perjalanan Anda dengan view alam Kota Batu.</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50 z-10">
                  <Link href="/rooms/2" className="font-medium flex items-center text-sm text-heliconia hover:text-heliconia-dark transition z-10 active:scale-[0.98]">
                    Lihat Detail & Pesan <ArrowRight size={16} className="ml-2" />
                  </Link>
                  <span className="bg-[#f4f6f0] text-heliconia px-4 py-2 rounded-full text-sm font-bold z-10">Rp 650.000</span>
                </div>
              </div>
            </div>
          </FadeInScroll>
          
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <section id="contact" className="max-w-7xl mx-auto py-16 px-4 overflow-hidden">
        <FadeInScroll>
          <div className="bg-[#ebd9c1]/30 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center justify-between border border-[#ebd9c1]/50 shadow-inner">
            <div className="max-w-xl">
              <p className="text-sm tracking-widest text-gray-600 uppercase mb-4 font-medium">Siap Menginap?</p>
              <h2 className="text-4xl font-light mb-6 text-gray-800 leading-tight">
                Mari rencanakan liburan <br/><span className="italic font-serif">ideal Anda di Batu</span>
              </h2>
              <p className="text-gray-600 font-light mb-8">
                Hubungi resepsionis kami kapan saja. Kami siap membantu proses pemesanan dan memastikan kebutuhan Anda terpenuhi.
              </p>
              <a href="https://wa.me/62812XXXXXXXX" target="_blank" rel="noopener noreferrer" className="inline-flex bg-heliconia text-white px-8 py-4 rounded-full font-medium hover:bg-heliconia-dark transition items-center gap-2 shadow-lg shadow-heliconia/20 active:scale-[0.98]">
                Hubungi WhatsApp Kami <ArrowRight size={18} />
              </a>
            </div>
            
            <div className="w-full lg:w-auto flex flex-col gap-4 shrink-0">
              <div className="bg-white rounded-2xl p-6 flex items-center gap-6 shadow-sm min-w-[320px] border border-gray-50">
                <div className="bg-[#f4f6f0] p-3.5 rounded-full text-heliconia shrink-0"><Phone size={24} /></div>
                <div>
                  <p className="text-lg font-bold text-gray-800 tracking-tight">+62 812-XXXX-XXXX</p>
                  <p className="text-xs text-gray-500 font-light">Setiap hari, 24 Jam</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 flex items-center gap-6 shadow-sm border border-gray-50">
                <div className="bg-[#f4f6f0] p-3.5 rounded-full text-heliconia shrink-0"><Mail size={24} /></div>
                <div>
                  <p className="text-lg font-bold text-gray-800 tracking-tight">info@heliconiahotel.com</p>
                  <p className="text-xs text-gray-500 font-light">Respon dalam 1 jam kerja</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInScroll>
      </section>

      {/* Main Footer */}
      <footer className="bg-white border-t border-gray-100 mt-8 py-12 px-8">
        <FadeInScroll delay={0.1}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="mb-4 -ml-2">
                <Image 
                  src="/logo heliconia.png" 
                  alt="Logo Utama Heliconia Hotel Batu" 
                  width={160} 
                  height={160} 
                  className="h-20 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-gray-500 font-light mb-2 flex items-start gap-2 max-w-sm leading-relaxed">
                <MapPin size={18} className="mt-0.5 text-heliconia shrink-0" />
                Jl. Sultan Agung No.23, Sisir, Kec. Batu, Kota Batu, Jawa Timur 65314, Indonesia
              </p>
              <p className="text-xs text-gray-400 font-light pt-2 border-t border-gray-50">
                Akomodasi dengan fasilitas baik dan kualitas pelayanan memuaskan di pusat Kota Batu.
              </p>
            </div>

            <div className="md:pl-8">
              <h4 className="font-bold text-gray-800 mb-6 tracking-tight">Navigasi</h4>
              <ul className="space-y-3.5 text-sm text-gray-500 font-light">
                <li><Link href="/about" className="hover:text-heliconia transition">Tentang Kami</Link></li>
                <li><Link href="/#rooms" className="hover:text-heliconia transition">Pilihan Kamar</Link></li>
                <li><Link href="/#facilities" className="hover:text-heliconia transition">Fasilitas Hotel</Link></li>
                <li><Link href="/#contact" className="hover:text-heliconia transition">Kontak</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-6 tracking-tight">Sosial Media</h4>
              <div className="flex gap-4 mb-10">
                <a href="#" aria-label="Instagram Heliconia Hotel Batu" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-heliconia hover:text-white transition shadow-inner border border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" aria-label="Facebook Heliconia Hotel Batu" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-heliconia hover:text-white transition shadow-inner border border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" aria-label="TikTok Heliconia Hotel Batu" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-heliconia hover:text-white transition shadow-inner border border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </a>
              </div>
              <ul className="space-y-3.5 text-xs text-gray-400 font-light border-t border-gray-50 pt-6">
                <li><Link href="#" className="hover:text-gray-600 transition">Kebijakan Privasi</Link></li>
                <li><Link href="#" className="hover:text-gray-600 transition">Syarat & Ketentuan</Link></li>
              </ul>
            </div>

          </div>
          
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400 font-light">
            © {new Date().getFullYear()} Heliconia Hotel Batu. All rights reserved.
          </div>
        </FadeInScroll>
      </footer>

    </div>
  );
}