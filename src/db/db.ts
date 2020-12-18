import CryptUtils from '../utils/CryptUtils';
import FileUtils from '../utils/FileUtils';

export const SaveDB = (
  data: any,
  pathfile: string,
  email: string,
  secret: string
) => {
  const cryptedData = CryptUtils.encrypt(
    JSON.stringify(data),
    CryptUtils.hashWithSalt(email, secret)
  );

  FileUtils.saveData(pathfile, cryptedData.toString());
};

export const LoadDB = (pathfile: string, email: string, secret: string) => {
  let cryptedData = FileUtils.loadData(pathfile);
  const data = CryptUtils.decrypt(
    cryptedData,
    CryptUtils.hashWithSalt(email, secret)
  );
  // exception if bad secret
  return JSON.parse(data);
};

export const ExistDB = (pathfile: string) => {
  return FileUtils.exists(pathfile);
};
