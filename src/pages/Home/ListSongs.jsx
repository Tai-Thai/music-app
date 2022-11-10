import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Flexbox, Grid, Col, Text } from '~/components/Ui';
import { classNames } from '~/utils';
import styles from '~/scss/pages/Home/Home.module.scss';
import { Thumbnail } from '~/components';

const cx = classNames.bind(styles);

const ListSongs = ({ data, title, ...props }) => {
  console.log(data);
  const container = useRef();
  const listSongs = useRef();
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
      startX = e.pageX - _listSongs.offsetLeft; // set index mouse when mousedown

      scrollLeft = _listSongs.scrollLeft; // get left of scrollbar when mousedown
      // console.log({ container: e.offsetX, listSongs: _listSongs.offsetLeft, pageX: e.pageX, startX});
    };

    const handleMouseLeave_Up = (e) => {
      e.target.style.cursor = 'grab';
      isMouseDown = false;
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
          {!data ? (
            <>
              <SongItem src={'https://m.media-amazon.com/images/I/61bsF-NQA0L._SS500_.jpg'} />
              <SongItem src={'https://img.pikbest.com/06/13/62/112pIkbEsTdDy.jpg-1.jpg!bw700'} />
              <SongItem src={'https://intphcm.com/data/upload/1599105042-poster-am-nhac-3.jpg'} />
              <SongItem src={'https://img.pikbest.com/01/46/14/12mpIkbEsTYq6.jpg-0.jpg!bw700'} />
              <SongItem src={'https://intmt.vn/wp-content/uploads/2021/05/in-poster-quang-cao-ca-nhac.jpg'} />
              <SongItem src={'https://i.pinimg.com/564x/08/9f/3b/089f3bf38fe44130207294d9c18cfcf6--edm-music-various-artists.jpg'} />
              <SongItem src={'https://m.media-amazon.com/images/I/61bsF-NQA0L._SS500_.jpg'} />
              <SongItem src={'https://m.media-amazon.com/images/I/61bsF-NQA0L._SS500_.jpg'} />
              <SongItem src={'https://m.media-amazon.com/images/I/61bsF-NQA0L._SS500_.jpg'} />
              <SongItem src={'https://m.media-amazon.com/images/I/61bsF-NQA0L._SS500_.jpg'} />
            </>
          ) : (
            data?.map((songItem) => {
              console.log(songItem);
              return <SongItem {...songItem} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

const SongItem = ({ thumbnail, thumbURL, title, artists, ...props }) => {
  return (
    <div className={cx('song-item')}>
      <Flexbox column gx={0}>
        <Thumbnail className={cx('mb-1')} src={thumbnail || thumbURL} />
        <div>
          <Text fz={12} className={cx('my-1')}>
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
  artists: PropTypes.array
};

export default ListSongs;
