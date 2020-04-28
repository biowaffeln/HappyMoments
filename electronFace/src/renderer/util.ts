import { homedir } from "os";
import { writeFile, rename } from "fs";
export const imagePath = `${homedir}/HappyMoments`;
const screenshot = require("screenshot-desktop");

export const takeScreenshot = (prefix: string) => {
  screenshot().then((img: Buffer) => {
    // for some reason electron won't load the image unless I rename it once
    writeFile(`${imagePath}/screenshot.jpg`, img, () => {
      rename(
        `${imagePath}/screenshot.jpg`,
        `${imagePath}/${prefix}__screenshot.jpg`,
        () => {}
      );
    });
  });
};

export const saveFaceImage = (prefix: string) => {
  const imgPath = `bin/data/face.jpg`;
  rename(imgPath, `${imagePath}/${prefix}__face.jpg`, () => {});
};
