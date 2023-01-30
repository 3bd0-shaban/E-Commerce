const AnimRoutes = {
    initial: {
        opacity: 0,
        y: 200,
    },
    shown: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            mass: 0.4,
            damping: 0,
            type: 'anticipate',
        },
    },
    exit: {
        y: 100,
        opacity: 0,
    },
};

export default AnimRoutes;
