import http from './httpService';
import { apiMovies } from '../config.json';

function movieUrl(id) {
  return apiMovies + '/' + id;
}

export function getMovies() {
  return http.get(apiMovies);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiMovies, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}