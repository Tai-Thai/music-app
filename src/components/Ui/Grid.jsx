import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import styles from '~/scss/components/Ui/Grid.module.scss';

const cx = classNames.bind(styles);

export function Grid({ children, className, gutter }) {
  const _gutter = gutter && _gutterList.includes(gutter);
  const _className = className || '';
  return <div className={`${cx('row')} ${_className} ${_gutter ? cx(`gx-${_gutter}`) : ''}`.trim()}>{children}</div>;
}

export function Col({ children, className, sm, md, lg }) {
  const _sm = sm ? `col-sm-${sm}` : '';
  const _md = md ? `col-md-${md}` : '';
  const _lg = lg ? `col-${lg}` : '';
  const _className = className || '';
  return <div className={`${cx(_lg)} ${_className} ${cx(_sm)} ${cx(_md)}`.trim()}>{children}</div>;
}

// [0,..,6] array gutter css - ex: gutter-0, gutter-1, gutter-2, gutter-6
const _gutterList = [0, 1, 2, 3, 4, 5, 6];
const _columnList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'fill'];

Grid.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  gutter: PropTypes.oneOf(_gutterList)
};
Col.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  sm: PropTypes.oneOf(_columnList),
  md: PropTypes.oneOf(_columnList),
  lg: PropTypes.oneOf(_columnList)
};
