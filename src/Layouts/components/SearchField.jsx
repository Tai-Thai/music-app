import React, { useEffect, useState } from 'react';
import { classNames, formatFollower } from '~/utils';
import { Container, Grid, Col, Flexbox, Text } from '~/components/Ui';
import styles from '~/scss/layouts/SearchField.module.scss';
import { Thumbnail, Tippy } from '~/components';
import { MoreVerticalIcon, SearchIcon } from '~/components/Icons';
import { useDebounce, useFetch } from '~/hooks';
import { routes } from '~/configs';
import { useNavigate } from 'react-router-dom';
import { setCurrentSongId } from '~/features/playlist/playlistSlice';
import { useDispatch } from 'react-redux';
import ArtistCard from '~/components/ArtistCard';
import SongCardHorizontal from '~/components/SongCardHorizontal';

const cx = classNames.bind(styles);

function SearchField() {
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log({ showModal: showModal });

  const debouncedValue = useDebounce(inputValue);
  const { data: searchData, isLoading } = useFetch(`/search?keyword=${debouncedValue}`);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleShowModal = () => setShowModal(true);
  // const handleHideModal = () => setShowModal(false);
  const handleClickPlaylist = (encodeId) => {
    if (isLoading) return;
    navigate(`${routes.playlist}/${encodeId}`);
    setShowModal(false);
  };

  const handleClickSong = (encodeId) => {
    if (isLoading) return;
    dispatch(setCurrentSongId(encodeId));
    setShowModal(false);
  };

  const handleClickKeyword = () => {
    if (isLoading) return;
    navigate(`${routes.search}?q=${debouncedValue}`); // use Link can't close modal
    setShowModal(false);
  };

  // fix
  useEffect(() => {
    console.log({ searchData });
  }, [searchData]);

  return (
    <Tippy
      render={() => (
        <div className={cx('search-container', 'bg-dark-alt', 'py-3 px-2')}>
          <div>
            <Text fz={16} bold className={cx('p-1')} isLoading={isLoading} skeletonWidth={'30%'}>
              Keywords
            </Text>
            <Flexbox>
              <SearchKeyword keyword={debouncedValue} isLoading={isLoading} onClick={handleClickKeyword} />
            </Flexbox>
          </div>
          {(function () {
            const topData = searchData?.data?.top;
            if (topData?.objectType === 'song') {
              return (
                <div>
                  <Text fz={16} bold className={cx('p-1')} isLoading={isLoading} skeletonWidth={'30%'}>
                    Top
                  </Text>
                  <Flexbox column>
                    <SongCardHorizontal
                      key={topData.encodeId}
                      isLoading={isLoading}
                      onClick={() => handleClickSong(topData.encodeId)}
                      {...topData}
                    />
                  </Flexbox>
                </div>
              );
            } else if (topData?.objectType === 'artist') {
              return (
                <div>
                  <Text fz={16} bold className={cx('p-1')} isLoading={isLoading} skeletonWidth={'30%'}>
                    Top
                  </Text>
                  <Flexbox column>
                    <ArtistCard key={topData.id} isLoading={isLoading} {...topData} />
                  </Flexbox>
                </div>
              );
            }
          })()}
          <div>
            <Text fz={16} bold className={cx('p-1')} isLoading={isLoading} skeletonWidth={'30%'}>
              Goi y tim kiem
            </Text>
            <Flexbox column>
              {searchData?.data?.artists &&
                searchData?.data?.artists.slice(0, 2).map((artist) => <ArtistCard key={artist.id} isLoading={isLoading} {...artist} />)}
              {searchData?.data?.playlists &&
                searchData?.data?.playlists
                  .slice(0, 1)
                  .map((playlist) => (
                    <SongCardHorizontal
                      key={playlist.encodeId}
                      isLoading={isLoading}
                      onClick={() => handleClickPlaylist(playlist.encodeId)}
                      {...playlist}
                    />
                  ))}
              {searchData?.data?.songs &&
                searchData?.data?.songs
                  .slice(0, 3)
                  .map((song) => (
                    <SongCardHorizontal
                      key={song.encodeId}
                      isLoading={isLoading}
                      onClick={() => handleClickSong(song.encodeId)}
                      {...song}
                    />
                  ))}
              {searchData?.data?.topSuggest &&
                searchData?.data?.topSuggest
                  .slice(0, 6)
                  .map((playlist) => (
                    <SongCardHorizontal
                      key={playlist.encodeId}
                      isLoading={isLoading}
                      onClick={() => handleClickPlaylist(playlist.encodeId)}
                      {...playlist}
                    />
                  ))}
            </Flexbox>
          </div>
        </div>
      )}
      isShow={showModal}
      placement={'bottom-start'}
      interactive
      className={cx('search-modal-container')}
    >
      <div className={cx('relative')}>
        <input
          type='text'
          className={cx('search-field', 'mx-2')}
          placeholder={'Search'}
          onChange={handleInputChange}
          onFocus={handleShowModal}
          // onBlur={handleHideModal}
        />
        <span className={cx('search-field-underline')}></span>
      </div>
    </Tippy>
  );
}

const SearchKeyword = ({ keyword, isLoading, ...props }) => {
  return (
    <Flexbox alignCenter className={cx('search-keyword-container', 'p-2', 'w-100', 'pointer')} {...props}>
      <div className={cx('search-keyword-icon', 'mr-2')}>
        <SearchIcon />
      </div>
      <Text fz={15} className={cx('cl-white')} isLoading={isLoading} maxLine={1} skeletonWidth={'40%'}>
        {keyword}
      </Text>
    </Flexbox>
  );
};

export default SearchField;
