import styled from 'styled-components'
import SoundButton from './SoundButton';


const Header = styled.header`
    width: 100%;
    height: 60px;
    position: sticky;
    top: 0;
`;


const HeaderWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline; 
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    
`;


export const TalkDot = styled.span`
  position: absolute;
  right: 20px;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  transition: all 0.3s ease;
`;

export const Arrow = styled.span`
  position: absolute;
  left: 24px;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
`;

export const Text = styled.span`
  transition: transform 0.3s ease;
  z-index: 2;
`;

export const TalkButton = styled.button`
  position: relative;
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
  overflow: hidden;

  &:hover ${Arrow} {
    opacity: 1;
    transform: translateX(0);
  }

  &:hover ${Text} {
    transform: translateX(10px);
  }

  &:hover ${TalkDot} {
    opacity: 0;
    transform: scale(0);
  }
  
  &:hover {
    background: #3331a2ff;
  }
`;


export const DotWrapper = styled.div`
  position: relative;
  width: 18px;
  height: 18px;

  transition: transform 0.4s ease;
`;


export const Dot = styled.span`
  position: absolute;
  width: 6px;
  height: 6px;
  background: #000;
  border-radius: 50%;

  &:nth-child(1) {
    top: 0;
    left: 6px;
  }

  &:nth-child(2) {
    bottom: 0;
    left: 6px;
  }
`;



export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  height: 56px;
  padding: 0 28px;

  background: #d1d4e3ff;
  color: black;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;

  border: none;
  border-radius: 999px;
  cursor: pointer;

  transition: background 0.3s ease;

  &:hover {
    background: #e8bfbfff;
  }

  &:hover ${DotWrapper} {
    transform: rotate(90deg);
  }
`;

export const HeaderText = styled.h1`
  font-family: Aeonik;
    font-weight: 400;
    font-style: normal;
    
`;


const MainComponentHeader = () => {
  return (
    <Header>
       <HeaderWrapper>
      
        <h1>Lusion</h1>
        <HeaderText>Lorem ipsum dolor <br /> sit amet consectetur <br /> adipisicing elit. <br /> Ullam, possimus consequuntur? Repellat <br /> repudiandae aut laboriosam.</HeaderText>
        
       
        <ButtonWrapper>
          <SoundButton />
          <TalkButton>
          <Arrow>{'>'}</Arrow>
          <Text>LET’S TALK</Text>
         <TalkDot />
         </TalkButton>
          <MenuButton>Menu
            <DotWrapper>
            <Dot />
            <Dot />
            </DotWrapper>
          </MenuButton>
         
        </ButtonWrapper>
       </HeaderWrapper>
    </Header>
  )
}

export default MainComponentHeader
