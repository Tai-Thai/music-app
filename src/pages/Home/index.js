import React from 'react';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { classNames } from '~/utils';
import ChartCard from './ChartCard';
import styles from '~/scss/pages/Home/Home.module.scss';
import ListSongs from './ListSongs';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className=''>
      <Grid>
        <Col lg={8}>
          <Flexbox className={cx('banner-wrapper')}>
            <img src='https://media.tenor.com/CmmcCKa-pGUAAAAC/anime-banner.gif' alt='' className={cx('banner')} />
          </Flexbox>
        </Col>
        <Col lg={4}>
          <Text tagName={'h3'} bold fz={24}>
            Top charts
          </Text>
          <Flexbox column className={'pt-4'} gy={1}>
            <ChartCard />
            <ChartCard />
            <ChartCard />
          </Flexbox>
        </Col>
      </Grid>

      <div className={'mt-6'}>
        <ListSongs />
        <ListSongs />
        <ListSongs />
      </div>
    </div>
  );
}

export default Home;
