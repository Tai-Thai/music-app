import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Favorites, Thumbnail } from '~/components';
import { Grid, Col, Text, Flexbox } from '~/components/Ui';
import { classNames, seconds2time } from '~/utils';
import { AddCollectionIcon, PlayAllIcon } from '~/components/Icons';
import SongItem from './SongItem';
import styles from '~/scss/pages/Playlist.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPlaylistDetail, getPlaylists, getTopicDetail } from '~/apis';
import { useDispatch, useSelector } from 'react-redux';
import { removeListenedSongs, setPlaylist } from '~/features/playlist/playlistSlice';
import PlaylistCard from '~/components/PlaylistCard';
import { Tippy } from '~/components';
import { request } from '~/services';
import { useFetch } from '~/hooks';

const cx = classNames.bind(styles);

function Playlist({ setBackgroundImage }) {
  const { currentPlaylistId, indexCurrentSong, currentSongId, listenedSongs } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(false);
  const { playlistKey } = useParams();
  const [searchParams] = useSearchParams();
  const [topicData, setTopicData] = useState({});
  const [amountItem, setAmountItem] = useState(10); // amount item show
  // const [isLoading, setIsLoading] = useState(false);
  const dataType = searchParams.get('type');
  const ContainerList = dataType === 'topic' ? Grid : 'div';
  const { data: playlistData, isLoading } = useFetch(`/detailplaylist?id=${playlistKey || currentPlaylistId}`);
  console.log({ playlistData });

  const refs = useMemo(() => {
    return (
      playlistData?.data?.song?.items.reduce((acc, next, index) => {
        acc[`song-ref-${next.encodeId}`] = React.createRef();
        return acc;
      }, {}) || {}
    );
  }, [playlistData]);
  console.log({ refs });

  const handleRenderData = () => {
    let data = [];
    if (dataType === 'topic') {
      data = topicData?.playlist || [];
    } else {
      data = playlistData?.data?.song?.items || [];
    }

    console.log({ renderData: amountItem });
    return isLoading
      ? [1, 2, 3, 4, 5, 6].map((item, index) => (
          <SongItem
            ref={refs[`song-ref-${index}`]}
            key={index}
            isLoading={isLoading}
            activeSong={index === indexCurrentSong}
            index={index}
            {...item}
          />
        ))
      : data.slice(0, amountItem).map((item, index) => {
          if (dataType === 'topic') {
            return <PlaylistCard key={item.key} _key={item.key} {...item} />;
          }
          return (
            <SongItem
              ref={refs[`song-ref-${item.encodeId}`]}
              key={item.encodeId}
              activeSong={item.encodeId === currentSongId}
              index={index}
              playlistKey={playlistKey}
              {...item}
            />
          );
        });
  };

  const handleGetPlaylist = (apiMethod) => {
    // apiMethod(playlistKey).then((data) => {
    //   console.log({ data });
    //   if (dataType === 'topic') {
    //     setTopicData(data.topic);
    //   } else {
    //     dispatch(setPlaylist(data.playlist));
    //   }
    // });
  };

  // how many items will show
  useEffect(() => {
    // console.log('Amount item', { indexCurrentSong, currentPlaylistId, playlistKey });
    if (currentPlaylistId === playlistKey) {
      if (indexCurrentSong !== null) {
        // console.log('handle amount items', { indexCurrentSong });
        const itemsFerPage = 10; // 1 page = 10 items
        // if indexCurrentSong % 10 === 0 then 'no ceil' so indexCurrentSong have to + 1;
        const page = Math.ceil((indexCurrentSong + 1) / itemsFerPage);
        const newAmountItems = itemsFerPage * page;
        // console.log({ page, newAmountItems, page2: indexCurrentSong + 1 / itemsFerPage });

        setAmountItem((prevValue) => (prevValue > newAmountItems ? prevValue : newAmountItems));
        return;
      }
      // console.log('Amount item default');
    }
    // setAmountItem(10);

    return;
  }, [indexCurrentSong]);

  useEffect(() => {
    // scroll into view current song position
    if (currentSongId) {
      console.log('Scroll into view current song position');
      const currentSong = refs[`song-ref-${currentSongId}`]?.current;
      if (currentSong) {
        currentSong.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
    return;
  }, [currentSongId]);

  useEffect(() => {
    console.log({ playlistKey });
    // console.log({ searchParams: searchParams.get('type') });
    // const fetchData = async () => {
    //   setIsLoading(true);
    //   try {
    //     console.log('fetching data detail playlist');
    //     const response = await request.get(`/detailplaylist?id=${playlistKey}`);
    //     console.log({ response });
    //     dispatch(setPlaylist(response.data));
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchData();
    /*     setBackgroundImage('https://mir-s3-cdn-cf.behance.net/project_modules/1400/04d7d2105464265.617b69951ef14.png'); */
    return () => {};
  }, [playlistKey]);

  return (
    <div>
      <div className={cx('playlist-background')} style={{ backgroundImage: `url(${playlistData?.data?.thumbnailM})` }}></div>
      <Grid gx={0}>
        <Col lg={4}>
          <Thumbnail
            skeletonType={'thumbnail'}
            className={cx('thumbnail')}
            isLoading={isLoading}
            skeletonStyle={{ backgroundImage: 'url()' }}
            src={playlistData?.data?.thumbnailM || playlistData?.data?.thumbnail}
          />
        </Col>
        <Col lg={'5'}>
          <Flexbox column justifyEnd className={cx('h-100')}>
            <Flexbox column gy={1}>
              <Text tagName={'h3'} maxLine={2} fz={35} isLoading={isLoading} className={'cl-alt'}>
                {playlistData?.data?.title}
              </Text>
              <Text fz={14} maxLine={4} isLoading={isLoading} skeletonWidth={'60%'}>
                {isLoading ||
                  playlistData?.data?.description ||
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione doloribus, nostrum, aut possimus voluptates necessitatibus'}
              </Text>
              <Text fz={14} isLoading={isLoading} skeletonWidth={'40%'}>
                {playlistData?.data?.song?.total} songs ~ {seconds2time(playlistData?.data?.song?.totalDuration)} hrs+
              </Text>
            </Flexbox>
            {isLoading || (
              <Flexbox className='mt-6'>
                <Tippy>
                  <div className={cx('action-btn', 'rounded px-3 py-2 d-flex align-items-center justify-content-center mr-2 pointer')}>
                    <PlayAllIcon className={cx('icon', 'cl-secondary', 'mr-2')} />
                    <Text fz={12}>Play all</Text>
                  </div>
                </Tippy>
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
            )}
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
