import SourceIcon from "../assets/images/source.png";
import GithubIcon from "../assets/images/github.png";
import LinkedinIcon from "../assets/images/linkedin.png";
import EmailIcon from "../assets/images/email.png";

export default function DesktopIcons() {
  return (
    <div className="desktop-icon-container">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/mattmuroya/poet"
        className="desktop-icon"
      >
        <img src={SourceIcon} alt="source code" />
        <p>Source code</p>
      </a>
      <a href="mailto:matt.muroya@gmail.com" className="desktop-icon">
        <img src={EmailIcon} alt="email" />
        <p>E-mail me!</p>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/mattmuroya/"
        className="desktop-icon"
      >
        <img src={LinkedinIcon} alt="linkedin" />
        <p>
          linkedin.com/in/
          <br />
          mattmuroya
        </p>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/mattmuroya/"
        className="desktop-icon"
      >
        <img src={GithubIcon} alt="github" />
        <p>
          github.com/
          <br />
          mattmuroya
        </p>
      </a>
    </div>
  );
}
