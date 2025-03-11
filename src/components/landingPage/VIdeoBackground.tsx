import React from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  scrollY: number;
}

/**
 * VideoBackground component
 *
 * This component renders a video as a background with a parallax effect.
 * The video will move vertically based on the scroll position (`scrollY`).
 * The video is set to autoplay, loop, and muted by default.
 *
 * @param {Object} props - The properties for the VideoBackground component.
 * @param {string} props.videoSrc - The source URL of the video.
 * @param {number} props.scrollY - The current vertical scroll position, used for the parallax effect.
 *
 * @returns {JSX.Element} The rendered video background with parallax effect.
 */
const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  scrollY
}) => {
  return (
    <video
      autoPlay
      loop
      muted
      className="absolute top-0 left-0 w-full h-full object-cover"
      style={{ transform: `translateY(${scrollY * 0.3}px)` }}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
