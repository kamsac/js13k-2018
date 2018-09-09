const CPlayer = require('../../libraries-that-dont-care-about-npm/soundbox-player-small.js');

import music from './data/gameplay-music';

export default class SoundPlayer {
    public music: any;

    private player: any;

    constructor() {
        this.music = music;

        this.player = new CPlayer();
        this.player.init(this.music);
    }

    public playMusic(): void {
        let loaded = 0;
        while (loaded < 1) {
            loaded = this.player.generate();
        }
        const wave = this.player.createWave();
        const audio = document.createElement("audio");
        audio.loop = true;
        audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        audio.play();
    }
}
