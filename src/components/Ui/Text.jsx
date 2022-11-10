import React from 'react';
import PropTypes from 'prop-types';
import styles from '~/scss/components/Ui/Text.module.scss';
import { classNames } from '~/utils';
const cx = classNames.bind(styles);

export const Text = ({ children, className, tagName = 'span', bold, uppercase, capitalize, fz, maxLine, ...props }) => {
  const Tag = tagName;

  const _className = cx(className, { bold, uppercase, capitalize, [`fz-${fz}`]: fz, [`max-line-${maxLine}`]: maxLine });

  return (
    <Tag className={_className} {...props}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  tagName: PropTypes.string,
  bold: PropTypes.bool,
  uppercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  fz: PropTypes.oneOf([10, 12, 14, 17, 20, 24, 29, 35]),
  maxLine: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};
