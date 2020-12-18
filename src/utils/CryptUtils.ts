import {
  encryptSeed,
  decryptSeed,
  blake2b,
  stringToBytes,
} from '@waves/ts-lib-crypto';

export default class CryptUtils {
  static characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&';
  static charactersLength = CryptUtils.characters.length;

  static reg = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$'
  );

  static encrypt = (text: string, key: string) => {
    return encryptSeed(text, key).toString();
  };

  static decrypt = (text: string, key: string) => {
    return decryptSeed(text, key);
  };

  static hash = (text: string) => {
    return blake2b(stringToBytes(text)).toString();
  };

  static hashWithSalt = (text: string, salt: string) => {
    let bytes = stringToBytes(text + text.length + salt + salt.length);
    return blake2b(bytes).toString();
  };

  static generatePassword = (lenght: number) => {
    let result;

    do {
      result = '';
      for (let i = 0; i < lenght; i++) {
        result += CryptUtils.characters.charAt(
          Math.floor(Math.random() * CryptUtils.charactersLength)
        );
      }
    } while (!CryptUtils.reg.test(result));

    return result;
  };
}
