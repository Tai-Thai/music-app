import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import styles from '~/scss/components/Ui/Grid.module.scss';

const cx = classNames.bind(styles);

export function Grid({ children, className, gx, gy, column = false, ...props }) {
  const _className = cx('row', className || '', `gx-grid-${gx == 0 ? 0 : gx || 3}`, {
    [`gy-grid-${gy == 0 ? 0 : gy}`]: gy,
    [`grid-column`]: column
  });

  return (
    <div className={_className} {...props}>
      {children}
    </div>
  );
}

export function Col({ children, className, sm, md, lg, ...props }) {
  const _className = cx(className || '', {
    [`col-sm-${sm}`]: sm,
    [`col-md-${md}`]: md,
    [`col-${lg}`]: lg
  });

  return (
    <div className={_className} {...props}>
      {children}
    </div>
  );
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
