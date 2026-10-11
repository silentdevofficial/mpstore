"use client";
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function SecurityWrapper({ children }) {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Action Blocked',
        text: 'Right-click is disabled on MP Store.',
        icon: 'warning',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#3b82f6',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    };

    const handleKeyDown = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="select-none min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}