"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Bed, Mountain, CreditCard, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Simulasi Data Database (SEKARANG DENGAN GAMBAR)
const roomDB = {
  "1": {
    name: "Deluxe Double Mountain View",
    price: 650000,
    bed: "1 Double Bed Besar",
    desc: "Kamar nyaman dengan fasilitas lengkap dan pemandangan langsung ke arah pegunungan Kota Batu yang asri. Sangat cocok untuk pasangan atau solo traveler.",
    image: "/images/double-1.jpeg"
  },
  "2": {
    name: "Deluxe Twin Mountain View",
    price: 650000,
    bed: "2 Twin Bed",
    desc: "Dilengkapi dua tempat tidur terpisah yang nyaman, ideal untuk menginap bersama teman atau rekan bisnis dengan tetap menikmati pemandangan alam.",
    image: "/images/twin-1.jpeg"
  }
};

export default function RoomDetailAndBooking({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;
  const roomData = roomDB[roomId as keyof typeof roomDB];

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!roomData) {
    return <div className="p-20 text-center">Kamar tidak ditemukan.</div>;
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays * roomData.price : roomData.price;
  };

  const totalPrice = calculateTotal();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingSuccess(true);
    }, 2000);
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-4xl shadow-lg max-w-md w-full text-center border border-gray-100">
          <CheckCircle2 size={64} className="text-heliconia mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Booking Berhasil!</h2>
          <p className="text-gray-500 font-light mb-8">Terima kasih {guestName}, pesanan Anda untuk {roomData.name} sedang kami proses. (Simulasi)</p>
          <Link href="/" className="bg-heliconia text-white px-8 py-3 rounded-full font-medium hover:bg-heliconia-dark transition inline-block">
            Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f8f6] min-h-screen font-sans text-gray-800 pb-20">
      <nav className="w-full py-6 px-8 max-w-7xl mx-auto flex items-center border-b border-gray-200 mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-heliconia transition">
          <ArrowLeft size={16} className="mr-2" /> Kembali
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-3 gap-12">
        
        {/* Kolom Kiri: Detail Kamar */}
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* GAMBAR KAMAR BESAR */}
            <div className="h-[400px] bg-gray-200 rounded-4xl mb-8 relative overflow-hidden">
              <Image 
                src={roomData.image} 
                alt={roomData.name} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            <h1 className="text-4xl font-light text-heliconia-dark mb-4">{roomData.name}</h1>
            <p className="text-gray-600 font-light leading-relaxed mb-8">{roomData.desc}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-3 text-sm border border-gray-100 shadow-sm">
                <Users size={18} className="text-heliconia" /> Maks. 2 Tamu
              </div>
              <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-3 text-sm border border-gray-100 shadow-sm">
                <Bed size={18} className="text-heliconia" /> {roomData.bed}
              </div>
              <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-3 text-sm border border-gray-100 shadow-sm">
                <Mountain size={18} className="text-heliconia" /> Mountain View
              </div>
            </div>
          </motion.div>
        </div>

        {/* Kolom Kanan: Engine Booking Form */}
        <div className="lg:col-span-1">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white p-8 rounded-4xl shadow-lg border border-gray-100 sticky top-8">
            <h3 className="text-2xl font-bold mb-6 flex justify-between items-end">
              <span>Rp {roomData.price.toLocaleString('id-ID')}</span>
              <span className="text-sm text-gray-400 font-normal">/ malam</span>
            </h3>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nama Lengkap Tamu</label>
                <input 
                  type="text" 
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#f4f6f0] border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-heliconia"
                  placeholder="Misal: Budi Santoso"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Check-in</label>
                  <input 
                    type="date" 
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#f4f6f0] border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-heliconia"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Check-out</label>
                  <input 
                    type="date" 
                    required
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#f4f6f0] border-none rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-heliconia"
                  />
                </div>
              </div>

              {totalPrice > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-sm mb-2 text-gray-600">
                    <span>Total Menginap</span>
                    <span className="font-bold">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full flex justify-center items-center gap-2 py-4 rounded-full font-bold text-white transition mt-6 ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-heliconia hover:bg-heliconia-dark'}`}
              >
                {isProcessing ? 'Memproses...' : <><CreditCard size={20} /> Lanjut Pembayaran</>}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}