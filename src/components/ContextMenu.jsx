import { useState, useRef, useEffect } from "react";

export default function ContextMenu({ children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 z-50 text-sm w-56 p-2 bg-white border border-gray-500/20 text-gray-800/80 rounded-lg font-medium shadow-lg">
          <ul className="flex flex-col gap-px">
            <li className="flex items-center justify-between gap-3 bg-gray-500/10 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
              <span>Add favorite</span>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="m8.997.667 2.575 5.216 5.759.842-4.167 4.058.983 5.734-5.15-2.709-5.15 2.709.984-5.734L.664 6.725l5.758-.842z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </li>
            <li className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
              <span>Rename</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14.672 6.763 5.58 15.854l-.166 2.995 2.995-.166L17.5 9.59m-2.828-2.828 1.348-1.349a2 2 0 1 1 2.829 2.829L17.5 9.59m-2.828-2.828L17.5 9.591" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </li>
            <div className="w-full h-px bg-gray-300/70 my-1"></div>
            <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
              <span>New Deployment</span>
              <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
                <path d="m6.669 13.167 3.333 3.333m0 0 3.334-3.333M10.002 16.5V9m7.4 5.075a4.166 4.166 0 0 0-2.4-7.575h-1.05a6.667 6.667 0 1 0-11.45 6.075" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </li>
            <li className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
              <span>Duplicate</span>
              <svg width="17" height="17" viewBox="0 0 19 19" fill="none">
                <path d="M14.167 1.667H2.5a.833.833 0 0 0-.833.833v11.667a.833.833 0 0 1-1.667 0V2.5A2.5 2.5 0 0 1 2.5 0h11.667a.833.833 0 0 1 0 1.667M10 8.333a.833.833 0 1 1 1.667 0V10h1.666a.833.833 0 1 1 0 1.667h-1.666v1.666a.833.833 0 1 1-1.667 0v-1.666H8.333a.833.833 0 0 1 0-1.667H10z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.836 3.333a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5h-10a2.5 2.5 0 0 1-2.5-2.5v-10a2.5 2.5 0 0 1 2.5-2.5zm0 1.667c.46 0 .833.373.833.833v10c0 .46-.373.834-.833.834h-10a.833.833 0 0 1-.833-.834v-10c0-.46.373-.833.833-.833z" fill="currentColor"/>
              </svg>
            </li>
            <div className="w-full h-px bg-gray-300/50 my-1"></div>
            <li className="flex items-center text-red-600/80 justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-red-600/10 transition">
              <span>Delete</span>
              <svg width="17" height="17" viewBox="0 0 19 19" fill="none">
                <path d="M1 3.833h17m-4.25 0-.287-.766c-.28-.744-.419-1.115-.677-1.39a2.1 2.1 0 0 0-.852-.546C11.559 1 11.118 1 10.237 1H8.763c-.881 0-1.322 0-1.697.131a2.1 2.1 0 0 0-.852.546c-.258.275-.398.646-.676 1.39l-.288.766m10.625 0v9.634c0 1.586 0 2.38-.347 2.986a3.04 3.04 0 0 1-1.393 1.238c-.682.309-1.575.309-3.36.309h-2.55c-1.785 0-2.678 0-3.36-.309a3.04 3.04 0 0 1-1.393-1.238c-.347-.606-.347-1.4-.347-2.986V3.833m8.5 3.778v6.611m-4.25-6.61v6.61" stroke="#DC2626" strokeOpacity=".8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
