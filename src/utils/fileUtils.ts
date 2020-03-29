import fs from "fs";

export default class FileUtils {
  static saveData = (path, data) => {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(path, jsonData, "utf-8");
    console.log(path + " saved !");
  };
  
  static loadData = path => {
    let data = fs.readFileSync(path, "utf-8");
    console.log(path + " loaded !");
    return data;
  };
  
  static exists = path => {
    return fs.existsSync(path);
  }
}