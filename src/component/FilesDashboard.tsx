"use client";

import Image from "next/image";
import {
  FaSearch,
  FaFilter,
  FaUpload,
  FaSignOutAlt,
  FaUserCircle,
  FaFileAlt,
} from "react-icons/fa";
import { useState } from "react";
import FilterDropdown from "@/component/FilterDropDown";
import UploadModal from "@/component/UploadFile";
import { UploadProgressModal } from "@/component/UploadProgressModal";
import { useRouter } from "next/navigation";
export default function FilesDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
  };
  const files = [
    {
      title: "Catalog",
      desc: "Catalogs in digital format",
      file: "catalog.docx",
    },
    { title: "Circoles", desc: "Circles description", file: "circoles.mp4" },
    {
      title: "Monthly progress",
      desc: "Progress report",
      file: "Monthly progress.png",
    },
    { title: "Hourglass", desc: "Time tracking", file: "hourglass.xls" },
    { title: "Layers", desc: "Layered architecture", file: "layers.docx" },
    { title: "Quotient", desc: "Math related", file: "quotient.docx" },
    { title: "Sisyphus", desc: "Metaphorical reference", file: "sis.docx" },
    { title: "Hourglass", desc: "Another one", file: "hourglass.xls" },
    { title: "Circoles", desc: "Again", file: "circoles.mp4" },
  ];

  const getFileType = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (!ext) return "unknown";
    if (["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) return "image";
    if (["mp4", "avi", "mov", "mkv"].includes(ext)) return "video";
    if (["doc", "docx", "pdf", "txt"].includes(ext)) return "document";
    if (["xls", "xlsx", "csv"].includes(ext)) return "spreadsheet";
    return "other";
  };

  const filteredFiles = files.filter((f) => {
    const matchSearch =
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.file.toLowerCase().includes(searchTerm.toLowerCase());

    const type = getFileType(f.file);

    const matchFilter =
      filterType === "All" ||
      (filterType === "Images" && type === "image") ||
      (filterType === "Videos" && type === "video") ||
      (filterType === "Documents" && type === "document") ||
      (filterType === "Spreadsheets" && type === "spreadsheet");

    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="flex items-center justify-between mb-6 bg-white py-4 px-8 rounded-md shadow">
        <Image src="/images/logo/logo.jpg" alt="Logo" width={40} height={40} />
        <div className="flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="text-sm text-blue-500 flex items-center gap-2 cursor-pointer"
          >
            <FaSignOutAlt /> Logout
          </button>
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-blue-500" />
            <span className="text-sm text-gray-800">
              Wilson
              <br />
              <span className="text-xs text-gray-500">wilss@gmail.com</span>
            </span>
          </div>
        </div>
      </div>

      <div className="px-8 pb-16 pt-2">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            My Files
          </h1>
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="flex items-center gap-4 relative">
            <FilterDropdown
              filterType={filterType}
              setFilterType={setFilterType}
            />
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-[#0993EC] text-white px-4 py-2 rounded-md text-sm hover:bg-[#0882d2]"
            >
              <FaUpload /> Upload File
            </button>
            <UploadModal
              isOpen={isUploadModalOpen}
              setIsOpen={setIsUploadModalOpen}
            />
          </div>
          {/* <UploadProgressModal filename={"Hanzla.jpg"} progress={70} /> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md shadow mb-4">
          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-600">Title</th>
                <th className="px-6 py-3 font-medium text-gray-600">
                  Description
                </th>
                <th className="px-6 py-3 font-medium text-gray-600">File</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((f, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{f.title}</td>
                  <td className="px-6 py-4 whitespace-normal max-w-xs">
                    {f.desc}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-600 flex items-center gap-2">
                    <FaFileAlt className="text-blue-500" /> {f.file}
                  </td>
                </tr>
              ))}
              {filteredFiles.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No files match your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
