import fs from "fs";

export const saveData = (path, data) => {
  const jsonData = JSON.stringify(data);
  fs.writeFileSync(path, jsonData, "utf-8");
  console.log(path + " saved !");
};

export const loadData = path => {
  let data = fs.readFileSync(path, "utf-8");
  console.log(path + " loaded !");
  return data;
};
