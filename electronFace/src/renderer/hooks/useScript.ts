import { useState, useRef } from "react";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

type ScriptState = "running" | "idle" | "shutting down";
const messages = ["cheese!", "no face detected", "face detected"] as const;
type Message = typeof messages[number];
const parseMessage = (data: string) => data.split("]")[1].trim();

export const useScript = (callback: (msg: Message) => void) => {
  const [scriptState, setScriptState] = useState<ScriptState>("idle");
  const processRef = useRef<ChildProcessWithoutNullStreams>();

  const handleData = (data: string) => {
    if (data.startsWith("[notice ]")) {
      const message = parseMessage(data);
      messages.includes(message as any) && callback(message as Message);
    }
  };

  const toggleScript = () => {
    if (scriptState === "idle") {
      processRef.current = spawn("bin/ofFace");
      processRef.current.stdout.on("data", (data: Buffer) => {
        handleData(data.toString());
      });
      processRef.current.on("close", () => {
        setScriptState("idle");
      });
      setScriptState("running");
    } else if (scriptState === "running") {
      setScriptState("shutting down");
      processRef.current?.kill("SIGINT");
    }
  };

  return [scriptState, toggleScript] as const;
};
