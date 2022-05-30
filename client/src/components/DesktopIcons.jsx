import SourceLogo from "../assets/images/source.png";
import GithubLogo from "../assets/images/github.png";
import LinkedinLogo from "../assets/images/linkedin.png";

export default function DesktopIcons() {
  return (
    <div className="desktop-icon-container">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/mattmuroya/poet"
        className="desktop-icon github"
      >
        <img src={SourceLogo} alt="github" />
        <p>Source code</p>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/mattmuroya/"
        className="desktop-icon github"
      >
        <img src={GithubLogo} alt="github" />
        <p>
          github.com/
          <br />
          mattmuroya
        </p>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/mattmuroya/"
        className="desktop-icon linkedin"
      >
        <img src={LinkedinLogo} alt="linkedin" />
        <p>
          linkedin.com/in/
          <br />
          mattmuroya
        </p>
      </a>
    </div>
  );
}
