import React from "react";
import { motion } from 'framer-motion'

export function AnimationSlideInShow({ children, config, id }: { children: React.ReactNode,config: any, id:any }) {
    return (
        <React.Fragment>
            <motion.div
                key={id}
                transition={{ duration: 0.7 }}
                initial={'hidde'}
                animate={'show'}
                variants={config}>
                {children}
            </motion.div>
        </React.Fragment>
    )
}