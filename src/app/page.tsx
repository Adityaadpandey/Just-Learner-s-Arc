"use client"

import FormComponent from "@/components/form"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const [isVideoHovered, setIsVideoHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const introScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  const introOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Enhanced floating elements
  const floatingElements = Array.from({ length: 3 }).map((_, i) => (
    <motion.div
      key={i}
      className={`absolute w-64 h-64 bg-gradient-to-r
        ${i === 0 ? 'from-purple-500/10 to-blue-500/10' :
          i === 1 ? 'from-blue-500/10 to-purple-500/10' :
            'from-purple-500/10 via-blue-500/10 to-purple-500/10'}
        rounded-full blur-3xl`}
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
    <div ref={containerRef} className="relative bg-black overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" /> */}
        <div className="absolute inset-0 bg-grid animate-grid-fade opacity-5" />
        {floatingElements}
      </div>

      {/* Enhanced Hero Section */}
      <motion.section
        ref={introRef}
        style={{ scale: introScale, opacity: introOpacity }}
        className="min-h-screen flex flex-col items-center justify-center relative px-4"
      >
        {/* <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 blur-3xl"
          />
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10 mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-40 h-40 mx-auto mb-8 relative"
          >

          </motion.div>

          <motion.h1
            className="text-6xl  font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 animate-gradient-xy">
              Welcome to the Learner&apos;s Arc
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join us in Making you extraordinary
          </motion.p>
        </motion.div>

        {/* Enhanced Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-5xl mx-auto relative z-10 px-4"
          onHoverStart={() => setIsVideoHovered(true)}
          onHoverEnd={() => setIsVideoHovered(false)}
        >
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            animate={{
              boxShadow: isVideoHovered
                ? "0 0 50px -12px rgba(124, 58, 237, 0.5)"
                : "0 0 30px -12px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Premium Video Effects */}
            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                background: isVideoHovered
                  ? "radial-gradient(circle at center, rgba(124, 58, 237, 0.3) 0%, transparent 70%)"
                  : "radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)"
              }}
              transition={{ duration: 0.5 }}
            />

            <div className="aspect-video relative z-10 group">
              <video
                className="w-full h-full object-cover transform transition-all duration-700 scale-105"
                autoPlay
                loop
                muted
                playsInline
                controls={isVideoHovered}
              >
                <source src="https://cloudinary-marketing-res.cloudinary.com/video/upload/f_auto,q_auto,w_900/v1691615364/smart_tagging_3-2.mp4" type="video/mp4" />
              </video>

              {/* Enhanced Video Overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                animate={{
                  opacity: isVideoHovered ? 0 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  animate={{
                    scale: isVideoHovered ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path d="M8 5v14l11-7z" />
                    </motion.svg>
                  </motion.div>
                  <span className="text-white text-xl font-medium tracking-wide">
                    Watch our story
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Border Effect */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl z-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isVideoHovered ? 1 : 0,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-50 blur-sm animate-pulse-slow" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Form Section */}
      <section className="relative z-10">
        <FormComponent />
      </section>
    </div>
  )
}
