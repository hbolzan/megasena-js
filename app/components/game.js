function Game(context, { maxBalls }) {
    const { Cage } = context;
    function play(pickCount) {
        const cage = Cage(context, maxBalls);
        return Array(pickCount)
            .fill()
            .map(x => cage.pop().number)
            .sort((a, b) => a - b);
    }

    return {
        play,
    };
}

module.exports = Game;
