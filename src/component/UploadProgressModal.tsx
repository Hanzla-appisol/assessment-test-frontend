import React from "react";

interface UploadProgressModalProps {
  filename: string;
  progress: number;
}

export const UploadProgressModal: React.FC<UploadProgressModalProps> = ({
  filename,
  progress,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-950">Uploading...</h2>
        <p className="text-sm text-gray-700 truncate mb-2">{filename}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 flex justify-between">
          <span>{progress}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
