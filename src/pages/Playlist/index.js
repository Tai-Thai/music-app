import React, { useEffect, useRef, useState } from 'react';
import { Favorites, Thumbnail } from '~/components';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { classNames } from '~/utils';
import { AddCollectionIcon, PlayAllIcon } from '~/components/Icons';
import SongItem from './SongItem';
import styles from '~/scss/pages/Playlist.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPlaylistDetail, getPlaylists, getTopicDetail } from '~/api';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist } from '~/features/playlist/playlistSlice';
import PlaylistCard from '~/components/PlaylistCard';

const cx = classNames.bind(styles);

function Playlist({ setBackgroundImage }) {
  const { playlist, indexCurrentSong } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(false);
  const { playlistKey } = useParams();
  const [searchParams] = useSearchParams();
  const [topicData, setTopicData] = useState({});
  const dataType = searchParams.get('type');
  const ContainerList = dataType === 'topic' ? Grid : 'div';

  const refs =
    playlist?.songs?.reduce((acc, next, index) => {
      acc[`song-ref-${index}`] = React.createRef();
      return acc;
    }, {}) || {};

  const handleRenderData = () => {
    let data = [];
    if (dataType === 'topic') {
      data = topicData.playlist || [];
    } else {
      data = playlist?.songs || [];
    }

    console.log({ renderData: data });
    return data.slice(0, 10).map((item, index) => {
      if (dataType === 'topic') {
        return <PlaylistCard key={item.key} _key={item.key} {...item} />;
      }
      return (
        <SongItem
          ref={refs[`song-ref-${index}`]}
          key={item.key}
          activeSong={index === indexCurrentSong}
          songKey={item.key}
          index={index}
          {...item}
        />
      );
    });
  };

  const handleGetPlaylist = (apiMethod) => {
    apiMethod(playlistKey).then((data) => {
      console.log({ data });
      if (dataType === 'topic') {
        setTopicData(data.topic);
      } else {
        dispatch(setPlaylist(data.playlist));
      }
    });
  };

  useEffect(() => {
    if (indexCurrentSong) {
      const currentSong = refs[`song-ref-${indexCurrentSong}`]?.current;
      if (currentSong) {
        currentSong.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
    return;
  }, [indexCurrentSong]);

  useEffect(() => {
    console.log({ playlistKey });
    console.log({ searchParams: searchParams.get('type') });
    switch (dataType) {
      case 'topic':
        handleGetPlaylist(getTopicDetail);
        break;
      case 'playlist':
        handleGetPlaylist(getPlaylistDetail);
        break;
      default:
        break;
    }
    /*     setBackgroundImage('https://mir-s3-cdn-cf.behance.net/project_modules/1400/04d7d2105464265.617b69951ef14.png'); */
    return () => {};
  }, [playlistKey]);

  return (
    <div>
      <Grid gx={0}>
        <Col lg={4}>
          <Thumbnail className={cx('thumbnail')} src={dataType === 'playlist' ? playlist?.thumbnail : topicData?.coverImageURL} />
        </Col>
        <Col lg={'5'}>
          <Flexbox column justifyEnd className={cx('h-100')}>
            <Flexbox column gy={1}>
              <Text tagName={'h3'} maxLine={2} fz={35} className={'cl-alt'}>
                {dataType === 'playlist' ? playlist?.title : topicData.title}
              </Text>
              <Text fz={14}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione doloribus, nostrum, aut possimus voluptates necessitatibus
              </Text>
              <Text fz={14}>{playlist?.songs?.length} songs ~ 16 hrs+</Text>
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

      <ContainerList gy={3} className='mt-6'>
        {handleRenderData()}
      </ContainerList>
    </div>
  );
}

export default Playlist;
