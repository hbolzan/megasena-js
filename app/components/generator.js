function Generator(context) {
    const { Game } = context;
    function frequency(samples) {
        return samples.reduce((freq, sample) => {
            sample.forEach(n => freq[n] = (freq[n] || 0) + 1 );
            return freq;
        }, {});
    }

    function sortedFrequency(freqArray) {
        const sorted = Array.from(freqArray);
        sorted.sort((a, b) => (b[1] - a[1]) || (a[0] - b[0]));
        return sorted;
    }

    function sortedArray(a) {
        const sorted = Array.from(a);
        sorted.sort((a, b) => a - b);
        return sorted;
    }

    function play(maxBalls, pickCount, sampleCount) {
        const game = Game(context, { maxBalls });
        const samples = Array.from(Array(sampleCount)).map(_ => game.play(pickCount));
        const freq = frequency(samples);
        const freqArray = Object.keys(freq).map(k => [k, freq[k]]);
        return sortedFrequency(freqArray);
    }

    function mega(sampleCount, takeCount) {
        const played = play(60, 6, sampleCount);
        return sortedArray(played.map(r => r[0]).slice(0, takeCount));
    }

    return {
        play,
        mega,
    };
}

module.exports = Generator;
