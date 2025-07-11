import React from 'react';

const UserIcon = ({ width = 50, height = 50, fill = "#CFEBB3" }) => (
  <svg width={width} height={height} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" fill={fill} />
    <circle cx="60" cy="42" r="18" fill="white" />
    <path d="M30,90c0-16.57,13.43-30,30-30s30,13.43,30,30" fill="white" />
  </svg>
);

export default UserIcon;
