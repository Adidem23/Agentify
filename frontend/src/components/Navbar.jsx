import React, { useState, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import {SignInButton} from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current;
    if (Math.abs(diff) > 50) {
      setIsHidden(diff > 0);
      lastYRef.current = y;
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.div
      className="w-full flex justify-center fixed top-4 z-50 font-serif"
      initial={{ y: -100, opacity: 0 }}
      animate={isHidden ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <motion.nav
        className="w-full max-w-3xl px-6 py-3 flex items-center justify-between border border-gray-600 
          bg-white/5 backdrop-blur-lg rounded-full shadow-lg"
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", type: "spring" }}
      >
        <div className="flex w-full justify-between items-center">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#feature">Features</NavLink>
          <p className="text-3xl text-white font-semibold">AI Agents</p>
          <NavLink href="#footer">Contact</NavLink>
          <NavLink><SignInButton/></NavLink>

          <button className="lg:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-40 flex flex-col items-center justify-center lg:hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <NavLink href="#home" onClick={toggleMenu}>
              About Us
            </NavLink>
            <NavLink href="#about" onClick={toggleMenu}>
              FAQs
            </NavLink>
            <NavLink href="#services" onClick={toggleMenu}>
              SERVICES
            </NavLink>
            <NavLink href="#contact" onClick={toggleMenu}>
              Join Now
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    className="text-white text-lg relative group transition duration-300 my-1 active:scale-90"
    onClick={onClick}
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
  </a>
);

export default Navbar;