import {
  encryptSeed,
  decryptSeed,
  sha256,
  stringToBytes
} from "@waves/ts-lib-crypto";

export default class CryptUtils {
  static characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";
  static charactersLength = CryptUtils.characters.length;

  static reg = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
  );

  static encrypt = (text: string, key: string) => {
    return encryptSeed(text, key).toString();
  };

  static decrypt = (text: string, key: string) => {
    return decryptSeed(text, key);
  };

  static hash = (text: string) => {
    return sha256(stringToBytes(text)).toString();
  };

  static generatePassword = (lenght: number) => {
    let result;

    do {
      result = "";
      for (let i = 0; i < lenght; i++) {
        result += CryptUtils.characters.charAt(
          Math.floor(Math.random() * CryptUtils.charactersLength)
        );
      }
    } while (!CryptUtils.reg.test(result));

    return result;
  };
}
