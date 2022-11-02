import React from 'react';
import PropTypes from 'prop-types';

export const Flexbox = ({
  children,
  className,
  column = false,
  columnReverse = false,
  row = false,
  rowReverse = false,
  wrap = false,
  alignCenter = false,
  alignStart = false,
  alignEnd = false,
  justifyBetween = false,
  justifyAround = false,
  justifyEvenly = false
}) => {
  const _className = className ? className : '';
  const _justify =
    checkProps(
      { check: justifyBetween, result: `justify-content-between` },
      { check: justifyAround, result: `justify-content-around` },
      { check: justifyEvenly, result: `justify-content-evenly` }
    ) || '';

  const _alignItems =
    checkProps(
      { check: alignCenter, result: `align-items-center` },
      { check: alignStart, result: `align-items-start` },
      { check: alignEnd, result: `align-items-end` }
    ) || '';
  const _direction =
    checkProps(
      { check: column, result: `flex-column` },
      { check: columnReverse, result: `flex-column-reverse` },
      { check: row, result: `flex-row` },
      { check: rowReverse, result: `flex-row-reverse` }
    ) || '';

  const _wrap = wrap ? `flex-wrap` : '';

  return <div className={`d-flex ${_justify} ${_alignItems} ${_direction} ${_wrap} ${_className}`.trim()}>{children}</div>;
};

const checkProps = (...arrProps) => {
  for (let props of arrProps) {
    if (props.check) return props.result;
  }
};

Flexbox.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  column: PropTypes.bool,
  columnReverse: PropTypes.bool,
  row: PropTypes.bool,
  rowReverse: PropTypes.bool,
  wrap: PropTypes.bool,
  alignCenter: PropTypes.bool,
  alignStart: PropTypes.bool,
  alignEnd: PropTypes.bool,
  justifyBetween: PropTypes.bool,
  justifyAround: PropTypes.bool,
  justifyEvenly: PropTypes.bool
};
