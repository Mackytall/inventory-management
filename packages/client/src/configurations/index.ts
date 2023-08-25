const PREFIX = 'api';
const PROD_URL = 'https://mektaba.imadelmahrad.com';
const DEV_URL = 'http://localhost';

const prod = {
  route: `${PROD_URL}/${PREFIX}/route`,
  users: `${PROD_URL}/${PREFIX}/users`,
};

const dev = {
  route: `${DEV_URL}:4000/${PREFIX}/route`,
  users: `${DEV_URL}:3000/${PREFIX}/users`,
};

export const urls =   import.meta.env.PROD ? { ...prod } : { ...dev };
