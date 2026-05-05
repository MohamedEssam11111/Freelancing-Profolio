import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Rocket } from 'lucide-react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Smoothly follow mouse with tip alignment
      gsap.to(cursorRef.current, {
        x,
        y,
        xPercent: -50,
        yPercent: 0,
        duration: 0.1,
        ease: 'power2.out'
      });

      gsap.to(followerRef.current, {
        x,
        y,
        duration: 0.3,
        ease: 'power3.out'
      });
    };

    const onMouseEnter = (e) => {
      const target = e.target;
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive') ||
        target.closest('.cursor-hover') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      if (isInteractive) {
        setIsHovering(true);
      }
    };

    const onMouseLeave = () => {
      setIsHovering(false);
    };

    // Global listener for performance
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseEnter);
    window.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseEnter);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('resize', checkMobile);
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Glow / Follower */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(212, 255, 0, 0.15) 0%, transparent 70%)',
          opacity: isHovering ? 1 : 0.5,
          scale: isHovering ? 2.5 : 1
        }}
      />

      {/* Main Rocket Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex flex-col items-center"
        style={{
          transform: 'translate(-50%, 0%)',
        }}
      >
        <div 
          className={`relative transition-transform duration-300 ease-out ${isHovering ? 'scale-125' : 'scale-100'}`}
          style={{ transform: 'rotate(-15deg)' }}
        >
          {/* Rocket Icon */}
          <Rocket 
            size={24} 
            className="text-dark-primary transition-transform duration-300 -rotate-45" 
            style={{ 
              filter: isHovering ? 'drop-shadow(0 0 8px rgba(212, 255, 0, 0.8))' : 'none'
            }}
          />

          {/* Fire Effect */}
          <div 
            className={`absolute -bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-300 pointer-events-none ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Flickering Fire Shell */}
            <div className="flex flex-col items-center">
              <div 
                className="w-1.5 h-6 bg-gradient-to-t from-transparent via-orange-500 to-dark-primary animate-flicker rounded-full blur-[1px]"
              />
              <div 
                className="w-3 h-4 -mt-3 bg-dark-primary/30 blur-md rounded-full animate-pulse"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% { height: 18px; transform: scaleX(1); opacity: 0.8; }
          50% { height: 28px; transform: scaleX(1.1); opacity: 1; }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite alternate;
        }
        /* Disable native cursor globally for non-touch */
        @media (min-width: 769px) {
          a, button, [role="button"], input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
