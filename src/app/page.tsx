"use client"

import VideoPlayer from "@/components/FloatingVideoButton"
import FormComponent from "@/components/form"
import { motion } from "framer-motion"
import { useRef } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  const floatingElements = Array.from({ length: 3 }).map((_, i) => (
    <motion.div
      key={i}
      className={`absolute w-64 h-64 rounded-full blur-3xl ${i === 0 ? 'bg-slate-200/5' :
        i === 1 ? 'bg-blue-100/5' :
          'bg-slate-300/5'
        }`}
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        scale: [1, 1.2, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20 + i * 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
      style={{
        left: `${20 + i * 30}%`,
        top: `${20 + i * 20}%`,
      }}
    />
  ))


  return (
    <>
      <div ref={containerRef} className="relative bg-[#0a0a0f]">
        {/* Dynamic background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-[#0a0a0f] to-[#0a0a0f]" />
          <div className="absolute inset-0 bg-grid animate-grid-fade opacity-5" />
          {floatingElements}
        </div>

        {/* Top Video Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col items-center justify-center relative px-4"
        >
          <div className="text-center mb-12 relative z-10">

            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mt-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-gradient-elegant">
                Welcome to Learner&apos;s Arc
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-xl md:text-2xl text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Join us in building You extraordinary
            </motion.p>
          </div>

          {/* Main Video Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-4xl mx-auto relative z-10"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200/10 to-blue-100/10 opacity-0
                group-hover:opacity-100 transition-opacity duration-300 z-10" />

              <video
                className="w-full aspect-video object-cover transform transition-transform duration-700 scale-105"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://cloudinary-marketing-res.cloudinary.com/video/upload/f_auto,q_auto,w_900/v1691615364/smart_tagging_3-2.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Watch Video Button */}
        <VideoPlayer
          videoUrl="https://media.istockphoto.com/id/1436848913/video/modern-megapolis-isometric-map-video-concept.mp4?s=mp4-640x640-is&amp;k=20&amp;c=DEVj9Yzy1Yg5pjj1R-RJ3Ixqsv3A6PHTT6jaTNpfmsE="

        />
        {/* Form Section with Enhanced Spacing */}
        <motion.section
          className="relative z-10 pt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FormComponent />
        </motion.section>
      </div>


    </>
  )
}
