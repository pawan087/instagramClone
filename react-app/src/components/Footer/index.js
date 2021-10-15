import React from "react";

import "./footer.css";
import githubImg from '../../image_assets/GitHub-Mark-32px.png'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerTop">
          <div className="gitIconContainer"><img src={githubImg} alt="Github Logo" /></div>
          <div className="gitLink"><a target="_blank" href="https://github.com/pawan087">Pawan Chahal</a></div>
          <div className="gitLink"><a target="_blank" href="https://github.com/mce-design">Michael Eng</a></div>
          <div className="gitLink"><a target="_blank" href="https://github.com/BaselHassan8">Basel Hassan</a></div>
          <div className="gitLink"><a target="_blank" href="https://github.com/ocahsa">Ismail Manjlai</a></div>
        </div>
        <div className="footerBottom">
          <div className="footerCopyright">
            ©2021 Kilogram from Acorn Project
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
