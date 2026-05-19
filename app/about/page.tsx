"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-[#f9f8f6] min-h-screen font-sans text-gray-800">
      
      {/* Navbar Simple */}
      <nav className="w-full py-6 px-8 max-w-7xl mx-auto flex items-center justify-between border-b border-gray-200">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-heliconia transition">
          <ArrowLeft size={16} className="mr-2" /> Kembali ke Beranda
        </Link>
        <Image 
          src="/logo heliconia.png" 
          alt="Logo Heliconia" 
          width={120} 
          height={120} 
          className="h-12 w-auto object-contain"
        />
      </nav>

      <main className="max-w-4xl mx-auto py-16 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-widest text-heliconia uppercase mb-4 text-center">Tentang Kami</p>
          <h1 className="text-5xl font-light mb-12 text-center text-heliconia-dark leading-tight">
            Menghadirkan harmoni antara <br/><span className="italic font-serif">pelayanan & alam</span>
          </h1>

          <div className="bg-white p-8 md:p-12 rounded-4xl shadow-sm border border-gray-50 text-gray-600 font-light leading-relaxed space-y-6">
            <p>
              Menginap di <strong>HELICONIA HOTEL BATU</strong> saat Anda sedang berada di Batu adalah sebuah pilihan cerdas. Terletak strategis di Jl. Sultan Agung No.23, hotel kami menawarkan kemudahan akses ke berbagai pusat hiburan dan fasilitas publik.
            </p>
            <p>
              Pelayanan memuaskan serta fasilitas hotel yang memadai akan membuat Anda nyaman berada di HELICONIA HOTEL BATU. Tersedia kolam renang untuk Anda bersantai sendiri maupun bersama teman dan keluarga setelah seharian menjelajahi kota.
            </p>
            <p>
              Resepsionis kami siap 24 jam untuk melayani proses check-in, check-out, dan kebutuhan Anda yang lain. Jangan ragu untuk menghubungi resepsionis, kami siap melayani Anda kapanpun dibutuhkan. Terdapat juga restoran yang menyajikan menu lezat ala HELICONIA HOTEL BATU khusus untuk Anda.
            </p>
            <p>
              Kami memastikan Anda tetap terhubung; WiFi tersedia di seluruh area publik properti untuk membantu Anda tetap terhubung dengan keluarga, teman, maupun urusan bisnis.
            </p>
            <p className="font-medium text-gray-800 pt-4 border-t border-gray-100">
              Dengan fasilitas yang memadai dan kualitas pelayanan yang diakui oleh sebagian besar tamu kami, HELICONIA HOTEL BATU menjadi pilihan yang tepat untuk menginap.
            </p>
          </div>
        </motion.div>
      </main>

    </div>
  );
}