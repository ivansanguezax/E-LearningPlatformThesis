import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
          videoId: videoUrl,
        });
        setVideoData(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching video data:", err);
        setError("Error al cargar el video. Por favor, inténtalo de nuevo más tarde.");
      }
    };

    fetchVideoData();
  }, [videoUrl]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{position:"relative",paddingTop:"56.25%",overflow:"hidden"}}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=SDkVvbYYlwIqdSPv`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;