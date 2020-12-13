import fs from 'fs';

export default class FileUtils {
  static saveData = (path: string, data: string) => {
    fs.writeFileSync(path, data, 'utf-8');
  };

  static loadData = (path: string) => {
    let data = fs.readFileSync(path, 'utf-8');
    return data;
  };

  static exists = (path: string) => {
    return fs.existsSync(path);
  };
}
