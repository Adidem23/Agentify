import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import FooterBg from "../assets/FooterBG.jpg";

const Footer = () => {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);

  return (
    <div id="footer" ref={container} className="relative bg-gray-50w-full">
      <div
        id="footer"
        ref={container}
        className="relative text-white border-none"
        style={{ backgroundImage: `url(${FooterBg})` }}
      >
        <div className="h-[150px] md:h-[250px] overflow-hidden">
          <motion.div
            className="h-full flex justify-center items-center"
            style={{ y }}
          >
            <p className="text-[120px] md:text-[160px] lg:text-[210px] font-serif mt-4 text-transparent bg-gradient-to-b from-white to-neutral-700 bg-clip-text">
              Agentify
            </p>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row justify-around items-start p-4 md:p-8 font-serif gap-6 md:gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-serif text-xl md:text-2xl">Contact</p>
            <div className="flex flex-row gap-1">
              <p className="font-serif text-lg md:text-xl">Email:</p>
              <a href="mailto:sidh412@gmail.com" className="text-sm md:text-lg ">
                agentsai2025@help.com
              </a>
            </div>
          </div>

          <div className="flex flex-col ">
            <p className="font-serif text-xl md:text-2xl">Discover</p>
            <ul className="flex flex-col gap-2 mt-2">
              <a href="/" className="text-sm md:text-lg text-gray-300 hover:text-white transition-colors hover:underline">
                AI agents
              </a>
              <a
                href=""
                className="text-sm md:text-lg  text-gray-300 hover:text-white transition-colors hover:underline"
              >
                LLMs
              </a>
              <a href="" className="text-sm md:text-lg  text-gray-300 hover:text-white transition-colors hover:underline">
                Vector Databases
              </a>
            </ul>
          </div>

          <div className="flex flex-col ">
            <p className="font-serif text-xl md:text-2xl">Quick Links</p>
            <ul className="flex flex-col gap-2 mt-2">
              <a href="/" className="text-sm md:text-lg text-gray-300 hover:text-white transition-colors hover:underline">
                Home
              </a>
              <a
                href=""
                className="text-sm md:text-lg  text-gray-300 hover:text-white transition-colors hover:underline"
              >
                Database Agent Blog
              </a>
              <a href="" className="text-sm md:text-lg  text-gray-300 hover:text-white transition-colors hover:underline">
                Vector Database Blog
              </a>
              <a href="" className="text-sm md:text-lg  text-gray-300 hover:text-white transition-colors hover:underline">
                LLMs Blog
              </a>
              <a href="" className="text-sm md:text-lg  text-gray-300 hover:text-white transition-colors hover:underline">
                AI Agents Blog
              </a>
            </ul>
          </div>
          <div>
            <p className="font-serif text-xl md:text-2xl">Socials</p>
            <ul className="flex flex-col gap-2 mt-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-lg text-gray-300 hover:text-white transition-colors hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-lg text-gray-300 hover:text-white transition-colors hover:underline"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-lg text-gray-300 hover:text-white transition-colors hover:underline"
              >
                Instagram
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
