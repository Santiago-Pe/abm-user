import React from "react";

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
