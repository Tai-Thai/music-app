import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, Grid, Col, Text } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Home/Home.module.scss';
import { Thumbnail } from '~/components';
import { useDispatch } from 'react-redux';
import { setCurrentSongId } from '~/features/playlist/playlistSlice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ListSongs = ({ data, title, itemType, ...props }) => {
  const container = useRef();
  const listSongs = useRef();
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    const _container = container.current;
    const _listSongs = listSongs.current;
    let isMouseDown = false;
    let startX = 0;
    let scrollLeft = 0;

    // console.log(listSongs.current);
    // console.log({ container, listSongs });

    const handleMouseDown = (e) => {
      e.target.style.cursor = 'grabbing';
      isMouseDown = true;
      setIsScrolling(false);
      startX = e.pageX - _listSongs.offsetLeft; // set index mouse when mousedown

      scrollLeft = _listSongs.scrollLeft; // get left of scrollbar when mousedown
      // console.log({ container: e.offsetX, listSongs: _listSongs.offsetLeft, pageX: e.pageX, startX});
    };

    const handleMouseLeave_Up = (e) => {
      e.target.style.cursor = 'grab';
      isMouseDown = false;
      // setTimeout(() => {
      //   setIsScrolling(false);
      //   console.log('set mouse down = false');
      // }, 10);
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      e.target.style.cursor = 'grabbing';
      // e.preventDefault();
      const x = e.pageX - _listSongs.offsetLeft; // get index mouse when mouse move
      // console.log({ x, startX, move: x - startX, pageX: e.pageX, _listSongs: _listSongs.offsetLeft });
      // left of scrollbar when mousedown - (current index mouse - index mouse when mousedown)
      _listSongs.scrollLeft = scrollLeft - (x - startX);
      // console.log({ scrollLeft, x, startX, move: scrollLeft - (x - startX) });
      setIsScrolling(true);
    };

    _container.addEventListener('mousedown', handleMouseDown);
    _container.addEventListener('mouseup', handleMouseLeave_Up);
    _container.addEventListener('mouseleave', handleMouseLeave_Up);
    _container.addEventListener('mousemove', handleMouseMove);

    return () => {
      _container.removeEventListener('mousedown', handleMouseDown);
      _container.removeEventListener('mouseup', handleMouseLeave_Up);
      _container.removeEventListener('mouseleave', handleMouseLeave_Up);
      _container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Text bold fz={24} className={'my-2 mt-4'}>
        {title}
      </Text>
      <div ref={container} className={cx('container-songs')}>
        <div ref={listSongs} className={cx('list-songs', 'd-flex', 'gx-3')}>
          {data?.map((songItem) => {
            return (
              <SongItem
                key={songItem.key || songItem.songKey}
                isScrolling={isScrolling}
                songKey={songItem.key || songItem.songKey}
                itemType={itemType}
                {...songItem}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const SongItem = ({ songKey, thumbnail, thumbURL, title, artists, itemType, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSetCurrentSong = () => {
    // if container is scrolling => return
    if (props.isScrolling) return;
    console.log({ songKey });
    if (itemType === 'song') {
      dispatch(setCurrentSongId(songKey));
    } else {
      navigate(`/playlist/${songKey}?type=${itemType}`);
    }
  };

  return (
    <div className={cx('song-item', 'pointer')} onClick={handleSetCurrentSong}>
      <Flexbox column gx={0}>
        <Thumbnail className={cx('mb-1')} src={thumbnail || thumbURL} />
        <div>
          <Text maxLine={2} fz={12} className={cx('my-1')}>
            {title}
          </Text>
        </div>
        <Text fz={12} className={cx('op-2')}>
          {artists && artists[0] ? artists[0].name : ''}
        </Text>
      </Flexbox>
    </div>
  );
};

ListSongs.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  artists: PropTypes.array,
  itemType: PropTypes.oneOf(['song', 'playlist', 'topic'])
};

export default ListSongs;
