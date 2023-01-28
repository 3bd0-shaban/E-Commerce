const AnimSlideLeft = {
    hidden: {
        x: "100vh",
        opacity: 1,
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: { duration: 5.5 }
    },
    exit: {
        x: "-100vh",
        transition: { ease: 'easeInOut' }
    }
};
export default AnimSlideLeft