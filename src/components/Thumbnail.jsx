import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import styles from '~/scss/components/Thumbnail.module.scss';

const cx = classNames.bind(styles);

const Thumbnail = ({ children, className, src, equalizer = false, ...props }) => {
  const _className = cx('thumbnail', 'relative', className);
  return (
    <div className={_className} style={{ backgroundImage: `url(${src})` }} {...props}>
      {children}
      {equalizer && <div className={cx('equalizer')}></div>}
    </div>
  );
};

Thumbnail.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  src: PropTypes.string,
  equalizer: PropTypes.bool
};

export default Thumbnail;
