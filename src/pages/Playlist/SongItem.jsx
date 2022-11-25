import React, { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { Favorites, SkeletonContainer, Thumbnail, Tippy } from '~/components';
import { classNames, seconds2time } from '~/utils';
import styles from '~/scss/pages/Playlist.module.scss';
import { MoreVerticalIcon } from '~/components/Icons';
import {
  setCurrentSongId,
  setIndexCurrentSong,
  pushListenedSongs,
  setPointerHistory,
  setCurrentPlaylistId
} from '~/features/playlist/playlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '~/configs';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const SongItem = (props, ref) => {
  const { encodeId, playlistKey, title, thumbnail, artists, duration, type, index, activeSong, isLoading, ...prop } = props;
  const [favorites, setFavorites] = useState(false);
  const { listenedSongs } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showMoreRef = useRef(null);
  const handleClick = (e) => {
    if (isLoading) return;
    if (e.target === showMoreRef.current) {
      console.log('show more-vertical icon');
      return;
    } else {
      // if (type === 'topic') {
      //   navigate(`${routes.playlist}/${encodeId}?type=playlist`);
      //   return;
      // }
      dispatch(setPointerHistory(listenedSongs.length));
      dispatch(setIndexCurrentSong(index));
      dispatch(setCurrentSongId(encodeId));
      dispatch(setCurrentPlaylistId(playlistKey));

      dispatch(pushListenedSongs(index));
    }
  };
  return (
    <SkeletonContainer
      skeletonColor={'#f5f8fc'}
      isLoading={isLoading}
      ref={ref}
      className={cx('song-item-wrapper', 'p-2 mb-2', 'pointer', { active: activeSong })}
      onClick={handleClick}
    >
      <Grid className={'align-items-center text-align-left'}>
        <Col lg={2}>
          <Grid className={'align-items-center'} gx={1}>
            <Col lg={5}>
              <Thumbnail isLoading={isLoading} src={thumbnail} equalizer={activeSong} />
            </Col>
            <Col lg={5}>
              {isLoading || (
                <Favorites active={favorites} border={false} className={cx('favorites')} onClick={() => setFavorites(!favorites)} />
              )}{' '}
            </Col>
          </Grid>
        </Col>
        <Col lg={'fill'}>
          <Flexbox alignCenter justifyBetween className={cx('song-item-detail')}>
            <Text fz={12} isLoading={isLoading} maxLine={1}>
              {title}
            </Text>
            <Text fz={12} isLoading={isLoading} maxLine={1}>
              {artists?.length > 0 && artists[0]?.name}
            </Text>
            <Text fz={12} isLoading={isLoading} maxLine={1}>
              {seconds2time(duration)}
            </Text>
            {isLoading || (
              <Tippy content={'Show more options'} placement={'top-end'} interactive>
                <MoreVerticalIcon
                  ref={showMoreRef}
                  className={cx('more-vertical-icon', 'cl-secondary pointer')}
                  // onClick={() => console.log('show more options')}
                />
              </Tippy>
            )}
          </Flexbox>
        </Col>
      </Grid>
    </SkeletonContainer>
  );
};

export default forwardRef(SongItem);
