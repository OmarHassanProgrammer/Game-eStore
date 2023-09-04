import { motion } from "framer-motion";
import React from "react";

const animations = {
    initial: { y: 200 },
    animate: { y: 0, transition: {  y: { type: "spring", duration: 0.8, bounce: 0.35 }} },
    exit: { y: 200, transition: {  y: { type: "spring", duration: 1.5, bounce: 0.575 }} },
}

const AnimatedChat = ({children}) => {
    return (
        <motion.div
          variants={animations}
          initial="initial"
          animate="animate"
          exit="exit"
        >
            {children}
        </motion.div>
    )
}

export default AnimatedChat;