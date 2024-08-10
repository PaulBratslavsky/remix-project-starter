import { useEffect, useState, useRef, useCallback } from "react";
import { ClientOnly } from "remix-utils/client-only";

import ReactPlayer from "react-player/youtube.js";

function SeekBackward() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
      />
    </svg>
  );
}

function SeekForward() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}

function Pause() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    </svg>
  );
}

function Play() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  );
}

interface MediaPlayerProps {
  videoId: string;
  timestamp?: number;
  controls?: boolean;
}

function generateYouTubeUrl(videoId: string) {
  const baseUrl = new URL("https://www.youtube.com/watch");
  baseUrl.searchParams.append("v", videoId);
  return baseUrl.href;
}

const reactPlayer = "absolute inset-0";
const playerWrapper = "relative aspect-video overflow-hidden rounded-lg";
const playerControlsWrapper = "absolute inset-0 z-10 w-full h-full";
const playerControls =
  "grid place-items-center gap-1 grid-cols-3 w-full h-full";
const playerControlsButton =
  "bg-black bg-opacity-20 text-white border-none p-2 rounded cursor-pointer";

export function MediaPlayer({
  videoId,
  timestamp,
  controls = false,
}: Readonly<MediaPlayerProps>) {
  const playerRef = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleSeekToTimestamp = useCallback((timestamp: number | undefined) => {
    if (timestamp && playerRef.current) {
      playerRef.current.seekTo(timestamp);
      setPlaying(true);
    }
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      setPlaying(!playing);
    }
  };

  const seekForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    }
  };

  const seekBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    }
  };

  useEffect(() => {
    handleSeekToTimestamp(timestamp);
  }, [timestamp, handleSeekToTimestamp]);

  if (!videoId) return null;

  const videoUrl = generateYouTubeUrl(videoId);

  return (
    <ClientOnly fallback={<p>loading...</p>}>
      {() => (
        <div>
          <div className={playerWrapper}>
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              width="100%"
              height="100%"
              controls
              className={reactPlayer}
              playing={playing}
            />
            {controls && (
              <div
                className={playerControlsWrapper}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                {hovering && (
                  <div className={playerControls}>
                    <button
                      onClick={seekBackward}
                      className={playerControlsButton}
                    >
                      <SeekBackward />
                    </button>
                    <button
                      onClick={togglePlay}
                      className={playerControlsButton}
                    >
                      {playing ? <Pause /> : <Play />}
                    </button>
                    <button
                      onClick={seekForward}
                      className={playerControlsButton}
                    >
                      <SeekForward />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </ClientOnly>
  );
}