import styled from 'styled-components';


export const HeroSection = styled.section`
  position: relative;
  width: 80%;
  height: 30vh;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 12px;
`;

export const VideoBackground = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;



const VideoWrapper = () => {
  return (
    <HeroSection>
      <VideoBackground
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </HeroSection>
  );
};

export default VideoWrapper;


