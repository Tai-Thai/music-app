import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import styles from '~/scss/components/Thumbnail.module.scss';
import { Skeleton } from './Skeleton';

const cx = classNames.bind(styles);

const Thumbnail = ({ children, className, src, equalizer = false, avatar = false, ...props }) => {
  const _className = cx('thumbnail', 'relative', className, { rounded: avatar });
  return (
    <Skeleton className={_className} style={{ backgroundImage: `url(${src})` }} {...props}>
      {children}
      {equalizer && <div className={cx('equalizer')}></div>}
    </Skeleton>
  );
};

Thumbnail.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  src: PropTypes.string,
  equalizer: PropTypes.bool
};

export default Thumbnail;
