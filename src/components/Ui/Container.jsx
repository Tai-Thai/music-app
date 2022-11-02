import React from 'react';

export function Container({ children, className }) {
  return <div className={`container ${className || ''}`.trim()}>{children}</div>;
}
