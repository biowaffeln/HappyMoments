import * as React from "react";
import { ImageList } from "./imageList";
import { useScript } from "./hooks/useScript";
import { takeScreenshot, saveFaceImage } from "./util";
import { hot } from "react-hot-loader/root";

export const App: React.FC = hot(() => {
  const [faceDetected, setFaceDetected] = React.useState(false);

  const [scriptState, toggleScript] = useScript(message => {
    if (message === "cheese!") {
      const date = new Date().toISOString();
      takeScreenshot(date);
      saveFaceImage(date);
    } else {
      setFaceDetected(message === "face detected");
    }
  });

  const running = scriptState === "running";

  return (
    <div>
      <div className="container mx-auto pt-12 pb-24">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-center">Happy Moments</h1>
          <p className="text-2xl text-center max-w-lg text-gray-700 font-medium mb-6">
            the app that detects your happy moments and captures them
          </p>
          <div className="flex">
            <button
              className="bg-gray-300 border-2 border-gray-300 text-gray-900 text-lg font-semibold py-2 px-5 rounded-lg leading-snug mr-2"
              onClick={toggleScript}
            >
              {running ? "pause detection" : "start detection!"}
            </button>
            <button className="border-2 border-gray-400 text-gray-900 text-lg font-semibold py-2 px-5 rounded-lg">
              settings
            </button>
          </div>
          {running &&
            (faceDetected ? (
              <div
                className="bg-green-100 border-2 border-green-200 text-green-700 mt-5 px-5 py-3 max-w-sm rounded relative"
                role="alert"
              >
                <h3 className="font-semibold text-lg">face detected!</h3>
                <p>
                  You can now minimize this window and do go on about your day.
                </p>
              </div>
            ) : (
              <div
                className="bg-pink-100 border-2 border-pink-200 text-red-700 mt-5 px-5 py-3 max-w-sm rounded relative"
                role="alert"
              >
                <h3 className="font-semibold text-lg">no faces detected...</h3>
                <p>
                  Face detection works best when sitting in a well lit room.
                </p>
              </div>
            ))}
        </div>
      </div>
      <ImageList />
    </div>
  );
});
