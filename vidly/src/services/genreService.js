import http from './httpService';
import { apiGenres } from '../config.json';

export function getGenres() {
  return http.get(apiGenres);
}