"use client";

import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { UploadProgressModal } from "./UploadProgressModal";
interface Props {
  isOpen: boolean;
  setIsOpen: (type: boolean) => void;
}
export default function UploadModal({ isOpen, setIsOpen }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", files[0]);

    try {
      setShowProgressModal(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percent);
          },
        }
      );

      toast.success("File uploaded successfully!");
      setIsOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      console.error(err);
    } finally {
      setTitle("");
      setDescription("");
      setFiles([]);
      setShowProgressModal(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Upload Files</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md text-black text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter file title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm text-black focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a short description"
            />
          </div>

          <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-300 p-6 rounded-md text-center cursor-pointer hover:border-blue-500"
          >
            <input {...getInputProps()} />
            <FaCloudUploadAlt className="mx-auto text-3xl text-blue-400 mb-2" />
            <p className="text-sm text-gray-600">
              Drag and drop your file here or{" "}
              <span className="text-blue-600 underline">Browse</span>
            </p>
            {files.length > 0 && (
              <p className="mt-2 text-green-600 text-sm">
                {files[0].name} selected
              </p>
            )}
          </div>

          <div className="flex justify-between mt-6 gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-[50%] bg-red-600 text-white py-2 rounded-md hover:bg-red-700 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[50%] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {showProgressModal && files.length > 0 && (
        <UploadProgressModal
          filename={files[0].name}
          progress={uploadProgress}
        />
      )}
    </div>
  );
}
