
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export const DeploymentStatus: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    // Simulate a deployment process
    setStatus("running");
    
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setStatus("complete");
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {status === "idle" && "Waiting for changes..."}
          {status === "running" && "Deployment in progress..."}
          {status === "complete" && "Deployment complete!"}
        </span>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="grid grid-cols-4 text-xs text-gray-500 mt-1">
        <div className={`${progress >= 25 ? "text-blue-600 font-medium" : ""}`}>Build</div>
        <div className={`${progress >= 50 ? "text-blue-600 font-medium" : ""}`}>Test</div>
        <div className={`${progress >= 75 ? "text-blue-600 font-medium" : ""}`}>Upload</div>
        <div className={`${progress >= 100 ? "text-blue-600 font-medium" : ""}`}>Deploy</div>
      </div>
    </div>
  );
};
