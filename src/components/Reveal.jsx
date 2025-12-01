import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, width = 'fit-content', delay = 0.25 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
        }
    }, [isInView, mainControls])

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: isVisible ? 'visible' : 'hidden' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                onAnimationComplete={() => setIsVisible(true)}
                transition={{ type: "spring", stiffness: 70, damping: 15, mass: 1.2, delay: delay }}
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: Math.random() * 2 // Random delay to prevent synchronized floating
                    }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    )
}
