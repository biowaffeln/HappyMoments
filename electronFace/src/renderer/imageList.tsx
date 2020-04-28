import React from "react";
import { existsSync, mkdirSync } from "fs";
import { imagePath } from "./util";
import { useFiles } from "./hooks/useFiles";
import { ImageCard } from "./imageCard";

!existsSync(imagePath) && mkdirSync(imagePath);

const getPrefix = (filename: string) => filename.split("__")[0];
const isScreenshot = (filename: string) =>
  filename.endsWith("__screenshot.jpg");

const getTimestamps = (files: string[]) =>
  files
    .filter(isScreenshot)
    .map(getPrefix)
    .sort()
    .reverse();

export const ImageList: React.FC = () => {
  const files = useFiles(imagePath);
  const timestamps = getTimestamps(files);

  const empty = (
    <div className="flex flex-col items-center py-10">
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        viewBox="0 0 24 24"
        className="w-48 h-48 text-gray-400"
      >
        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      <p className="font-semibold text-3xl text-black">
        you have no images yet
      </p>
      <p className="text-xl">Run the app to generate some!</p>
    </div>
  );

  const list = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-16 row-gap-12">
      {timestamps.map((timestamp) => (
        <ImageCard key={timestamp} timestamp={timestamp} />
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-6 pt-8 pb-48">
      <h2 className="font-bold text-3xl">your happy moments so far</h2>
      <hr className="border-gray-800 border-t-2 border-b mb-12" />
      {timestamps.length === 0 ? empty : list}
    </div>
  );
};
