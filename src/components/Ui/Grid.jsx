import React from 'react';
import PropTypes from 'prop-types';

export function Grid({ children, className, gutter }) {
  // [0,..,6] array gutter css - ex: gutter-0, gutter-1, gutter-2, gutter-6
  const _gutterList = [0, 1, 2, 3, 4, 5, 6];
  const _gutter = gutter && _gutterList.includes(gutter);
  const _className = className ? className : '';
  return <div className={`row ${_className} ${_gutter ? `gx-${_gutter}` : ''}`.trim()}>{children}</div>;
}

export function Col({ children, className, sm, md, lg }) {
  const _columnList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'fill'];
  const _sm = _columnList.includes(sm) ? `col-sm-${sm}` : '';
  const _md = _columnList.includes(md) ? `col-md-${md}` : '';
  const _lg = _columnList.includes(lg) ? `col-${lg}` : '';
  const _className = className ? className : '';
  return <div className={`${_lg} ${_className} ${_sm} ${_md}`.trim()}>{children}</div>;
}

Grid.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  gutter: PropTypes.number
};
Col.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  sm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  md: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lg: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
