const CPlayer = require('../../libraries-that-dont-care-about-npm/soundbox-player-small.js');

import gameplayMusic from './data/gameplayMusic';
import hitSound from './data/hitSound';

export default class SoundPlayer {
    private soundsData: SoundsData[];
    private sounds: Sounds;

    constructor() {
        this.sounds = {};
        this.soundsData = [
            {
                name: SOUND_NAMES.GameplayMusic,
                data: gameplayMusic,
            },
            {
                name: SOUND_NAMES.Hit,
                data: hitSound,
            },
        ];
        this.prepareSounds();
    }

    private prepareSounds(): void {
        this.soundsData.forEach((soundData) => {
            const soundGenerator = new CPlayer();
            soundGenerator.init(soundData.data);
            let done = false;
            setInterval(() => {
                if (done) {
                    return;
                }
                done = soundGenerator.generate() === 1;
                if (done) {
                    const wave = soundGenerator.createWave().buffer;

                    audioCtx.decodeAudioData(wave, (buffer) => {
                        this.sounds[soundData.name] = buffer;
                    });
                }
            }, 0);
        });
    }

    public playSound(soundName: string, options: PlaySoundOptions = {}): void {
        const source = audioCtx.createBufferSource();
        const gainNode = audioCtx.createGain();
        const panNode = audioCtx.createStereoPanner();

        source.buffer = this.sounds[soundName];
        source.connect(panNode);
        panNode.connect(gainNode);
        gainNode.connect(audioMaster);

        source.playbackRate.value = options.playbackRate || 1;
        source.loop = options.loop || false;
        gainNode.gain.value = options.volume || 0.5;
        panNode.pan.value = options.pan || 0;
        source.start();
    }
}

export const SOUND_NAMES = {
    GameplayMusic: 'GameplayMusic',
    Hit: 'Hit',
};

interface PlaySoundOptions {
    playbackRate?: number,
    pan?: number,
    volume?: number,
    loop?: boolean,
}

interface Sounds {
    [soundName: string]: AudioBuffer;
}

interface SoundsData {
    name: string;
    data: any;
}

const audioCtx = new AudioContext;
const audioMaster = audioCtx.createGain();
audioMaster.connect(audioCtx.destination);
