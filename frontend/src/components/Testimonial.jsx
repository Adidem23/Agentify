import React, { useState } from "react";

const DotCard = React.forwardRef(
  ({ className, title, description, children, ...props }, ref) => {
    const sharedClasses =
      "rounded-full outline outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-green-400";

    return (
      <div
        ref={ref}
        className={`relative mx-auto w-full bg-black rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 px-4 sm:px-6 md:px-8 ${className}`}
        {...props}
      >
        <div className="absolute left-0 top-4 -z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:top-6 md:top-8" />
        <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:bottom-6 md:bottom-8" />
        <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
          <div className="absolute z-0 grid h-full w-full items-center">
            <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
              <div className={`${sharedClasses} -translate-x-[2.5px]`} />
              <div
                className={`${sharedClasses} translate-x-[2.5px] place-self-end`}
              />
              <div className={`${sharedClasses} -translate-x-[2.5px]`} />
              <div
                className={`${sharedClasses} translate-x-[2.5px] place-self-end`}
              />
            </section>
          </div>
          <div className="relative z-20 mx-auto py-8 w-[20rem]">
            <div className="p-6">
              {title && (
                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-gray-700 dark:text-gray-300">
                  {description}
                </p>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

DotCard.displayName = "DotCard";

const testimonials = [
  {
    author: {
      name: "Rajiv Sharma",
      handle: "@rajivdev",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "CodeArena has significantly improved my algorithmic thinking. The 1v1 battles pushed me to solve problems faster and more efficiently than I ever thought possible!",
    href: "https://twitter.com/rajivdev",
  },
  {
    author: {
      name: "Priya Verma",
      handle: "@priyacodes",
      avatar: 
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "The platform's reward system kept me motivated throughout my DSA learning journey. I've redeemed points for some amazing tech gadgets while improving my skills!",
    href: "https://twitter.com/priyacodes",
  },
  {
    author: {
      name: "Asmit Patel",
      handle: "@asmitdevops",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "Organizing our college hackathon was seamless with this platform. The scheduler and registration features helped us manage over 200 participants with ease.",
  },
  {
    author: {
      name: "Sneha Gupta",
      handle: "@snehaml",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "The ML competitions on this platform exposed me to real-world problems. I've improved my model building skills tremendously and even landed an internship!",
  },
  {
    author: {
      name: "Vikram Mehta",
      handle: "@vikramcp",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "From a complete beginner to reaching the top 50 on the CP leaderboard in just 6 months. The competitive environment here is challenging yet incredibly supportive.",
  },
  {
    author: {
      name: "Anjali Reddy",
      handle: "@anjalifullstack",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "The comprehensive event calendar keeps me updated on all upcoming competitions. I've participated in 15 hackathons through this platform and won three of them!",
  },
  {
    author: {
      name: "Rahul Joshi",
      handle: "@rahuljava",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "The gamified experience makes learning DSA fun rather than daunting. Climbing up the ranks has become addictive, and my problem-solving skills have improved dramatically.",
  },
  {
    author: {
      name: "Neha Singh",
      handle: "@nehacloud",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "As a recruiter, this platform helps me identify talented coders. The leaderboard system and achievement tracking give great insights into candidates' skills and persistence.",
  },
];

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="py-12 sm:py-24 md:py-32 px-4 bg-black text-white h-screen relative">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-16 b">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl sm:text-5xl max-w-screen-lg font-serif p-1 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-200">
            See What Our Users Are Saying
          </h2>
          <p className="max-w-2xl text-md sm:text-xl text-gray-300 text-center font-serif">
          Discover how our platform has helped coders advance their skills and careers through competitions.
          </p>
        </div>
        <div
          className="relative flex w-full overflow-hidden group"
          onClick={handleClick}
        >
          {" "}
          <div
            className={`flex gap-6 animate-marquee flex-row ${
              isPaused
                ? "pointer-events-none"
                : "group-hover:[animation-play-state:paused]"
            }`}
          >
            {[...Array(2)].map((_, loopIndex) =>
              testimonials.map((testimonial, i) => (
                <DotCard
                  key={`${loopIndex}-${i}`}
                  description={testimonial.text}
                >
                  <div className="flex gap-4 mt-4">
                    <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
                      <img
                        src={testimonial.author.avatar}
                        alt={testimonial.author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="text-md font-semibold">
                        {testimonial.author.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.author.handle}
                      </p>
                    </div>
                  </div>
                </DotCard>
              ))
            )}
          </div>
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
