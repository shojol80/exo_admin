export default {
    setECO(state, ECO) {
        for (const property in ECO)
            state[property] = ECO[property];
    },
};

