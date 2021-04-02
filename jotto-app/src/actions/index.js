import axios from 'axios';

export const getSecretWord = () => {
  // TODO: write actual redux action
  // return response from server
  return axios.get('http://localhost:3030').then((res) => res.data);
};
