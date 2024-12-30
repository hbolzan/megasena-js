function Cage(context, maxBalls) {
    const { Random, Ball } = context,
          state = {
              roll: {
                  timeoutRange: [10, 100],
                  timer: null,
                  count: 0,
              },
              balls: [],
          };

    function shuffle(balls) {
        const random = Random(context, balls.length);
        return Array(balls.length).fill().map(e => balls[random.draw()-1]);
    }

    function rolling() {
        return state.roll.timer !== null;
    }

    function roll() {
        const [min, max] = state.roll.timeoutRange;
        state.roll.timer = setTimeout(
            () => {
                state.balls = shuffle(state.balls);
                state.roll.count += 1;
                roll();
            },
            Random(context, 60).randomInt(max, min)
        );
    }

    function startRolling() {
        if (rolling()) {
            throw ("Cage already rolling");
        }
        roll();
    }

    function stopRolling() {
        if (!rolling()) {
            throw ("Cage is not rolling");
        }

        if (state.roll.timer) {
            clearTimeout(state.roll.timer);
            state.roll.timer = null;
        };
    }

    function pop() {
        if (state.balls.length === 0) {
            return null;
        }

        if (!rolling()) {
            throw ("Cage is not rolling. Run startRolling before playing.");
        }

        stopRolling();
        const result = state.balls.slice(-1);
        state.balls = state.balls.slice(0, -1);
        startRolling();
        return result;
    }

    function initBalls() {
        return Array(maxBalls).fill().map((e, i) => Ball(i+1));
    }

    function reset() {
        if (rolling()) {
            stopRolling();
        }
        state.balls = initBalls();
        state.roll.count = 0;
        startRolling();
    }

    function init(params) {
        state.balls = initBalls();
        state.roll = { ...state.roll, ...(params || {}).roll };
        return {
            state: () => state,
            balls: () => state.balls,
            rolling,
            rollCount: () => state.roll.count,
            startRolling,
            stopRolling,
            pop,
            reset,
        };
    }

    return init();
}

module.exports = Cage;
