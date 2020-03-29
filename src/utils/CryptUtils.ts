import { encryptSeed, decryptSeed, sha256, stringToBytes, bytesToString   } from '@waves/ts-lib-crypto';

export default class CryptUtils {
  static encrypt = (text: string, key: string) => {
    return encryptSeed(text, key).toString();
  };

  static decrypt = (text: string, key: string) => {
    return decryptSeed(text, key);
  };

  static hash = (text: string) => {
    return sha256(stringToBytes(text)).toString();
  }
}
