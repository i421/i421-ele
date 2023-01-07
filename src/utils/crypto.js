import CryptoJS from 'crypto-js';
import { setting } from '@/config/setting';

const { cryptoKey } = setting;

const secretPassphrase = CryptoJS.enc.Utf8.parse(cryptoKey);
const iv = CryptoJS.enc.Utf8.parse(cryptoKey);

/*
 * 加密数据
 * @param string origin 原始字符串
 * @return string current 加密字符串
 */
export function doEncrypt(orgin) {
  if (typeof origin === 'object') {
    try {
      data = JSON.stringify(data);
    } catch (error) {
      console.log('error:', error);
    }
  }
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(origin), secretPassphrase, {
    mode: CryptoJS.mode.CBC,
    paddding: CryptoJS.pad.Pkcs7,
    iv,
  }).toString();

  return encrypted;
}

/*
 * 解密数据
 * @param string current 加密字符串
 * @return string origin 原始字符串
 */
export function doDecrypt(current) {
  const decrypted = CryptoJS.AES.decrypt(current, secretPassphrase, {
    mode: CryptoJS.mode.CBC,
    paddding: CryptoJS.pad.Pkcs7,
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);

  return decrypted;
}
