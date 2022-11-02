import React from 'react';

export function Container({ children, className }) {
  return <div className={`container ${className ? className : ''}`}>{children}</div>;
}
