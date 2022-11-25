import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, Grid, Col, Text } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Home/Home.module.scss';
import { Favorites, SkeletonContainer, Thumbnail } from '~/components';
import { useDispatch } from 'react-redux';
import { setCurrentSongId } from '~/features/playlist/playlistSlice';

const cx = classNames.bind(styles);

const ChartCard = ({ encodeId, title, thumbnail, artist, position, isLoading = false }) => {
  const [favorites, setFavorites] = useState(false);
  const dispatch = useDispatch();

  const handleSetCurrentSong = () => dispatch(setCurrentSongId(encodeId));

  return (
    <SkeletonContainer
      className={cx('p-3 bg-dark-alt', 'chart-card', 'pointer')}
      isLoading={isLoading}
      skeletonColor={'#f5f8fc'}
      onClick={handleSetCurrentSong}
    >
      <Grid gx={1} className={cx('chart-card-grid', 'align-items-center')}>
        <Col lg={3} className='mr-1'>
          <Thumbnail src={thumbnail} isLoading={isLoading} />
        </Col>
        <Col lg={7} className={'h-100'}>
          <Flexbox column justifyBetween gy={0} className={cx('h-100')}>
            <Text maxLine={1} isLoading={isLoading} fz={17}>
              {title}
            </Text>
            <Text maxLine={1} isLoading={isLoading} fz={12} skeletonWidth={'65%'} className={cx('op-2')}>
              {artist ? artist.name : ''}
            </Text>
            <Text isLoading={isLoading} fz={12} skeletonWidth={'30%'} skeletonHeight={'15px'} className={cx('top-index')}>
              Top {position + 1}
            </Text>
          </Flexbox>
        </Col>
        <Col lg={2}>
          {isLoading || <Favorites active={favorites} className={cx('favorites')} onClick={() => setFavorites(!favorites)} />}
        </Col>
      </Grid>
    </SkeletonContainer>
  );
};

ChartCard.propTypes = {};

export default ChartCard;
