import React, { useEffect, useState } from 'react';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { classNames } from '~/utils';
import ChartCard from './ChartCard';
import styles from '~/scss/pages/Home/Home.module.scss';
import ListSongs from './ListSongs';
import { getHome, getSong } from '~/apis';
import { mockApi, request } from '~/services';

const cx = classNames.bind(styles);

function Home() {
  const [data, setData] = useState({});
  const [getDataError, setGetDataError] = useState('error');
  useEffect(() => {
    // get api from NhacCuaTui
    // if (!getDataError.includes('success')) {
    //   getHome()
    //     .then((data) => {
    //       console.log('Home');
    //       console.log(data);
    //       if (data.status === 'error') {
    //         // setGetDataError('error' + Date.now());
    //         return;
    //       }
    //       setData(data);
    //       setGetDataError('success');
    //     })
    //     .catch((err) => setGetDataError('error' + Date.now()));
    // }
    // const data = mockApi.getHome();
    // setData(data);

    // Get data from zingmp3
    const fetchData = async () => {
      const response = await request.get('/home');
      console.log({ HomeData: response.data.items });
      setData(response.data.items);
    };
    // fetchData();
    return;
  }, [getDataError]);
  return (
    <div className=''>
      <Grid className={cx('top-container')}>
        <Col lg={8}>
          <Flexbox className={cx('banner-wrapper')}>
            <img src={data[0]?.items[1].banner} alt='' className={cx('banner')} />
          </Flexbox>
        </Col>
        <Col lg={4}>
          <Flexbox column className={cx('h-100')}>
            <Text tagName={'h3'} bold fz={24}>
              {data[7]?.title || 'Ranking'}
            </Text>
            <Flexbox column className={cx('ranking-content', 'pt-4')} gy={1}>
              {data[7]?.items.map((item, index) => (
                <ChartCard key={item.encodeId} {...item} position={index} />
              ))}
            </Flexbox>
          </Flexbox>
        </Col>
      </Grid>

      <div className={'mt-6'}>
        <ListSongs data={data[3]?.items.all || []} title={data[3]?.title} itemType={'song'} />
        <ListSongs data={data[10]?.items || []} title={data[10]?.title} itemType={'playlist'} />
        <ListSongs data={data[14]?.items || []} title={data[14]?.title} itemType={'playlist'} />
      </div>
    </div>
  );
}

export default Home;
