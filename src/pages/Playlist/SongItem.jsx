import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { Favorites, Thumbnail } from '~/components';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Playlist.module.scss';
import { MoreVerticalIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const SongItem = (props) => {
  const [favorites, setFavorites] = useState(false);
  return (
    <div className={cx('song-item-wrapper', 'p-2 mb-2')}>
      <Grid className={'align-items-center text-align-left'}>
        <Col lg={2}>
          <Grid className={'align-items-center'} gx={1}>
            <Col lg={5}>
              <Thumbnail src={'https://mir-s3-cdn-cf.behance.net/project_modules/1400/04d7d2105464265.617b69951ef14.png'} />
            </Col>
            <Col lg={5}>
              <Favorites active={favorites} border={false} className={cx('favorites')} onClick={() => setFavorites(!favorites)} />
            </Col>
          </Grid>
        </Col>
        <Col lg={'fill'}>
          <Flexbox alignCenter justifyBetween>
            <Text fz={12}>Let me love you - Krisx</Text>
            <Text fz={12}>Single</Text>
            <Text fz={12}>4:17</Text>
            <MoreVerticalIcon className={cx('more-vertical-icon', 'cl-secondary pointer')} />
          </Flexbox>
        </Col>
      </Grid>
    </div>
  );
};

SongItem.propTypes = {};

export default SongItem;
