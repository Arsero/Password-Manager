import fs from "fs";

export default class FileUtils {
  static saveData = (path: string, data: string) => {
    fs.writeFileSync(path, data, "utf-8");
    console.log(path + " saved !");
  };
  
  static loadData = (path: string) => {
    let data = fs.readFileSync(path, "utf-8");
    console.log(path + " loaded !");
    return data;
  };
  
  static exists = (path: string) => {
    return fs.existsSync(path);
  }
}