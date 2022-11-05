import React from 'react';
import PropTypes from 'prop-types';
import styles from '~/scss/components/Ui/Text.module.scss';
import { classNames } from '~/utils';
const cx = classNames.bind(styles);

export const Text = ({ children, className, tagName = 'span', textAlign, bold, uppercase, capitalize, fz, ...props }) => {
  const Type = tagName;

  const _className = cx(className, { bold, uppercase, capitalize, [`fz-${fz}`]: fz, [`text-${textAlign}`]: textAlign });

  return (
    <Type className={_className} {...props}>
      {children}
    </Type>
  );
};

Text.propTypes = {
  children: PropTypes.any.isRequired,
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
  className: PropTypes.string,
  tagName: PropTypes.string,
  bold: PropTypes.bool,
  uppercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  fz: PropTypes.oneOf([10, 12, 14, 17, 20, 24, 29, 35])
};
