import axios from 'axios';

export const milaiAPIClient = axios.create({
  baseURL: process.env.MILAI_API_URL,
});

export const milaiAPIDogsClient = axios.create({
  baseURL: process.env.MILAI_API_URL,
});
