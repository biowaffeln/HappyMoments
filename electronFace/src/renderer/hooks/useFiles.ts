import { useState, useEffect } from "react";
import { watch, readdirSync } from "fs";

export const useFiles = (path: string) => {
  const [files, setFiles] = useState(readdirSync(path));

  const refreshFiles = () => {
    const files = readdirSync(path);
    setFiles(files);
  };

  useEffect(() => {
    const watcher = watch(path, refreshFiles);
    return watcher.close;
  }, []);

  return files;
};
