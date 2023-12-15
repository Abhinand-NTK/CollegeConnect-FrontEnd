import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Menu = () => {
  const [showWindow, setShowWindow] = useState(false);

  // Animation configuration for the window
  const windowAnimation = useSpring({
    opacity: showWindow ? 1 : 0,
    transform: `translateX(${showWindow ? 0 : -100}%)`, // Use translateX for horizontal movement
  });

  return (
    <div className="absolute bg-indigo-950 top-[100px]">
      <button
        onClick={() => setShowWindow(!showWindow)}
        className="absolute top-2 left-4 bg-white p-2 rounded-full cursor-pointer "
      >
        {/* Add your button icon (downward arrow) */}
        {/* For example, you can use an SVG or an icon library */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-indigo-950"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Animated window */}
      <animated.div
        style={{ ...windowAnimation, width: showWindow ? '25%' : '0%' }}
        className="bg-transparent p-6 text-white rounded-md absolute top-16  left-4 right-5 h-[500px] z-40"
      >
        {/* Content inside the animated window */}
        <h2 className="text-xl font-bold mb-4 z-40">Your Animated Window Content</h2>
        <p>This is some content inside the animated window.</p>
      </animated.div>
    </div>
  );
};

export default Menu;
