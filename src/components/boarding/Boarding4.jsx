import { useEffect } from "react";
import Logo from '../../assets/LogoApp.png'
import LoadingImage from '../../assets/nexttier-icon.png'
 
export default function Boarding4({ onDone }) {
 
  // Auto-advance after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 2500)
    return () => clearTimeout(timer)
  }, [])
 
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <header className="px-8 py-3 shrink-0">
        <div className="h-8 flex items-center">
          <img src={Logo} alt="Logo Of The App" className="h-full w-auto object-contain" />
        </div>
      </header>
 
      <main className="flex-1 flex flex-col items-center justify-center">
        <img
          src={LoadingImage}
          alt="Loading"
          className="w-25 h-25 object-contain"
          style={{ animation: 'pulse-scale 1.5s ease-in-out infinite' }}
        />
      </main>
 
      <footer className="text-center text-xs text-gray-400 py-3 shrink-0">
        © 2025 NextTier ·{" "}
        <a href="#" className="underline hover:text-gray-600">Privacy</a>
        {" · "}
        <a href="#" className="underline hover:text-gray-600">Terms</a>
        {" · "}
        Built with <span className="text-red-500">♥</span> for curious minds
      </footer>
 
      <style>{`
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
