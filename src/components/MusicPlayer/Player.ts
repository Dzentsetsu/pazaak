// import { Howl } from "howler";
// import ktc from "../../assets/audio/kotor/Kotor-Upper-City-Cantina.mp3";
// import kmac from "../../assets/audio/kotor/Kotor-Mannan-Ahto-City.mp3";
// import JavyarsCantina from "../../assets/audio/kotor/Kotor-Javyar's-Cantina.mp3";
// import Dantooine from "../../assets/audio/kotor/Kotor-Dantooine.mp3";
// import IzizCantina from "../../assets/audio/kotor2/Kotor2-Iziz-Cantina.mp3";

// import { MusicPlayerControlls } from "./MusicPlayer";
// import { textChangeRangeIsUnchanged } from "typescript";
// import kotorCover from "../../assets/img/kotor-cover.jpg";
// import kotor2Cover from "../../assets/img/kotor2-cover.jpg";

// interface Track {
//   index: number;
//   track: Howl;
//   info: {
//     album: string;
//     title: string;
//     cover: string;
//   };
// }

// export default class Player {
//   public tracks: Array<Track> = [
//     {
//       index: 0,
//       track: new Howl({ src: `${ktc}`, html5: true, onplay: () => console.log("Playing") }),
//       info: {
//         album: "Star Wars: Knights of the Old Republic",
//         title: "Upper City Taris Cantina",
//         cover: kotorCover,
//       },
//     },
//     {
//       index: 1,
//       track: new Howl({ src: `${kmac}`, html5: true }),
//       info: {
//         album: "Star Wars: Knights of the Old Republic",
//         title: "Mannan Ahto City",
//         cover: kotorCover,
//       },
//     },

//     {
//       index: 2,
//       track: new Howl({ src: `${JavyarsCantina}`, html5: true }),
//       info: {
//         album: "Star Wars: Knights of the Old Republic",
//         title: "Javyar's Cantina",
//         cover: kotorCover,
//       },
//     },
//     {
//       index: 3,
//       track: new Howl({ src: `${Dantooine}`, html5: true }),
//       info: {
//         album: "Star Wars: Knights of the Old Republic",
//         title: "Dantooine",
//         cover: kotorCover,
//       },
//     },
//     {
//       index: 4,
//       track: new Howl({ src: `${IzizCantina}`, html5: true }),
//       info: {
//         album: "Star Wars Knights of the Old Republic II: The Sith Lords",
//         title: "Iziz Cantina",
//         cover: kotor2Cover,
//       },
//     },
//   ];

//   public currentTrack: Track;
//   private static muted: boolean = false;
//   private controlls: MusicPlayerControlls<React.RefObject<HTMLElement>>;

//   constructor(controlls: MusicPlayerControlls<React.RefObject<HTMLElement>>) {
//     this.controlls = controlls;
//     this.currentTrack = this.tracks[0];

//     this.tracks.forEach((track) => {
//       track.track.on("end", () => {
//         if (this.currentTrack.index === this.tracks.length - 1) {
//           this.currentTrack.track.stop();
//           this.currentTrack = this.tracks[0];
//           this.controlls.playBtn.current!.style.display = "block";
//           this.controlls.pauseBtn.current!.style.display = "none";
//         }

//         if (this.currentTrack.index !== this.tracks.length - 2) {
//           this.currentTrack.track.stop();
//           this.currentTrack = this.tracks[this.currentTrack.index + 1];
//           this.currentTrack.track.play();
//         }
//       });
//       track.track.on("play", () => this.updateCover(controlls));
//     });
//     controlls.albumCoverRef.current!.style.backgroundImage = `url(${this.currentTrack.info.cover})`;
//   }
//   private updateCover(controlls: MusicPlayerControlls<React.RefObject<HTMLElement>>) {
//     controlls.albumCoverRef.current!.style.backgroundImage = `url(${this.currentTrack.info.cover})`;
//     //this.controlls.albumCoverRef.current?.style.backgroundImage = `url(${this.currentTrack.info.cover})`;
//   }

//   private getNextIndex(): number {
//     if (this.currentTrack.index === 0) {
//       return 1;
//     } else if (this.currentTrack.index === this.tracks.length - 1) {
//       return 0;
//     }
//     return this.currentTrack.index + 1;
//   }
//   private getPrevIndex(): number {
//     if (this.currentTrack.index === 0) {
//       return this.tracks.length - 1;
//     }
//     return this.currentTrack.index - 1;
//   }

//   play(): void {
//     if (!this.currentTrack.track.playing()) {
//       this.controlls.playBtn.current!.style.display = "none";
//       this.controlls.pauseBtn.current!.style.display = "block";
//       this.currentTrack.track.play();
//     }
//   }

//   playNewTrack(index: number = 0) {
//     if (this.currentTrack.track.playing()) {
//       this.currentTrack.track.stop();
//       this.currentTrack = this.tracks[index];
//       this.currentTrack.track.play();
//     }
//   }
//   pause(): void {
//     if (this.currentTrack.track.playing()) {
//       this.controlls.playBtn.current!.style.display = "block";
//       this.controlls.pauseBtn.current!.style.display = "none";
//       this.currentTrack.track.pause();
//     }
//   }

//   nextTrack(): void {
//     if (!this.currentTrack.track.playing()) {
//       this.controlls.playBtn.current!.style.display = "none";
//       this.controlls.pauseBtn.current!.style.display = "block";
//     }
//     this.currentTrack.track.stop();
//     this.currentTrack = this.tracks[this.getNextIndex()];
//     this.currentTrack.track.play();
//   }
//   prevTrack(): void {
//     if (!this.currentTrack.track.playing()) {
//       this.controlls.playBtn.current!.style.display = "none";
//       this.controlls.pauseBtn.current!.style.display = "block";
//     }
//     this.currentTrack.track.stop();
//     this.currentTrack = this.tracks[this.getPrevIndex()];
//     this.currentTrack.track.play();
//   }


// }
export {}