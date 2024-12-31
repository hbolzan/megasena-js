const readline = require("readline");
const context = require("./context.js");

function showInstructions() {
    console.log("MegaSena JS");
    console.log("Usage:");
    console.log("  d - draw a number");
    console.log("  r - reset the raffle cage");
    console.log("  q - quit");
    console.log("===========================");
}

function Index() {
    const megaSenaMaxBalls = 60;
    const cage = context.Cage(context, megaSenaMaxBalls);
    cage.reset();

    const rl = readline.createInterface({
        input: process.stdin,
        output: false,
    });
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
    }

    showInstructions();

    function quit() {
        console.log("Terminating...");
        rl.close();
        process.exit(0);
    }

    function reset() {
        cage.reset();
        console.log("Cage reset...");
        console.log("---------------------------");
    }

    function draw() {
        const ball = cage.pop();
        console.log(ball);
    }

    const actions = {
        q: quit,
        r: reset,
        d: draw,
    };

    process.stdin.on('keypress', (str, key) => {
        if (actions[key.sequence]) {
            actions[key.sequence]();
        }
    });


    return {};
}

const index = Index();
