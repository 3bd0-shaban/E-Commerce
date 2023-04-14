const AnimDragabbleup = {
    initail: {
        y: "100vh",
        opacity: 1,
    },
    shown: {
        y: "0",
        opacity: 1,
        transition: { duration: 5.5 }
    },
    exit: {
        x: "100vh",
        transition: { ease: 'easeInOut' }
    }
};
export default AnimDragabbleup