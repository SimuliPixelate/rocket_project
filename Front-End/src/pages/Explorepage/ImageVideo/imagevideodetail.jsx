import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LibraryDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // 1. Get Metadata
        const res = await axios.get(
          `https://images-api.nasa.gov/search?nasa_id=${id}`
        );
        const item = res.data.collection.items[0];
        setData(item.data[0]);

        // 2. Get Media Assets (Actual video/image links)
        const assetRes = await axios.get(
          `https://images-api.nasa.gov/asset/${id}`
        );
        const assets = assetRes.data.collection.items;

        if (item.data[0].media_type === "video") {
          // Find the best mp4 version
          const videoFile = assets.find(
            (a) => a.href.endsWith("~orig.mp4") || a.href.endsWith(".mp4")
          );
          setMediaUrl(videoFile?.href);
        } else {
          setMediaUrl(assets[0].href);
        }
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!data)
    return (
      <div className="bg-black min-h-screen text-white p-10">Loading...</div>
    );

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <div className="max-w-4xl mx-auto">
        {/* Title and Meta Info */}
        <p className="text-center text-3xl font-bold">{data.title}</p>

        <div className="flex container justify-center mt-5 items-center gap-10 text-gray-400 font-medium">
          <div>
            <p className="text-[10px] uppercase text-zinc-500 mb-1">
              Date Created
            </p>
            <p className="text-xl font-medium">
              {new Date(data.date_created).toLocaleDateString()}
            </p>
          </div>

          {/* Separator Dot */}
          <div className="w-2 h-2 rounded-full bg-zinc-700 mt-5" />

          {/* Photographer Block */}
          <div>
            <p className="text-[10px] uppercase text-zinc-500 mb-1">Credits</p>
            <p className="text-xl font-medium">
              {data?.photographer || "NASA"}
            </p>
          </div>
        </div>

        {/* Media Player */}
        <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden mb-8">
          {data.media_type === "video" ? (
            <video src={mediaUrl} controls className="w-full h-full" />
          ) : (
            <img
              src={mediaUrl}
              alt={data.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Description */}
        <div className="mt-10 space-y-6">
          <p className="text-gray-300 leading-relaxed text-justify pb-5">
            {data.description}
          </p>
          <p className="text-sm text-gray-500 text-justify pt-5 border-t border-zinc-800">
            <span className="font-semibold block mb-1">Keywords:</span>
            {data.keywords?.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LibraryDetail;
