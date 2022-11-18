import React from 'react';
import { Col, Flexbox, Grid, Text } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Collection.module.scss';
import { Thumbnail } from '~/components';
import PlaylistCard from '../../components/PlaylistCard';

const cx = classNames.bind(styles);

function Collection() {
  return (
    <div>
      <Flexbox gx={2}>
        <div className={cx('cl-light py-2 px-4 rounded op-1', 'category-btn', 'active')}>
          <Text fz={14}>My collection</Text>
        </div>
        <div className={cx('cl-light py-2 px-4 rounded op-1', 'category-btn')}>
          <Text fz={14}>Likes</Text>
        </div>
      </Flexbox>
      <Grid className='mt-4' gy={3} gx={2}>
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
        <PlaylistCard />
      </Grid>
    </div>
  );
}

export default Collection;
