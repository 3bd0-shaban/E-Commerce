const AnimSlideRight = {
    initial: {
        opacity: 1,
    },
    animate: {
        opacity: 1,
        transition: { delay: 1.5, duration: 1.5 }
    },
    exit: {
        x: "100vh",
        transition: { ease: 'easeInOut' }
    }
};
export default AnimSlideRight