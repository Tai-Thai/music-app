import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import styles from '~/scss/components/Favorites.module.scss';
import { HeartIcon } from './Icons';

const cx = classNames.bind(styles);

const Favorites = ({ className, activeClass, active = false, ...props }) => {
  const _classActive = cx({ active, [activeClass || '']: active });
  return (
    <div className={cx('wrapper', className)}>
      <HeartIcon className={cx('favorites', _classActive)} />
      <span className={cx('favorites-border', _classActive)} {...props}></span>
    </div>
  );
};

Favorites.propTypes = {};

export default Favorites;
