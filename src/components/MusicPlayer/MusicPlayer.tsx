import React, { SyntheticEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../../authcontext/GlobalContext";
import "./MusicPlayer.css";

import { Howl } from "howler";
import ktc from "../../assets/audio/kotor/Kotor-Upper-City-Cantina.mp3";
import kmac from "../../assets/audio/kotor/Kotor-Mannan-Ahto-City.mp3";
import JavyarsCantina from "../../assets/audio/kotor/Kotor-Javyar's-Cantina.mp3";
import Dantooine from "../../assets/audio/kotor/Kotor-Dantooine.mp3";
import IzizCantina from "../../assets/audio/kotor2/Kotor2-Iziz-Cantina.mp3";

import { textChangeRangeIsUnchanged } from "typescript";
import kotorCover from "../../assets/img/kotor-cover.jpg";
import kotor2Cover from "../../assets/img/kotor2-cover.jpg";

interface Track {
  index: number;
  howl: Howl;
  info: {
    album: string;
    title: string;
    cover: string;
  };
}

const howler: Array<Track> = [
  {
    index: 0,
    howl: new Howl({ src: `${ktc}`, html5: true }),
    info: {
      album: "Star Wars: Knights of the Old Republic",
      title: "Upper City Taris Cantina",
      cover: kotorCover,
    },
  },
  {
    index: 1,
    howl: new Howl({ src: `${kmac}`, html5: true }),
    info: {
      album: "Star Wars: Knights of the Old Republic",
      title: "Mannan Ahto City",
      cover: kotorCover,
    },
  },

  {
    index: 2,
    howl: new Howl({ src: `${JavyarsCantina}`, html5: true }),
    info: {
      album: "Star Wars: Knights of the Old Republic",
      title: "Javyar's Cantina",
      cover: kotorCover,
    },
  },
  {
    index: 3,
    howl: new Howl({ src: `${Dantooine}`, html5: true }),
    info: {
      album: "Star Wars: Knights of the Old Republic",
      title: "Dantooine",
      cover: kotorCover,
    },
  },
  {
    index: 4,
    howl: new Howl({ src: `${IzizCantina}`, html5: true }),
    info: {
      album: "Star Wars Knights of the Old Republic II: The Sith Lords",
      title: "Iziz Cantina",
      cover: kotor2Cover,
    },
  },
];

let currentlyActiveTrack = howler[0];

function MusicPlayer() {
  const selfRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef<HTMLDivElement>(null);
  const nextTrackRef = useRef<HTMLDivElement>(null);
  const prevTrackRef = useRef<HTMLDivElement>(null);
  const volumeBtnRef = useRef<HTMLDivElement>(null);
  const playListRef = useRef<HTMLDivElement>(null);

  const albumCoverRef = useRef<HTMLDivElement>(null);
  const albumTitleRef = useRef<HTMLDivElement>(null);
  const trackTitleRef = useRef<HTMLDivElement>(null);
  const trackDurationRef = useRef<HTMLDivElement>(null);
  const volumeStripRef = useRef<HTMLDivElement>(null);
  const realStripRef = useRef<HTMLDivElement>(null);

  const trackDurationWrapper = useRef<HTMLDivElement>(null);
  const trackDurationStrip = useRef<HTMLDivElement>(null);

  const [updateUI, setUpdateUI] = useState(false);
  const [updateDuration, setUpdateDuration] = useState(false);
  const [mute, setMute] = useState(false);
  const [updateVolumeValue, setUpdateVolumeValue] = useState(false);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<HTMLDivElement>();

  const toogleMute = useCallback(() => setMute((state) => !state), [setMute]);

  let muteThis: boolean = false;
  let volume: number = 1;

  function playBtnHandler(e: any) {
    e.stopPropagation();

    currentlyActiveTrack.howl.play();
  }

  function playNewTrack(e: any) {
    e.stopPropagation();
    trackDurationRef.current!.innerText = formatTime(0);
    trackDurationStrip.current!.style.width = "0%";

    if (currentlyActiveTrack.howl.playing()) {
      currentlyActiveTrack.howl.stop();
      currentlyActiveTrack = howler[e.target.getAttribute("data-index")];
      currentlyActiveTrack.howl.play();
    } else if (!currentlyActiveTrack.howl.playing()) {
      currentlyActiveTrack = howler[e.target.getAttribute("data-index")];
      currentlyActiveTrack.howl.play();
    }
    playRef.current!.style.display = "none";
    pauseRef.current!.style.display = "block";
  }

  function pauseBtnHandler(e: any) {
    e.stopPropagation();
    currentlyActiveTrack.howl.pause();
  }

  function nextTrackBtnHandler(e: any) {
    e.stopPropagation();

    trackDurationRef.current!.innerText = formatTime(0);
    trackDurationStrip.current!.style.width = "0%";

    currentlyActiveTrack.howl.stop();
    currentlyActiveTrack = howler[getNextIndex()];
    currentlyActiveTrack.howl.play();
  }

  function prevTrackBtnHandler(e: any) {
    e.stopPropagation();

    currentlyActiveTrack.howl.stop();
    currentlyActiveTrack = howler[getPrevIndex()];
    currentlyActiveTrack.howl.play();

    trackDurationRef.current!.innerText = formatTime(0);
    trackDurationStrip.current!.style.width = "0%";
  }

  function getNextIndex(): number {
    if (currentlyActiveTrack.index === 0) {
      return 1;
    } else if (currentlyActiveTrack.index === howler.length - 1) {
      return 0;
    }
    return currentlyActiveTrack.index + 1;
  }
  function getPrevIndex(): number {
    if (currentlyActiveTrack.index === 0) {
      return howler.length - 1;
    }
    return currentlyActiveTrack.index - 1;
  }

  function formatTime(seconds: number): string {
    if (seconds === 0) return "00:00";
    let minutes = Math.floor(seconds / 60);
    let sec = Math.round(seconds - minutes * 60);

    return `0${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  }

  function setTime(e: any) {
    let targetElemWidth = e.srcElement.clientWidth;
    let userClickedCoordX = e.offsetX;

    let goTo = (userClickedCoordX / targetElemWidth) * 100;
    currentlyActiveTrack.howl.seek(Math.floor((currentlyActiveTrack.howl.duration() / 100) * goTo));
  }

  function muteHowl() {
    if (muteThis) {
      currentlyActiveTrack.howl.mute(false);
      muteThis = false;
      toogleMute();
      return;
    }
    currentlyActiveTrack.howl.mute(true);
    muteThis = true;
    toogleMute();
  }

  function checkMuted() {
    muteThis && currentlyActiveTrack.howl.mute(true);
  }

  function setVolume(e: any) {
    currentlyActiveTrack.howl.volume(Math.floor((e.offsetX / e.target.clientWidth) * 100) / 100);
    volume = Math.floor((e.offsetX / e.target.clientWidth) * 100) / 100;
    setUpdateVolumeValue((prev) => !prev);
  }

  useEffect(() => {
    realStripRef.current!.style.width = `${currentlyActiveTrack.howl.volume() * 100}%`;
  }, [updateVolumeValue]);
  // With every event that happens to change currentActiveTrack we trigger this effect
  useEffect(() => {
    albumCoverRef.current!.style.backgroundImage = `url(${currentlyActiveTrack.info.cover})`;
    albumTitleRef.current!.innerText = `${currentlyActiveTrack.info.album}`;
    trackTitleRef.current!.innerText = `${currentlyActiveTrack.info.title}`;
    playListRef.current!.children.item(currentlyActiveTrack.index);

    currentPlayingTrack?.classList.remove("currentPlaying");
    let hightLight = playListRef.current!.children.item(currentlyActiveTrack.index) as HTMLDivElement;
    hightLight.classList.add("currentPlaying");
    setCurrentPlayingTrack(hightLight);
  }, [updateUI]);

  useEffect(() => {
    let timerUpdate: number = 0;
    let timeStripUpdate: number = 0;
    if (currentlyActiveTrack.howl.playing()) {
      timerUpdate = window.setInterval(() => {
        currentlyActiveTrack.howl.playing() && (trackDurationRef.current!.innerText = formatTime(currentlyActiveTrack.howl.seek()));
      }, 100);
      timeStripUpdate = window.setInterval(() => {
        currentlyActiveTrack.howl.playing() && (trackDurationStrip.current!.style.width = `${(currentlyActiveTrack.howl.seek() / currentlyActiveTrack.howl.duration()) * 100}%`);
      }, 16);
    }
    console.log(currentlyActiveTrack.howl.playing());
    return () => {
      clearInterval(timerUpdate);
      clearInterval(timeStripUpdate);
    };
  }, [updateDuration]);

  // Settup for Music Player
  useEffect(() => {
    playRef.current!.addEventListener("click", playBtnHandler);
    pauseRef.current!.addEventListener("click", pauseBtnHandler);
    prevTrackRef.current!.addEventListener("click", prevTrackBtnHandler);
    nextTrackRef.current!.addEventListener("click", nextTrackBtnHandler);
    trackDurationWrapper.current!.addEventListener("click", setTime);
    volumeBtnRef.current!.addEventListener("click", muteHowl);
    volumeStripRef.current!.addEventListener("click", setVolume);

    setCurrentPlayingTrack(playListRef.current!.children.item(0) as HTMLDivElement);
    let hightLightIt = playListRef.current!.children.item(0) as HTMLDivElement;
    hightLightIt.classList.add("currentPlaying");
    howler.forEach((obj) => {
      obj.howl.on("end", () => {
        if (currentlyActiveTrack.index === howler.length - 1) {
          playRef.current!.style.display = "block";
          pauseRef.current!.style.display = "none";
          return;
        } else if (currentlyActiveTrack.index !== howler.length - 2) {
          currentlyActiveTrack.howl.stop();
          currentlyActiveTrack = howler[currentlyActiveTrack.index + 1];
          currentlyActiveTrack.howl.play();
          checkMuted();
          currentlyActiveTrack.howl.volume(volume);
        }
        setUpdateUI((prev) => !prev);
      });
      obj.howl.on("play", () => {
        playRef.current!.style.display = "none";
        pauseRef.current!.style.display = "block";

        setUpdateUI((prev) => !prev);
        setUpdateDuration((prev) => !prev);
        checkMuted();
        currentlyActiveTrack.howl.volume(volume);
      });
      obj.howl.on("pause", () => {
        playRef.current!.style.display = "block";
        pauseRef.current!.style.display = "none";
      });
    });
  }, []);

  return (
    <div className="MusicPlayer" ref={selfRef}>
      <div className="top">
        <div id="album-cover" ref={albumCoverRef}></div>
        <div className="controlls-wrapper">
          <div className="track-origin" ref={albumTitleRef}>
            {currentlyActiveTrack.info.album}
          </div>
          <div className="track-name" ref={trackTitleRef}>
            {currentlyActiveTrack.info.title}
          </div>
          <div className="controlls">
            <div id="prevTrack" ref={prevTrackRef}></div>
            <div id="playBtn" ref={playRef}></div>
            <div id="pauseBtn" ref={pauseRef}></div>
            <div id="nextTrack" ref={nextTrackRef}></div>
            <p className="track-timing" ref={trackDurationRef}>
              {formatTime(currentlyActiveTrack.howl.seek())}
            </p>
            <div id="volume">
              <div id="volume-icon" ref={volumeBtnRef}>
                {mute ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="20px" height="20px">
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="20px" height="20px">
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <p id="volume-strip" ref={volumeStripRef}>
                <div id="real-volume" ref={realStripRef}></div>
              </p>
            </div>
          </div>
          <div id="duration-strip" ref={trackDurationWrapper}>
            <div id="real-strip" ref={trackDurationStrip}></div>
          </div>
        </div>
      </div>
      <div id="tracks" ref={playListRef}>
        {howler.map((track, index) => {
          return (
            <div key={index} className={`track-${track.index + 1}`} onClick={playNewTrack} data-index={track.index}>
              <span className="track-number">{track.index + 1}</span> {track.info.title} <span className="track-duration">{formatTime(track.howl.duration())}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MusicPlayer;
