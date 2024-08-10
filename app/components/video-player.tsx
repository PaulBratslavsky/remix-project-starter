import MuxPlayer from "@mux/mux-player-react"; 

interface VideoProps {
  playbackId: string;
  metadata: {
    video_id: string;
    video_title: string;
    viewer_user_id: string;
  };
}

export function VideoPlayer(data : Readonly<VideoProps>) {
  if (!data) return null;
  const { playbackId, metadata } = data;
  console.log(playbackId, metadata);
  return (
    <MuxPlayer
      playbackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
      metadata={{
        video_id: "video-id-54321",
        video_title: "Test video title",
        viewer_user_id: "user-id-007",
      }}
    />
  );
}