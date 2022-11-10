'use strict';
import * as axios_1 from 'https://cdn.skypack.dev/axios@1.1.3';
import * as js_sha512_1 from 'https://cdn.skypack.dev/js-sha512@0.8.0';
const PROXY_URL = 'https://nct.napdev.workers.dev/';
const API_URL = 'https://beta.nhaccuatui.com/api';
const API_KEY = 'e3afd4b6c89147258a56a641af16cc79';
const SECRET_KEY = '6847f1a4fc2f4eb6ab13f9084e082ef4';
const client = axios_1.default.create({
  baseURL: typeof window === 'object' ? PROXY_URL + API_URL : API_URL,
  params: {
    a: API_KEY
  }
});
client.interceptors.request.use((config) => {
  const now = String(Date.now());
  const hash = js_sha512_1.sha512.hmac(SECRET_KEY, now);
  config.params.t = now;
  config.params.s = hash;
  return config;
});
client.interceptors.response.use((res) => res.data);
const joinQueryString = (obj) =>
  Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
export const getHome = () => client.post('home');
export const getSong = (songId) => client.post('media/info', joinQueryString({ key: songId, type: 'song' }));
export const getPlaylists = () => client.post('tags');
export const getPlaylistDetail = (playlistId) => client.post('media/info', joinQueryString({ key: playlistId, type: 'playlist' }));
export const getLyric = (songId) => client.post('lyric', joinQueryString({ key: songId, type: 'song' }));
export const getVideoDetail = (videoId) => client.post('media/info', joinQueryString({ key: videoId, type: 'video' }));
export const getTopics = () => client.post('topic');
export const getTopicDetail = (topicId) => client.post('topic/detail', joinQueryString({ key: topicId }));
export const getChart = (
  { category = 'nhac-viet', time } = {
    category: 'nhac-viet'
  }
) =>
  client.post(
    'ranking/top20',
    joinQueryString({
      category,
      type: 'song',
      size: 20,
      week: (time === null || time === void 0 ? void 0 : time.week) || undefined,
      year: (time === null || time === void 0 ? void 0 : time.year) || undefined
    })
  );
export const getTop100 = (top100Id) => client.post('top100', joinQueryString({ key: top100Id }));
export const searchByKeyword = (keyword) => client.post('search/all', joinQueryString({ key: keyword }));
export const getTopKeyword = () => client.post('search/topkeyword');
export const getTrendingArtists = () => client.post('ranking/artist', joinQueryString({ size: 10 }));
export const exploreArtists = ({ nation = 'hot', gender = 1 } = { nation: 'hot', gender: 1 }) =>
  client.post('artist', joinQueryString({ nation, gender }));
export const getArtistDetail = (artistId) =>
  client.post(
    'artist/detail',
    joinQueryString({
      shortLink: artistId,
      type: 'all',
      size: 20,
      index: 1,
      sort: 0
    })
  );
export const explore = ({ type, key = 'moi-hot', page = 1, pageSize = 36 }) =>
  client.post('genre', joinQueryString({ type, key, order: 1, pageIndex: page, pageSize }));

// const input = document.getElementById("input");
// const audio = document.getElementById("audio");
// input.addEventListener("keydown", (e) => {
//     if (e.keyCode === 13) {
//         audio.src = e.target.value;
//     }
// });
// getSong('71uFPUABw7yh').then((data) => console.log(data));
//# sourceMappingURL=index.js.map
