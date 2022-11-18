import React, { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { Favorites, Thumbnail } from '~/components';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Playlist.module.scss';
import { MoreVerticalIcon } from '~/components/Icons';
import { setCurrentSongId, setIndexCurrentSong, pushListenedSongs } from '~/features/playlist/playlistSlice';
import { useDispatch } from 'react-redux';
import { routes } from '~/configs';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const SongItem = (props, ref) => {
  const {
    songKey,
    title,
    thumbnail,
    artists: [artist],
    duration,
    type,
    index,
    activeSong,
    ...prop
  } = props;
  const [favorites, setFavorites] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showMoreRef = useRef(null);
  const handleClick = (e) => {
    if (e.target === showMoreRef.current) {
      console.log('show more-vertical icon');
      return;
    } else {
      if (type === 'topic') {
        navigate(`${routes.playlist}/${songKey}?type=playlist`);
        return;
      }
      dispatch(setIndexCurrentSong(index));
      dispatch(pushListenedSongs(index));
    }
  };
  return (
    <div ref={ref} className={cx('song-item-wrapper', 'p-2 mb-2', { active: activeSong })} onClick={handleClick}>
      <Grid className={'align-items-center text-align-left'}>
        <Col lg={2}>
          <Grid className={'align-items-center'} gx={1}>
            <Col lg={5}>
              <Thumbnail src={thumbnail} equalizer={activeSong} />
            </Col>
            <Col lg={5}>
              <Favorites active={favorites} border={false} className={cx('favorites')} onClick={() => setFavorites(!favorites)} />
            </Col>
          </Grid>
        </Col>
        <Col lg={'fill'}>
          <Flexbox alignCenter justifyBetween className={cx('song-item-detail')}>
            <Text fz={12} maxLine={1}>
              {title}
            </Text>
            <Text fz={12} maxLine={1}>
              {artist.name}
            </Text>
            <Text fz={12} maxLine={1}>
              {duration}
            </Text>
            <MoreVerticalIcon
              ref={showMoreRef}
              className={cx('more-vertical-icon', 'cl-secondary pointer')}
              // onClick={() => console.log('show more options')}
            />
          </Flexbox>
        </Col>
      </Grid>
    </div>
  );
};

export default forwardRef(SongItem);
