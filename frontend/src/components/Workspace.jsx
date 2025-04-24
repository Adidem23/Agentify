import React from "react";
import { motion } from "framer-motion";
import WorkspaceImg from "../assets/WorkSpaceVector.png";
import { FaArrowRight } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const Workspace = () => {
  return (
    <div className="bg-black text-white">
      <div className=" max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-serif text-center text-gray-100 mb-16"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-200">Powerful Workspace</span> Solution
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <img
              src={WorkspaceImg}
              alt="Workspace Feature"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h2 className="text-2xl font-serif text-gray-100">
              Smart <span className=" text-transparent bg-clip-text bg-gradient-to-bl from-purple-300 to-orange-200">Agentic </span> Workspaces
            </h2>
            <p className="text-lg font-sans text-gray-300">
              AI Agents 
            </p>
            <p className="font-sans text-gray-300">
              Our workspace is designed to foster collaboration among AI agents, enabling them to work together seamlessly. With advanced communication protocols and shared resources, agents can tackle complex tasks more efficiently.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex group items-center justify-center w-full sm:w-auto bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent dark:from-zinc-300/5 dark:via-purple-400/20 text-gray-900 dark:text-white border border-input hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-purple-400/30 transition-all py-3 px-10 rounded-full text-center"
            >
              Try Now <span className=" ml-2"><FaArrowRight/></span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
