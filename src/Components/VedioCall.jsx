import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const appID = 647458986; // 🔹 Your Zego AppID
    const serverSecret = "ff3607ae24bbe1a635da0f16a28e0bec"; // 🔹 Your Zego ServerSecret

    const userID = "user_" + Date.now();
    const userName = "User_" + Math.floor(Math.random() * 1000);
    const roomID = "room1";

    // Generate a token
    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    // Create instance
    const zp = ZegoUIKitPrebuilt.create(token);

    // Join the room
    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.origin}/room/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // Or OneONoneCall
      },
    });
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default VideoCall;
