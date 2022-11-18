import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from '~/scss/components/PlaylistCard.module.scss';
import { Thumbnail } from '~/components';
import { classNames } from '~/utils';
import { Col, Flexbox, Text } from '~/components/Ui';
import { PauseIcon } from '~/components/Icons';
import { useNavigate } from 'react-router-dom';
import { routes } from '~/configs';

const cx = classNames.bind(styles);

const PlaylistCard = (props) => {
  const { thumbnail, title, dateModify, numOfItems, _key, ...prop } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${routes.playlist}/${_key}?type=playlist`);
  };
  return (
    <Col lg={3} className={cx('playlist-card-wrapper')} onClick={handleClick}>
      <Thumbnail className={cx('playlist-card', 'relative')} src={thumbnail}>
        <div className={cx('playlist-card__content')}>
          <Flexbox column className={cx('playlist-card__content-top')}>
            <Text fz={24} maxLine={2}>
              {title || 'Limits'}
            </Text>
            <Text fz={10} className={'op-3'}>
              {dateModify || 'John watts'}
            </Text>
          </Flexbox>
          <Text fz={10} className={cx('like-amounts')}>
            {numOfItems ? `${numOfItems} items` : '2.3m likes'}
          </Text>
        </div>
        <Flexbox alignCenter justifyCenter className={cx('playlist-card__play', 'rounded', 'pointer')}>
          <PauseIcon className={cx('cl-secondary')} />
        </Flexbox>
      </Thumbnail>
    </Col>
  );
};

PlaylistCard.propTypes = {};

export default PlaylistCard;
