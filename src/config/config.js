import keys from './api';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
export const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY || keys.GOOGLE_BOOKS_API_KEY;

