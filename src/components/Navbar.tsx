import { MainDiv, InnerDiv } from '../components/styled/Navbar.style';
import GalleryLogo from '../assets/GalleryLogo.svg';
import GalleryLogoPurple from '../assets/GalleryLogoPurple.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const Navbar = () => {

  const [navColor, setNavColor] = useState(false);

  const showNavColor = () => {
    if (window.scrollY >= 20) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  }
  window.addEventListener('scroll', showNavColor);
  return (
    <>
      <MainDiv $myBackground={navColor ? "#f6f4f8" : "#f6f4f8"}>
        <InnerDiv>
          <Link to={'/'} ><img src={navColor ? GalleryLogoPurple : GalleryLogoPurple} alt='Gallery rounded logo' /></Link>
          <h1 ><Link to={'/History'} style={{ color: navColor ? "#AF9CE3" : "#AF9CE3", textDecoration:'none'}}>History</Link></h1>

        </InnerDiv>
      </MainDiv>

    </>
  )
}
