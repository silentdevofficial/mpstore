"use client";
import { mpApps } from '@/data/apps';
import { Download, Sparkles as SparkleIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useState, useEffect } from 'react';

export default function Home() {
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleDownload = (app) => {
    Swal.fire({
      title: `Download ${app.name}?`,
      text: `Version: ${app.version} | Size: ${app.size}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#1f2937',
      confirmButtonText: 'Download Now',
      background: '#111827',
      color: '#fff',
      customClass: {
        popup: 'rounded-2xl border border-gray-800'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = app.downloadLink;
        Swal.fire({
          title: 'Starting Download',
          icon: 'success',
          background: '#111827',
          color: '#3b82f6',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'rounded-2xl border border-blue-900/50'
          }
        });
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen text-white selection:bg-blue-500/30 overflow-hidden bg-[#050505]">
      
      {/* 3D Particle Star Background */}
      {isMounted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Stars 
              radius={100} 
              depth={50} 
              count={4000} 
              factor={4} 
              saturation={0} 
              fade 
              speed={1.5} 
            />
          </Canvas>
          {/* Subtle Glowing Orbs in the background for premium feel */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="pt-24 sm:pt-32 pb-12 sm:pb-16 text-center flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] mb-4 flex items-center justify-center gap-2 sm:gap-4"
          >
            MP STORE <SparkleIcon className="text-yellow-400 w-8 h-8 sm:w-12 sm:h-12 animate-pulse" />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-lg md:text-xl font-medium tracking-wide px-4"
          >
            Exclusive Apps by Malith Poorna
          </motion.p>
        </header>

        <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {mpApps.map((app) => (
              <motion.div 
                key={app.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, rotateY: 3, rotateX: 3 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-1 border border-white/10 overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                
                <div className="bg-gray-950/80 rounded-[1.4rem] p-5 sm:p-6 h-full flex flex-col justify-between relative z-10">
                  <div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-900 rounded-2xl mb-5 sm:mb-6 shadow-lg shadow-blue-500/30 flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300 overflow-hidden border border-gray-700">
                      {app.image ? (
                        <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl sm:text-2xl font-black text-blue-500">{app.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-100 group-hover:text-blue-400 transition-colors">{app.name}</h2>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{app.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-800/50">
                    <div className="flex flex-col">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Version {app.version}</span>
                      <span className="text-[11px] sm:text-xs font-medium text-gray-400 bg-gray-800/50 px-2 py-1 rounded-md w-fit">{app.size}</span>
                    </div>
                    <button 
                      onClick={() => handleDownload(app)}
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/40 transition-all duration-300 transform group-hover:scale-110"
                    >
                      <Download size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>

        <footer className="w-full py-8 sm:py-10 mt-auto border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-gray-500">POWERED BY</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg md:text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            >
              MKCT GENIX SOFTWARE SOLUTION
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
}