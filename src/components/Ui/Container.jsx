import React from 'react';
import { classNames } from '~/utils';

export function Container({ children, className }) {
  const _className = classNames('container', className || '');

  return <div className={_className}>{children}</div>;
}
