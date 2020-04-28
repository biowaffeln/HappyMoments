import React from "react";
import { unlink } from "fs";
import { imagePath } from "./util";

const format = new Intl.DateTimeFormat("default", {
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}).format;

export const ImageCard: React.FC<{ timestamp: string }> = ({ timestamp }) => {
  const facePath = `${imagePath}/${timestamp}__face.jpg`;
  const screenshotPath = `${imagePath}/${timestamp}__screenshot.jpg`;

  const onDelete = () => {
    unlink(facePath, () => {});
    unlink(screenshotPath, () => {});
  };

  return (
    <div>
      <div className="relative">
        <img
          className="w-28 h-28 absolute right-0 bottom-0 -mr-4 -mb-4 shadow-xl object-cover rounded-full"
          src={`file://${facePath}`}
        ></img>
        <img className="shadow-lg" src={`file://${screenshotPath}`}></img>
      </div>
      <p className="text-gray-700 text-2xl xl:text-3xl mt-4 mb-2">
        {format(new Date(timestamp))}
      </p>
      <div className="flex py-4">
        <a href="#" className="font-bold bg-gray-200 px-2 py-1 rounded mr-2">
          view image
        </a>
        <button
          onClick={onDelete}
          className="font-bold text-pink-600 bg-pink-100 border-2 border-pink-200 px-2 py-1 rounded flex items-center"
        >
          <span>delete</span>
          <svg
            className="fill-current h-5 w-5 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
