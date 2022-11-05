import React from 'react';
import { classNames } from '~/utils';

export function Container({ children, className, ...props }) {
  const _className = classNames('container', className || '');

  return (
    <div className={_className} {...props}>
      {children}
    </div>
  );
}
