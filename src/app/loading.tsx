import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

interface FullScreenLoaderProps {
  useOpacity?: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  useOpacity = false,
}) => {
  return (
    <div className={`loaderContainer`}>
      <div className={`loaderWrapper ${useOpacity ? "opacity" : ""}`}>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
