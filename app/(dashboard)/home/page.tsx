"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, UploadCloud, HelpCircle, FolderPlus, Search, Import, X, } from "lucide-react";
import { GrSchedule } from "react-icons/gr";
import HomeHeader from "@/components/HomeHeader";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [videosOpen, setVideosOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [importVideo, setImportVideo] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

 // Handle YouTube link import
 const handleImportYoutube = () => {
  if (youtubeLink.trim() !== "") {
    router.push(`/edit?video=${encodeURIComponent(youtubeLink)}`);
  }
};

// Handle File Drop
const onDrop = useCallback((acceptedFiles: File[]) => {
  if (acceptedFiles.length > 0) {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    const fileURL = URL.createObjectURL(file);
    router.push(`/edit?video=${encodeURIComponent(fileURL)}`);
  }
}, [router]);

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: { "video/*": [] },
  multiple: false,
});

  const createBtns = [
    {
      image: <img src="/short_to_short.webp" alt="Short to Short" className="w-40 mx-auto" />,
      altText: "Short to Short",
      label: "Subtitle and edit my Short",
    },
    {
      image: <img src="/video_to_short.webp" alt="Short to Short" className="w-40 mx-auto" />,
      altText: "Video to Short",
      label: "Long videos to Short",
    },
    {
      image: <img src="/faceless.webp" alt="Short to Short" className="h-32 -mt-1 mx-auto rounded-md" />,
      altText: "Faceless Short",
      label: "Create Faceless video",
    },
  ];

  return (
    <div className="">
      <HomeHeader pageName={"Home"}/>

      <main className="p-10 w-full bg-bgWhite">
        <div className="">
          <div className="bg-yellow px-14 py-7 text-center rounded-3xl">
            <h6 className="text-4xl font-semibold">What do you want to create today?</h6>
            <p className="text-black font-semibold pt-3 pb-12 mt-2">Import/upload a long-form video and let AI take care of the rest. Or upload an existing Short for AI editing!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto gap-1 -mt-10 px-0 sm:px-7">
            {createBtns.map((btn, index) => (
              <div key={index} className="relative text-center overflow-hidden" >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative px-10 py-1 bg-bgWhite rounded-lg shadow-lg shadow-gray-700/10 border text-center cursor-pointer overflow-hidden h-36 w-64"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-0 left-0 right-0 bottom-0 bg-yellow bg-opacity-85 flex items-center justify-center text-gray-900 font-semibold text-lg"
                >
                  Start
                </motion.p>
              {btn.image}
              </motion.button>

              <p className="mt-4">{btn.label}</p>
            </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="">



          <div className="flex items-center justify-between mt-4">
            <div>
              <h6 className="text-lg font-medium">My Shorts</h6>
              <p className="text-sm mt-1">These are shorts created from your imported videos (section below).</p>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <Search size={18} className=" absolute top-2 text-gray-500 left-2" />
                <input type="text" placeholder="Search" className="w-full p-1 pl-8 border rounded-md" />
              </div>
              <Link href="/home/schedule" className="flex gap-2 items-center border px-3 py-1 rounded-md"><GrSchedule /> Schedule</Link>
            </div>

          </div>

          <button className="w-full h-72 mt-6 p-6 flex flex-col gap-3 items-center justify-center border-2 border-dashed border-gray-300 bg-slate50 hover:bg-slateHover50 rounded-xl text-gray-400 cursor-pointer">
            <UploadCloud size={24} className="font-semibold" /> No Shorts found, click here to import a Short
          </button>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="">
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-3 items-center">
              <div className="bg-slate50 hover:bg-slateHover50 p-1 rounded-full">
                <ChevronDown size={20} className={`${videosOpen ? "rotate-180" : "rotate-0"} transition-transform`} onClick={() => setVideosOpen(prev => !prev)} />
              </div>
              <div>
                <h6 className="text-lg font-medium">Imported Videos</h6>
                <p className="text-sm mt-1">Out of your imported videos, you can create shorts</p>
              </div>

            </div>

            <button onClick={() => setImportVideo(true)} className="flex gap-2 items-center border px-3 py-1 rounded-md"><Import size={19} /> Import Videos</button>


          </div>

          {videosOpen && (
            <button onClick={() => setImportVideo(true)} className="w-full h-72 mt-6 p-6 flex flex-col gap-3 items-center justify-center border-2 border-dashed border-gray-300 bg-slate50 hover:bg-slateHover50 rounded-xl text-gray-400 cursor-pointer">
              <UploadCloud size={24} className="font-semibold" /> No videos found, click here to import a video
            </button>
          )}
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="">
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-3 items-center">
              <div className="bg-slate50 hover:bg-slateHover50 p-1 rounded-full">
                <ChevronDown size={20} className={`${folderOpen ? "rotate-180" : "rotate-0"} transition-transform`} onClick={() => setFolderOpen(prev => !prev)} />
              </div>
              <h6 className="text-lg font-medium">Folders</h6>
            </div>

            <button className="flex gap-2 items-center border px-3 py-1 rounded-md"
              onClick={() => setPopUpOpen(prev => !prev)}
            ><FolderPlus size={18} /> New Folder</button>


          </div>

          {folderOpen && (
            <button className="w-full h-72 mt-6 p-6 flex flex-col gap-3 items-center justify-center border-2 border-dashed border-gray-300 bg-slate50 hover:bg-slateHover50 rounded-xl text-gray-400 cursor-pointer">
              <FolderPlus className="font-semibold" />Click here to create your first folder
            </button>
          )}
        </div>
      </main>

      {/* Import Video Modal */}
      {importVideo && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-md rounded-lg p-6 w-[400px]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Import Video</h3>
              <button onClick={() => setImportVideo(false)}>
                <X size={20} className="text-gray-500 hover:text-gray-800" />
              </button>
            </div>

            {/* YouTube Import Section */}
            <div className="mt-4">
              <label className="text-gray-600 font-medium">Paste YouTube Link</label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full border p-2 mt-2 rounded-md"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
              />
              <button
                onClick={handleImportYoutube}
                className="w-full bg-blue-500 text-white mt-2 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Import from YouTube
              </button>
            </div>

            {/* OR Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Drag & Drop Upload Section */}
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-400 p-6 rounded-md text-center cursor-pointer hover:bg-gray-100 transition"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-700">Drop the file here...</p>
              ) : (
                <div>
                  <UploadCloud size={40} className="mx-auto text-gray-500" />
                  <p className="text-gray-700">Drag & Drop a video file</p>
                  <p className="text-gray-500">or click to select a file</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* pop up */}
      {popUpOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-50 shadow-md rounded-lg p-4">
            <div className="mb-2">
              <p className="text-base text-slate-600 mb-2">create new folder</p>
              <input type="text" placeholder="Folder Name" className="px-2 py-1 border"/>
            </div>
            <div className="flex justify-between">
              <button>Create Folder</button>
              <button className="bg-red-400 text-white px-3 py-1 rounded" onClick={() => setPopUpOpen(prev => !prev)} >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
