import React, { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import canvasVideoStreamState from "selectors/streamSelectors/canvasVideoStreamState";
import videoActiveState from "selectors/videoSelectors/videoActiveState";
import brandState from "store/brandState";
import screenActiveState from "selectors/videoSelectors/screenActiveState";
import { drawScreenShareVideo, drawUserVideo } from "helpers/slate";
import canvasScreenStreamState from "selectors/streamSelectors/canvasScreenStreamState";
import resolutionState from "selectors/settingsSelectors/resolutionState";

type Props = {};

const Slate = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const video = useRecoilValue(canvasVideoStreamState);
  const screen = useRecoilValue(canvasScreenStreamState);
  const isVideoActive = useRecoilValue(videoActiveState);
  const isScreenActive = useRecoilValue(screenActiveState);
  const resolution = useRecoilValue(resolutionState);
  const [brand] = useRecoilState(brandState);

  const computeFrame = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d")!;
    if (!context) return;
    const canvasHeight = resolution.height;
    const canvasWidth = resolution.width;
    canvasRef.current.setAttribute("height", canvasHeight.toString());
    canvasRef.current.setAttribute("width", canvasWidth.toString());
    context.fillStyle = brand.background;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    drawUserVideo(
      context,
      video,
      isVideoActive,
      screen,
      isScreenActive,
      canvasHeight,
      canvasWidth,
      brand
    );
    drawScreenShareVideo(
      context,
      video,
      screen,
      isScreenActive,
      canvasHeight,
      canvasWidth
    );
    requestAnimationFrame(computeFrame);
  };

  requestAnimationFrame(computeFrame);
  // computeFrame();

  return (
    <div className="max-h-[100%] max-w-[100%] flex flex-wrap items-center justify-center">
      <canvas
        ref={canvasRef}
        id="slate"
        className="h-[90%] w-[90%] max-w-[90%] max-h-[90%] border border-gray-500"
      ></canvas>
    </div>
  );
};

export default Slate;
