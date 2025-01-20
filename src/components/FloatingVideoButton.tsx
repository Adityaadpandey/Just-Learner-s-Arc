import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    title?: string;
    description?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    videoUrl,
    title = "Discover Our Journey",
    description = "Experience the future of technology through our innovative solutions. Join us in building something extraordinary and be part of the next generation of technological advancement."
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handleVideoPlay = () => setIsVideoPlaying(true);
    const handleVideoPause = () => setIsVideoPlaying(false);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            delay: 0.5
                        }}
                        className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
                    >
                        <motion.button
                            onClick={() => setIsOpen(true)}
                            className="group relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-slate-200/10
                hover:bg-slate-800/90 transition-all duration-300"
                            whileHover={{
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            aria-label="Watch video now"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />

                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative"
                            >
                                <Play className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
                            </motion.div>

                            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300">
                                Watch Now
                            </span>

                            <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                    boxShadow: [
                                        "0 0 0 0 rgba(147, 197, 253, 0)",
                                        "0 0 0 4px rgba(147, 197, 253, 0.1)",
                                        "0 0 0 8px rgba(147, 197, 253, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-[#0a0a0f]/90 backdrop-blur-sm z-50"
                            onClick={handleClose}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="fixed inset-4 md:inset-10 z-50 flex flex-col"
                        >
                            <div className="relative flex-1 rounded-xl overflow-hidden shadow-2xl">
                                <motion.button
                                    onClick={handleClose}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-200/5 backdrop-blur-sm
                    hover:bg-slate-200/10 transition-all duration-300 group"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X className="w-6 h-6 text-slate-300/70 group-hover:text-slate-200" />
                                </motion.button>

                                <div className="absolute inset-0">
                                    <video
                                        ref={videoRef}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        controls
                                        onPlay={handleVideoPlay}
                                        onPause={handleVideoPause}
                                        src={videoUrl}
                                    />
                                </div>

                                <motion.div
                                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent"
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
                                                className="w-20 h-1 bg-gradient-to-r from-slate-200/20 to-blue-100/20 rounded-full"
                                                animate={{ scaleX: [1, 1.5, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />

                                            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
                                                {title}
                                            </h2>
                                            <p className="text-slate-300 text-lg leading-relaxed">
                                                {description}
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
    );
};

export default VideoPlayer;
