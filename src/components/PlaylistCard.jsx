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
  const { thumbnail, className, title, dateModify, numOfItems, artistsNames, thumbnailM, textType, encodeId, isLoading, ...prop } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${routes.playlist}/${encodeId}?type=playlist`);
  };
  return (
    <div className={cx('playlist-card-wrapper', className)} onClick={handleClick}>
      <Thumbnail className={cx('playlist-card', 'relative')} isLoading={isLoading} src={thumbnailM || thumbnail}>
        <div className={cx('playlist-card__content')}>
          <Flexbox column className={cx('playlist-card__content-top', 'pb-2')}>
            <Text fz={24} maxLine={2} bold>
              {title || 'Limits'}
            </Text>
            <Text fz={14} maxLine={1} className={'op-3'}>
              {artistsNames || 'Tai Thai'}
            </Text>
          </Flexbox>
          <Text fz={10} maxLine={1} className={cx('like-amounts')}>
            {textType}
          </Text>
        </div>
        <Flexbox alignCenter justifyCenter className={cx('playlist-card__play', 'rounded', 'pointer')}>
          <PauseIcon className={cx('cl-secondary')} />
        </Flexbox>
      </Thumbnail>
    </div>
  );
};

PlaylistCard.propTypes = {};

export default PlaylistCard;
