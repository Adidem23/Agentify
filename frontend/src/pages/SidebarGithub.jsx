import React, { useState, useEffect, useRef } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./Sidebar";
import { IconUserBolt } from "@tabler/icons-react";
import { AwardIcon, Send } from "lucide-react"
import { cn } from "../lib/utils";
import { SignOutButton, useUser } from '@clerk/clerk-react';
import axios from "axios";
import { motion } from "framer-motion";
import DummyPreviousChats from "./DummyChats";
import ChatMessage from "./ChatMessage";

export function SidebarDemo() {

  const { user } = useUser();


  const [AllPreviousChats, setAllPreviousChats] = useState([])

  useEffect(() => {
    const fetchPreviousChats = async () => {
      try {
        const response = await axios.get("http://localhost:1302/api/getGithubChatMetadata");
        setAllPreviousChats(response.data);
        console.log("Fetched previous chats:", response.data);

      } catch (error) {
        console.error("Error fetching previous chats:", error);
      }
    };

    fetchPreviousChats();
  }, [])



  const links = [
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    }

  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full  flex-1 flex-col overflow-hidden  border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[100vh] w-full]"
      )}>
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <div className="flex flex-row px-2 py-2">
                <LogoIcon />
                <Logo />
              </div>
            </>
            <div className="mt-8 flex flex-col gap-2" >
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
            <br />

            <p className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 " style={{ fontSize: '20px', fontWeight: 'bolder' }}>Previous Chats</p>

            <DummyPreviousChats previousChats={AllPreviousChats} />
          </div>



          <div className="flex flex-row">
            <SidebarLink
              link={{
                label: `${user && user.fullName}`,
                href: "#",
                icon: (
                  <img
                    src={user && user.imageUrl}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),

              }} />

            <SignOutButton className="mt-4 ml-7">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e7d5d5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
            </SignOutButton>

          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white ml-5" style={{ fontSize: '20px' }}>
        Github Agent
      </motion.span>

    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

function Dashboard() {

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4">
      <ChatInterface />
    </div>
  )
}




function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const { user } = useUser();

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    }

    
    const GithubotResponse = await axios.post("http://localhost:1302/api/saveGithubChatMetadata", {user:user.fullName,userEmail:user.primaryEmailAddress.emailAddress,title:input}, { withCredentials: true });

    console.log("Response from server:", GithubotResponse.data);

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)


    try {

      const response = await axios.post("http://localhost:1302/api/getGithubAgentResponse", { query: input })

      if (response.data) {

        console.log("Response from server:", response.data);

        const botMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: `${response.data}`
        }

        setMessages((prev) => [...prev, botMessage])
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
    }

    // setTimeout(() => {
    //   const botMessage = {
    //     id: Date.now() + 1,
    //     role: "assistant",
    //     content: `${chatAnswer}`
    //   }

    //   setMessages((prev) => [...prev, botMessage])
    //   setIsLoading(false)
    // }, 1000)


  }

  return (
    <div className="flex flex-col w-full  h-full bg-black text-white">

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-12 text-center">What can I help you ship?</h1>
          </div>
        ) : (
          messages.map((message) => <ChatMessage key={message.id} role={message.role} content={message.content} />)
        )}
        <div ref={messagesEndRef} />
      </div>


      <div className=" p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Github Agent 🤖 a Task ..."
              className="w-full p-3 pr-10 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-md bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>


    </div>
  )
}