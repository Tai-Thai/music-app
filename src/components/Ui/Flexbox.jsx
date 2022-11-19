import React from 'react';
import PropTypes from 'prop-types';
import { classNames as cx } from '~/utils';

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
  justifyCenter = false,
  justifyBetween = false,
  justifyAround = false,
  justifyEvenly = false,
  justifyEnd = false,
  justifyStart = false,
  gx,
  gy,
  ...props
}) => {
  // const _className = className || '';
  const _justify = checkProps(
    { check: justifyCenter, result: `justify-content-center` },
    { check: justifyBetween, result: `justify-content-between` },
    { check: justifyAround, result: `justify-content-around` },
    { check: justifyEvenly, result: `justify-content-evenly` },
    { check: justifyEnd, result: `justify-content-end` },
    { check: justifyStart, result: `justify-content-start` }
  );

  const _alignItems = checkProps(
    { check: alignCenter, result: `align-items-center` },
    { check: alignStart, result: `align-items-start` },
    { check: alignEnd, result: `align-items-end` }
  );
  const _direction = checkProps(
    { check: column, result: `flex-column` },
    { check: columnReverse, result: `flex-column-reverse` },
    { check: row, result: `flex-row` },
    { check: rowReverse, result: `flex-row-reverse` }
  );

  const _wrap = wrap ? `flex-wrap` : '';

  const _className = cx('d-flex', className || '', {
    [_justify]: _justify,
    [_alignItems]: _alignItems,
    [_direction]: _direction,
    [_wrap]: _wrap,
    [`gx-${gx}`]: gx == 0 ? true : gx,
    [`gy-${gy}`]: gy == 0 ? true : gy
  });

  return (
    <div className={_className} {...props}>
      {children}
    </div>
  );
};

const checkProps = (...arrProps) => {
  for (let props of arrProps) {
    if (props.check) return props.result;
  }
  return '';
};

Flexbox.propTypes = {
  children: PropTypes.any,
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
  justifyEvenly: PropTypes.bool,
  justifyEnd: PropTypes.bool,
  justifyStart: PropTypes.bool
};
