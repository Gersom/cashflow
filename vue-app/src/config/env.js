const serverUrl = import.meta.env.VITE_SERVER_URL;

export const SERVER_URL = serverUrl || 'http://localhost:3001';

export const API_URL = `${SERVER_URL}/api`;
export const API_AUTH = `${API_URL}/auth`;