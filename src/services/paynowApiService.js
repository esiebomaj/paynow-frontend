import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ancient-plains-65411.herokuapp.com/api/v1',
});

const login = async data => {
  console.log(data);
  const res = await instance.post('/auth/login/', data);
  console.log(res);
  return res.data;
};

export { login };
