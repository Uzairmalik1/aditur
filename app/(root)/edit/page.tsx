"use client";
import AutoTranslateSection from "@/components/edit/AutoTranslateSection";
import CropSection from "@/components/edit/CropSection";
import EditSection from "@/components/edit/EditSection";
import ElementsSection from "@/components/edit/ElementsSection";
import Navbar from "@/components/edit/Navbar";
import Timeline from "@/components/edit/Timeline";
import VideoControls from "@/components/edit/VideoControls";
import VideoPreview from "@/components/edit/VideoPreview";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, RefObject } from "react";

interface Subtitle {
  startTime: number;
  endTime: number;
  text: string;
}

export default function VideoEditor() {
  const searchParams = useSearchParams();
  const videoURL = searchParams.get("video");

  const [videoSrc, setVideoSrc] = useState<string | "">("/videos/video1.mp4");
  const [isYoutube, setIsYoutube] = useState(false);
  const [selectedTool, setSelectedTool] = useState("edit");
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]); // Add subtitles state
  const videoRef = useRef<HTMLVideoElement>(null) as RefObject<HTMLVideoElement>; // Add video reference

  useEffect(() => {
    if (videoURL) {
      setVideoSrc(decodeURIComponent(videoURL));

      // Check if the video is a YouTube link
      setIsYoutube(videoURL.includes("youtube.com") || videoURL.includes("youtu.be"));
    }
  }, [videoURL]);

  const handleCutVideo = (start: number, end: number) => {
    // Handle video cutting logic here
    console.log(`Cut video from ${start} to ${end}`);
  };


  return (
    <div className="bg-slate50">
      <Navbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

      <div className="flex justify-between flex-col md:flex-row h-full px-4">
        {/* Sidebar */}
        <div className="w-1/3 p-4 border-r bg-bgWhite rounded-lg shadow-md border h-[44.5rem] overflow-y-auto">
          {selectedTool === "crop" && <CropSection />}
          {selectedTool === "edit" && <EditSection />}
          {selectedTool === "elements" && <ElementsSection />}
          {selectedTool === "translate" && <AutoTranslateSection />}
        </div>

        <div className="w-[63rem]">
          <VideoPreview videoSrc={videoSrc || ""} isYoutube={isYoutube} videoRef={videoRef}/>
          
          <div className="">
          <VideoControls videoRef={videoRef} />
          <Timeline  videoUrl={videoSrc || ""} subtitles={subtitles} onCutVideo={handleCutVideo} videoRef={videoRef}/>
          </div>
        </div>


      </div>



    </div>
  );
}

