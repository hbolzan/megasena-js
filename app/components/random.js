function Random({ Math }, max) {
    const state = {
        drawn: [],
    };

    function randomInt(max, min = 0) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }

    function draw() {
        let x;
        while (true) {
            x = randomInt(max);
            if ( ! state.drawn.includes(x) ) {
                state.drawn = state.drawn.concat(x);
                return x;
            }
        }
    }

    return {
        randomInt,
        draw,
    };
}

module.exports = Random;
