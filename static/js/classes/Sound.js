function Sound() {
    audioContext = new(window.AudioContext || window.webkitAudioContext)(),
        bgmSource = audioContext.createBufferSource(),
        bgmGainNode = audioContext.createGain();

    this.chooseMenu = function() {
        let seGainNode = audioContext.createGain(),
            oscillator = audioContext.createOscillator();
        oscillator.type = 'triangle';
        oscillator.frequency.value = 800;

        oscillator.connect(seGainNode);
        seGainNode.connect(audioContext.destination);

        var fraction = parseInt(settings.se) / 10;
        seGainNode.gain.value = fraction * fraction;

        oscillator.start();
        setInterval(function() {
            oscillator.frequency.value = 1000;
        }, 20);

        oscillator.stop(audioContext.currentTime + 0.04);
    };

    this.selectMenu = function() {
        let seGainNode = audioContext.createGain(),
            oscillator = audioContext.createOscillator();

        var real = new Float32Array([1, 0.4, 0.4, 1, 1, 1, 0.3, 0.7, 0.6, 0.5, 0.9, 0.8]);

        var imag = new Float32Array(real.length);
        var hornTable = audioContext.createPeriodicWave(real, imag);

        oscillator = audioContext.createOscillator();
        oscillator.setPeriodicWave(hornTable);

        oscillator.setPeriodicWave(hornTable);
        oscillator.frequency.value = 480;


        oscillator.connect(seGainNode);
        seGainNode.connect(audioContext.destination);

        var fraction = parseInt(settings.se) / 10;
        seGainNode.gain.value = fraction * fraction;

        oscillator.start();

        setInterval(function() {
            seGainNode.gain.value = 0;
            oscillator.stop(audioContext.currentTime + 0.01);
        }, 100);
    };

    this.changeVolSettings = function() {
        let seGainNode = audioContext.createGain(),
            oscillator = audioContext.createOscillator();
        oscillator.type = 'triangle';
        oscillator.frequency.value = 1000;

        oscillator.connect(seGainNode);
        seGainNode.connect(audioContext.destination);

        var fraction = parseInt(settings.se) / 10;
        seGainNode.gain.value = fraction * fraction;

        oscillator.start();
        setInterval(function() {
            oscillator.frequency.value = 1100;
        }, 20);

        setInterval(function() {
            seGainNode.gain.value = 0;
            oscillator.stop(audioContext.currentTime + 0.01);
        }, 40);
    };

};