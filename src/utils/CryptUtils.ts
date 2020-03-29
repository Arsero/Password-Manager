import {AES, enc, SHA256} from "crypto-ts";

export default class CryptUtils {
  static encrypt = (text: string, key: string) => {
    return AES.encrypt(text, key).toString();
  };

  static decrypt = (text: string, key: string) => {
    let bytes = AES.decrypt(text, key);
    return bytes.toString(enc.Utf8);
  };

  static hash = (text: string) => {
    return SHA256(text);
  }
}
