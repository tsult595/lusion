import styled from 'styled-components'
import SoundButton from './SoundButton';


const Header = styled.header`
    width: 100%;
    height: 60px;
    
`;


const HeaderWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

export const TalkButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  height: 56px;
  padding: 0 28px;

  background: #2a2d3a;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;

  border: none;
  border-radius: 999px; 
  cursor: pointer;

  transition: background 0.3s ease;

  &:hover {
    background: #1f2230;
  }
`;

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
`;

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  height: 56px;
  padding: 0 28px;

  background: #d1d4e3ff;
  color:  black;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;

  border: none;
  border-radius: 999px; 
  cursor: pointer;

  transition: background 0.3s ease;

  &:hover {
    background: #1f2230;
  }
`;    

const MainComponentHeader = () => {
  return (
    <Header>
       <HeaderWrapper>
        <h1>Lusion</h1>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, iste inventore?</h3>
        
        <ButtonWrapper>
          <SoundButton />
          <TalkButton>Let's Talk
            <Dot />
            
          </TalkButton>
          <MenuButton>Menu
            <Dot />
            <Dot />
          </MenuButton>
        </ButtonWrapper>
       </HeaderWrapper>
    </Header>
  )
}

export default MainComponentHeader
