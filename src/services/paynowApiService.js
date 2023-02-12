import axios from 'axios';
// const BASEURL = 'https://ancient-plains-65411.herokuapp.com/api/v1';
const BASEURL = 'http://localhost:8000/api/v1';
const instance = axios.create({
  baseURL: BASEURL,
});
const getAuthInstance = () => {
  const accessToken = localStorage.getItem('access_token');
  const authInstance = axios.create({
    baseURL: BASEURL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return authInstance;
};
const login = async data => {
  const res = await instance.post('/auth/login/', data);
  console.log(res);
  return res.data;
};
const getBanks = async () => {
  const instance = getAuthInstance();
  const res = await instance.get('/payment/list_of_banks/');
  console.log(res);
  return res.data.data;
};

const getUser = async () => {
  const instance = getAuthInstance();
  const res = await instance.get('/auth/user/');
  console.log(res);
  return res.data;
};

const createBankAccount = async data => {
  const instance = getAuthInstance();
  const res = await instance.post('/auth/create-bank-account/', data);
  console.log(res);
  return res.data;
};

const fundWalletInit = async data => {
  const instance = getAuthInstance();
  const res = await instance.post('/wallet/fund/init/', data);
  console.log(res);
  return res.data;
};

const withdrawFromWallet = async data => {
  const instance = getAuthInstance();
  const res = await instance.post('/wallet/withdraw/', data);
  console.log(res);
  return res.data;
};

const sendMoney = async data => {
  const instance = getAuthInstance();
  const res = await instance.post('/wallet/transfer/', data);
  console.log(res);
  return res.data;
};

const getTransactions = async () => {
  const instance = getAuthInstance();
  const res = await instance.get('/payment/transactions/');
  console.log(res);
  return res.data;
};

export {
  login,
  getBanks,
  createBankAccount,
  getUser,
  fundWalletInit,
  getTransactions,
  withdrawFromWallet,
  sendMoney,
};
