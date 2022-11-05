import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, Grid, Col, Text } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Home/Home.module.scss';
import { Favorites, Thumbnail } from '~/components';

const cx = classNames.bind(styles);

const ChartCard = (props) => {
  const [favorites, setFavorites] = useState(false);

  return (
    <div className={cx('p-3 bg-dark-alt', 'chart-card')}>
      <Grid gx={1} className={cx('align-items-center')}>
        <Col lg={3} className='mr-1'>
          <div>
            <Thumbnail src={'https://wallpapers.oceanofwallpapers.com/wallpapers/previews/wallpaper-oxl6pp-126036-Preview.webp'} />
          </div>
        </Col>
        <Col lg={'fill'}>
          <Flexbox column justifyBetween gy={0} className={cx('h-100')}>
            <Text fz={17}>Golden age of 80s</Text>
            <Text fz={12} className={cx('op-2')}>
              Sean swadder
            </Text>
            <Text fz={12}>2:34:45</Text>
          </Flexbox>
        </Col>
        <Col lg={2}>
          {/* <div style={{ position: 'relative' }}>
            <HeartIcon className={cx('favorites')} />
            <span className={cx('favorites-border')}></span>
          </div> */}

          <Favorites active={favorites} onClick={() => setFavorites(!favorites)} />
        </Col>
      </Grid>
    </div>
  );
};

ChartCard.propTypes = {};

export default ChartCard;
