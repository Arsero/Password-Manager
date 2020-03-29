import fs from "fs";

export const saveData = (path, data) => {
  const jsonData = JSON.stringify(data);
  try {
    fs.writeFileSync(path, jsonData, "utf-8");
    console.log("Saved !");
  } catch (error) {
    console.log(error);
  }
};
