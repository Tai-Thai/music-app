import React, { useEffect, useState } from 'react';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { classNames } from '~/utils';
import ChartCard from './ChartCard';
import styles from '~/scss/pages/Home/Home.module.scss';
import ListSongs from './ListSongs';
import { getHome, getSong } from '~/api';

const cx = classNames.bind(styles);

function Home() {
  const [data, setData] = useState({});
  const [getDataError, setGetDataError] = useState('error');
  useEffect(() => {
    console.log('effect HOME===============');
    console.log({ getDataError: getDataError });
    if (!getDataError.includes('success')) {
      getHome()
        .then((data) => {
          console.log(data);
          if (data.status === 'error') {
            // setGetDataError('error' + Date.now());
            return;
          }
          setData(data);
          setGetDataError('success');
          // data.song.forEach((item) => {
          //   const results = getSong(item.key).then((data) => console.log(data));
          // });
          // data.top100[0]
        })
        .catch((err) => setGetDataError('error' + Date.now()));
    }
    return;
  }, [getDataError]);
  return (
    <div className=''>
      <Grid className={cx('top-container')}>
        <Col lg={8}>
          <Flexbox className={cx('banner-wrapper')}>
            <img src='https://media.tenor.com/CmmcCKa-pGUAAAAC/anime-banner.gif' alt='' className={cx('banner')} />
          </Flexbox>
        </Col>
        <Col lg={4}>
          <Flexbox column className={cx('h-100')}>
            <Text tagName={'h3'} bold fz={24}>
              Ranking
            </Text>
            <Flexbox column className={cx('ranking-content', 'pt-4')} gy={1}>
              {data?.ranking?.song.map((item) => (
                <ChartCard key={item.songKey} {...item} />
              ))}
            </Flexbox>
          </Flexbox>
        </Col>
      </Grid>

      <div className={'mt-6'}>
        {console.log(data)}
        <ListSongs data={data?.newRelease?.song || []} title={`New Releases`} />
        <ListSongs data={data?.top100 || []} title={`Top 100`} />
        <ListSongs data={data?.topic || []} title={`Topic`} />
      </div>
    </div>
  );
}

export default Home;
