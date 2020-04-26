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
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$"
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
      console.log(result);
    } while (!CryptUtils.reg.test(result));

    return result;
  };
}
