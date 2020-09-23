import { addZero } from './supScript.js'
export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playList = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayd = audioPlayer.paused;
        const track = playList[trackIndex];
        audioImg.src = `./audio/${track}.jpg`; 
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;
        
        if(isPlayd){
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        audioPlayer.addEventListener('canplay', () => {
            updateTime();
        });

    }

    const prevTarack = () => {
        if(trackIndex){
            trackIndex--;
        } else {
            trackIndex = playList.length - 1;
        }
        loadTrack();
    };


    const nextTrack = () => {
        if(trackIndex !== playList.length - 1){
            trackIndex++;
        } else {
            trackIndex = 0;
        }
        loadTrack();
    };

    const updateTime = () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress  = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed =  Math.floor(currentTime / 60) || '0';
        const secondPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondTotal)}`;
    }

    audioNavigation.addEventListener('click', event =>{
        const target = event.target;

        if(target.classList.contains('audio-button__play')){
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if(audioPlayer.paused){
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if(target.classList.contains('audio-button__prev')){
           prevTarack();
        }

        if(target.classList.contains('audio-button__next')){
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', updateTime);

    audioProgress.addEventListener('click', event => {
        const x = event. offsetX;
        const allWidth =audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    musicPlayerInit.stop = () => {
        if(!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }
    }

    updateTime();
}