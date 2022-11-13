import React, { useEffect, useState } from 'react';
import { Favorites, Thumbnail } from '~/components';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { classNames } from '~/utils';
import { AddCollectionIcon, PlayAllIcon } from '~/components/Icons';
import SongItem from './SongItem';
import styles from '~/scss/pages/Playlist.module.scss';

const cx = classNames.bind(styles);

function Playlist({ setBackgroundImage }) {
  const [favorites, setFavorites] = useState(false);
  useEffect(() => {
    setBackgroundImage('https://mir-s3-cdn-cf.behance.net/project_modules/1400/04d7d2105464265.617b69951ef14.png');
    return () => {};
  }, []);

  return (
    <div>
      <Grid gx={0}>
        <Col lg={4}>
          <Thumbnail
            className={cx('thumbnail')}
            src={'https://mir-s3-cdn-cf.behance.net/project_modules/1400/04d7d2105464265.617b69951ef14.png'}
          />
        </Col>
        <Col lg={'5'}>
          <Flexbox column justifyEnd className={cx('h-100')}>
            <Flexbox column gy={1}>
              <Text tagName={'h3'} fz={35} className={'cl-alt'}>
                Tomorrow's tunes
              </Text>
              <Text fz={14}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione doloribus, nostrum, aut possimus voluptates necessitatibus
              </Text>
              <Text fz={14}>64 songs ~ 16 hrs+</Text>
            </Flexbox>
            <Flexbox className='mt-6'>
              <div className={cx('action-btn', 'rounded px-3 py-2 d-flex align-items-center justify-content-center mr-2 pointer')}>
                <PlayAllIcon className={cx('icon', 'cl-secondary', 'mr-2')} />
                <Text fz={12}>Play all</Text>
              </div>
              <div className={cx('action-btn', 'rounded px-3 py-2 d-flex align-items-center justify-content-center mr-2 pointer')}>
                <AddCollectionIcon className={cx('icon', 'cl-secondary', 'mr-2')} />
                <Text fz={12}>Add to collection</Text>
              </div>
              <div
                className={cx(
                  'favorites-btn',
                  'action-btn',
                  'rounded px-2 py-2 d-flex align-items-center justify-content-center mr-2 pointer w-fit'
                )}
                onClick={() => setFavorites(!favorites)}
              >
                <Favorites activeClass={cx('favorites-active')} active={favorites} border={false} />
              </div>
            </Flexbox>
          </Flexbox>
        </Col>
      </Grid>

      <div className='mt-6'>
        <SongItem />
        <SongItem />
        <SongItem />
        <SongItem />
      </div>
    </div>
  );
}

export default Playlist;
