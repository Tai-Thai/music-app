import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, Grid, Col, Text } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Home/Home.module.scss';
import { Favorites, Thumbnail } from '~/components';
import { useDispatch } from 'react-redux';
import { setCurrentSongId } from '~/features/playlist/playlistSlice';

const cx = classNames.bind(styles);

const ChartCard = ({ songKey, title, thumbnail, artists, position }) => {
  const [favorites, setFavorites] = useState(false);
  const dispatch = useDispatch();

  const handleSetCurrentSong = () => dispatch(setCurrentSongId(songKey));

  return (
    <div className={cx('p-3 bg-dark-alt', 'chart-card')} onClick={handleSetCurrentSong}>
      <Grid gx={1} className={cx('chart-card-grid', 'align-items-center')}>
        <Col lg={3} className='mr-1'>
          <Thumbnail src={thumbnail} />
        </Col>
        <Col lg={7} className={'h-100'}>
          <Flexbox column justifyBetween gy={0} className={cx('h-100')}>
            <Text maxLine={1} fz={17}>
              {title}
            </Text>
            <Text maxLine={1} fz={12} className={cx('op-2')}>
              {artists[0] ? artists[0].name : ''}
            </Text>
            <Text fz={12} className={cx('top-index')}>
              Top {position}
            </Text>
          </Flexbox>
        </Col>
        <Col lg={2}>
          <Favorites active={favorites} className={cx('favorites')} onClick={() => setFavorites(!favorites)} />
        </Col>
      </Grid>
    </div>
  );
};

ChartCard.propTypes = {};

export default ChartCard;
