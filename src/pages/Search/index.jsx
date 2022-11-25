import React, { useEffect, useState } from 'react';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Search.module.scss';
import ArtistCard from '~/components/ArtistCard';
import SongCardHorizontal from '~/components/SongCardHorizontal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFetch } from '~/hooks';
import { useDispatch } from 'react-redux';
import { routes } from '~/configs';
import { setCurrentSongId } from '~/features/playlist/playlistSlice';
import PlaylistCard from '~/components/PlaylistCard';
import ArtistItem from './ArtistItem';

const cx = classNames.bind(styles);

function Search() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: searchData, isLoading } = useFetch(`/search?keyword=${searchParams.get('q')}`);
  console.log({ searchData });
  const handleClickPlaylist = (encodeId) => {
    navigate(`${routes.playlist}/${encodeId}`);
  };

  const handleClickSong = (encodeId) => {
    dispatch(setCurrentSongId(encodeId));
  };

  const handleClickKeyword = () => {
    // navigate(`${routes.search}?q=${debouncedValue}`);
  };

  return (
    <div>
      <div className={cx('mb-6')}>
        <Text fz={20} bold className={cx('mb-3')}>
          Noi bat
        </Text>
        <Grid>
          {(function () {
            const topData = searchData?.data?.top;
            if (topData?.objectType === 'song') {
              return (
                <Col lg={4}>
                  <SongCardHorizontal
                    className={cx('top-card')}
                    thumbnailClassName={cx('top-thumbnail')}
                    isLoading={isLoading}
                    onClick={() => handleClickSong(topData.encodeId)}
                    {...topData}
                  />
                </Col>
              );
            } else if (topData?.objectType === 'artist') {
              return (
                <Col lg={4}>
                  <ArtistCard className={cx('top-card')} thumbnailClassName={cx('top-thumbnail')} isLoading={isLoading} {...topData} />
                </Col>
              );
            }
          })()}
          {searchData?.data?.songs?.slice(0, 2).map((song) => (
            <Col lg={4}>
              <SongCardHorizontal
                className={cx('top-card')}
                thumbnailClassName={cx('top-thumbnail')}
                key={song.encodeId}
                isLoading={isLoading}
                onClick={() => handleClickSong(song.encodeId)}
                {...song}
              />
            </Col>
          ))}
        </Grid>
      </div>
      <div className={cx('mb-6')}>
        <Text fz={20} bold className={cx('mb-3')}>
          Bai hat
        </Text>
        <Grid>
          {searchData?.data?.songs?.slice(0, 6).map((song) => (
            <Col lg={6}>
              <SongCardHorizontal
                //   className={cx('top-card')}
                //   thumbnailClassName={cx('top-thumbnail')}
                key={song.encodeId}
                isLoading={isLoading}
                onClick={() => handleClickSong(song.encodeId)}
                {...song}
              />
            </Col>
          ))}
        </Grid>
      </div>
      <div className={cx('mb-6')}>
        <Text fz={20} bold className={cx('mb-3')}>
          Playlist/Album
        </Text>
        <Grid>
          {searchData?.data?.playlists?.slice(0, 4).map((playlist) => (
            <Col lg={3} key={playlist.encodeId}>
              <PlaylistCard {...playlist} className={cx('playlist-card-container')} />
            </Col>
          ))}
        </Grid>
      </div>
      <div className={cx('mb-6')}>
        <Text fz={20} bold className={cx('mb-3')}>
          Nghe si/OA
        </Text>
        <Grid>
          {searchData?.data?.artists?.slice(0, 4).map((artist) => (
            <Col lg={3} key={artist.encodeId}>
              <ArtistItem {...artist} />
            </Col>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Search;
