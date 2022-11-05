import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import styles from '~/scss/components/Thumbnail.module.scss';

const cx = classNames.bind(styles);

const Thumbnail = ({ children, className, src, ...props }) => {
  const _className = cx('thumbnail', className);
  return (
    <div className={_className} style={{ backgroundImage: `url(${src})` }} {...props}>
      {children}
    </div>
  );
};

Thumbnail.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  src: PropTypes.string
};

export default Thumbnail;
