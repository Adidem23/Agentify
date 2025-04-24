import React from "react";
import { motion } from "framer-motion";
import F2 from "../assets/Falio_A.png";
import F3 from "../assets/Gmail_A.png";
import F4 from "../assets/Bugger.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeIn", duration: 0.9 },
  },
};

const blockVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
};

const textBlockVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
  },
};

const FeatureHeadline = () => {
  return (
    <div className="text-center max-w-[75rem]" id="feature">
      <h1 className="text-6xl font-serif justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-200">
        What we offer
      </h1>
      <motion.div
        className="text-2xl max-w-3xl font-serif py-6 justify-center gap-2 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Discover the tools and features designed to enhance your competitive
        coding journey.
      </motion.div>
    </div>
  );
};

// Feature Block Component
const FeatureBlock = ({ title, description, image, reverse }) => {
  return (
    <motion.div
      className={`w-[75rem] h-[32rem] rounded-4xl flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } shadow-lg bg-[#121212] text-white`}
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="w-[50%] px-16 py-10 flex flex-col justify-center items-start"
        variants={textBlockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-3xl font-serif pb-6 ">{title}</p>
        <p className="text-lg font-sans leading-relaxed text-gray-300">{description}</p>
      </motion.div>
      <motion.div
        className="flex justify-center items-center w-[50%] px-8"
        variants={blockVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <img src={image} alt={title} className="w-[90%] h-[60%] rounded-lg" />
      </motion.div>
    </motion.div>
  );
};

// Main Features Component
const Features = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-black py-20">
      <FeatureHeadline />
      <div className="flex flex-col justify-center items-center gap-16">
        <FeatureBlock
          title="Code Debugger Agents"
          description="Our Code Debugger Agents are here to assist you in identifying and fixing bugs in your code. They provide real-time feedback, suggest improvements, and help you understand complex code structures. Say goodbye to debugging headaches!"
          image={F4}
          reverse={true}
        />
        <FeatureBlock
          title="Gmail Agents"
          description="Our Gmail Agents are designed to streamline your communication. They can help you draft emails, manage your inbox, and even set reminders for important messages. Experience a new level of productivity with our intelligent email assistants."
          image={F3}
          reverse={false}
        />
        <FeatureBlock
          title="DB Agents"
          description="Leverage the power of AI with our DB Agents. These intelligent agents assist you in solving complex problems, providing hints, and offering personalized feedback based on your performance. Enhance your coding skills with AI-driven insights."
          image={F2}
          reverse={true}
        />
      </div>
    </div>
  );
};

export default Features;
