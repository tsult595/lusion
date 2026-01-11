
import styled from 'styled-components';
import MainComponentHeader from './MainComponentHeader'
import VideoWrapper from './VideoWrapper'

export const PageLayout = styled.main`
  display: flex;
  flex-direction: column;
  gap: 80px; 
`;

const MainComponent = () => {
  return (
    <>
     <PageLayout>
    <MainComponentHeader />
    <VideoWrapper />
    </PageLayout>

    </>
  )
}

export default MainComponent