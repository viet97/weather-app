import md5CJ from 'blueimp-md5';

export const md5 = obj => {
  return md5CJ(obj).toString();
};

const CryptoJS = {
  md5,
};

export default CryptoJS;
