import { ImGithub, ImLinkedin } from "react-icons/im";
import { HiExternalLink } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative footer footer-center text-base-content p-4 mt-auto z-0 ">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <div className="flex items-center justify-center gap-2 text-sm text-white/70">
          <span className="text-xs">© {currentYear}</span>
          <span className="text-xs">Built by Dr C.J. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-2">
          {/* GitHub Link */}
          <a
            href="https://github.com/joshuaosunlakin3433"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-xs hover:btn-neutral transition-colors"
            aria-label="GitHub Profile"
          >
            <ImGithub className="size-4" />
            <span className="hidden sm:inline text-xs">GitHub</span>
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/joshua-osunlakin-dvm-775088191"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-xs hover:btn-neutral transition-colors"
            aria-label="LinkedIn Profile"
          >
            <ImLinkedin className="size-4" />
            <span className="hidden sm:inline text-xs">LinkedIn</span>
          </a>

          {/* Optional: Portfolio Link */}
          <a
            href="https://joshua-portfolio-two-flax.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-xs  hover:btn-neutral transition-colors"
            aria-label="Portfolio Website"
          >
            <HiExternalLink className="size-4" />
            <span className="hidden sm:inline text-xs">Portfolio</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
