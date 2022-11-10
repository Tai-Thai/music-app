import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '~/utils';
import styles from '~/scss/components/Favorites.module.scss';
import { HeartIcon } from './Icons';

const cx = classNames.bind(styles);

const Favorites = ({ className, activeClass, active = false, border = true, ...props }) => {
  const _classActive = cx({ active });
  return (
    <div
      className={cx('wrapper', className, { [activeClass || '']: active }, 'd-flex align-items-center justify-content-center')}
      {...props}
    >
      <HeartIcon className={cx('favorites', _classActive)} />
      {border && <span className={cx('favorites-border', _classActive)}></span>}
    </div>
  );
};

Favorites.propTypes = {};

export default Favorites;
