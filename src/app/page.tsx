"use client"

import FormComponent from "@/components/form";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from 'lucide-react';
import { useRef, useState } from "react";


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setIsVideoPlaying(false)
  }

  return (
    <>
      <div ref={containerRef} className="relative bg-black">
        {/* Dynamic background */}
        <div className="fixed inset-0 z-0">
        </div>

        {/* Top Video Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen flex flex-col items-center justify-center relative px-4 mt-32"
        >
          <div className="text-center mb-12 relative z-10">
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 animate-gradient-xy">
                Welcome to the Future
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Join us in building something extraordinary
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0
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
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
          whileHover={{ scale: 1.05 }}
        >
          <motion.button
            onClick={() => setShowOverlay(true)}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Play video"
          >
            {/* Gradient overlay effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0
        group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Animated play icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Play
                className="w-5 h-5 text-white group-hover:text-purple-400 transition-colors duration-300"
              />
            </motion.div>

            {/* Button text */}
            <span className="relative font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
              Watch Video
            </span>
          </motion.button>
        </motion.div>

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

      {/* Video Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={() => setShowOverlay(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-4 md:inset-10 z-50 flex flex-col"
            >
              <div className="relative flex-1 rounded-xl overflow-hidden bg-black/80 shadow-2xl border border-white/10">
                <motion.button
                  onClick={() => setShowOverlay(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm
                    hover:bg-black/70 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6 text-white/70 group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                <div className="absolute inset-0">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    controls
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    src="https://media.istockphoto.com/id/1436848913/video/modern-megapolis-isometric-map-video-concept.mp4?s=mp4-640x640-is&amp;k=20&amp;c=DEVj9Yzy1Yg5pjj1R-RJ3Ixqsv3A6PHTT6jaTNpfmsE="
                  />
                </div>

                <motion.div
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent"
                  animate={{
                    opacity: isVideoPlaying ? 0 : 1,
                    y: isVideoPlaying ? 20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-3xl mx-auto space-y-4"
                    >
                      <motion.div
                        className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        animate={{ scaleX: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        Discover Our Journey
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Experience the future of technology through our innovative solutions. Join us in building
                        something extraordinary and be part of the next generation of technological advancement.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
