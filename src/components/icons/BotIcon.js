import React from 'react';

const BotIcon = ({ width = 50, height = 50, strokeWidth = 1, fill = "#0a0e21" }) => (
  <svg width={width} height={height} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="50%" r="50%">
        <stop offset="100%" stopColor="#F7BFB8"/>
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="60" fill="url(#bg)" />
    <g stroke={fill} strokeWidth={strokeWidth}>
      <circle cx="60" cy="60" r="32" fill="white"/>
      <rect x="40" y="45" width="40" height="30" rx="8" fill={fill}/>
      <circle cx="52" cy="60" r="4" fill="#FFEBEB"/>
      <circle cx="68" cy="60" r="4" fill="#FFEBEB"/>
      <rect x="57" y="68" width="6" height="3" rx="1.5" fill="white"/>
      <line x1="86" y1="44" x2="86" y2="30" stroke={fill} strokeWidth="2"/>
      <circle cx="86" cy="30" r="3" fill={fill}/>
      <rect x="85" y="50" width="8" height="12" rx="3" fill={fill}/>
      <rect x="27" y="50" width="8" height="12" rx="3" fill={fill}/>
    </g>
  </svg>
);

export default BotIcon;
