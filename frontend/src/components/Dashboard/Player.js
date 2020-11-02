import React, { Component } from "react";
import { Container, Image, Progress, Column, Columns } from "bloomer";
import album from "../../icons/album.jpg";
import play from "../../icons/play.svg";
import pause from "../../icons/pause.svg";
import next from "../../icons/next.svg";
import prev from "../../icons/prev.svg";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Player extends Component {
  static propTypes = {
    songs: PropTypes.array.isRequired,
    autoplay: PropTypes.bool,
    onTimeUpdate: PropTypes.func,
    onEnded: PropTypes.func,
    onError: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func
  };

  static defaultProps = {
    onTimeUpdate: () => {},
    onEnded: () => {},
    onError: () => {},
    onPlay: () => {},
    onPause: () => {},
    onPrevious: () => {},
    onNext: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      active: props.songs[0],
      songs: props.songs,
      current: 0,
      progress: 0,
      random: false,
      playing: !!props.autoplay,
      repeat: false,
      mute: false
    };

    this.audio = document.createElement("audio");
    this.audio.src = this.state.active.url;
    this.audio.autoplay = !!this.state.autoplay;

    this.audio.addEventListener("timeupdate", e => {
      this.updateProgress();
      props.onTimeUpdate(e);
    });
    this.audio.addEventListener("ended", e => {
      this.next();
      props.onEnded(e);
    });
    this.audio.addEventListener("error", e => {
      this.next();
      props.onError(e);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.songs[0],
      songs: nextProps.songs,
      current: 0,
      progress: 0,
      random: false,
      playing: !!nextProps.autoplay,
      repeat: false,
      mute: false
    });
  }

  shuffle = arr => arr.sort(() => Math.random() - 0.5);

  updateProgress = () => {
    const { duration, currentTime } = this.audio;
    const progress = (currentTime * 100) / duration;

    this.setState({
      progress: progress
    });
  };

  setProgress = e => {
    const target =
      e.target.nodeName === "SPAN" ? e.target.parentNode : e.target;
    const width = target.clientWidth;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const duration = this.audio.duration;
    const currentTime = (duration * offsetX) / width;
    const progress = (currentTime * 100) / duration;

    this.audio.currentTime = currentTime;
    this.setState({
      progress: progress
    });
    this.play();
  };

  play = () => {
    this.setState({
      playing: true
    });
    this.audio.play();
    this.props.onPlay();
  };

  pause = () => {
    this.setState({
      playing: false
    });
    this.audio.pause();
    this.props.onPause();
  };

  toggle = () => (this.state.playing ? this.pause() : this.play());

  next = () => {
    const { repeat, current, songs } = this.state;
    const total = songs.length;
    const newSongToPlay = repeat
      ? current
      : current < total - 1
      ? current + 1
      : 0;
    const active = songs[newSongToPlay];

    this.setState({
      current: newSongToPlay,
      active: active,
      progress: 0,
      repeat: false
    });

    this.audio.src = active.url;
    this.play();
    this.props.onNext();
  };

  previous = () => {
    const { current, songs } = this.state;
    const total = songs.length;
    const newSongToPlay = current > 0 ? current - 1 : total - 1;
    const active = songs[newSongToPlay];

    this.setState({
      current: newSongToPlay,
      active: active,
      progress: 0
    });

    this.audio.src = active.url;
    this.play();
    this.props.onPrevious();
  };

  randomize = () => {
    const { random, songs } = this.state;
    const shuffled = this.shuffle(songs.slice());

    this.setState({
      songs: !random ? shuffled : songs,
      random: !random
    });
  };

  repeat = () =>
    this.setState({
      repeat: !this.state.repeat
    });

  toggleMute = () => {
    const { mute } = this.state;

    this.setState({
      mute: !mute
    });

    this.audio.volume = !!mute;
  };

  render() {
    const {
      active: currentSong,
      progress,
      active,
      playing,
      mute,
      random,
      repeat
    } = this.state;

    const coverClass = classnames({
      "player-cover": true,
      "no-height": !!active.cover === false
    });

    const playPauseClass = classnames({
      fa: true,
      "fa-play": !playing,
      "fa-pause": playing
    });

    const volumeClass = classnames({
      fa: true,
      "fa-volume-up": !mute,
      "fa-volume-off": mute
    });

    const randomClass = classnames({
      "player-btn small random": true,
      active: random
    });

    const repeatClass = classnames({
      "player-btn small repeat": true,
      active: repeat
    });

    return (
      <Container className="notification has-background-dark ">
        <Columns>
          <Column>
            {/* Album art */}
            <Columns>
              <Column isSize="2/4">
                <img
                  className="is-rounded"
                  src={`${currentSong.cover}`}
                  alt="profile"
                  width="200"
                  height="200"
                />
                {/* <Image isSize="64x64" isRatio="4:3" src={album} /> */}
              </Column>
              <Column isSize="2/3">
                <h2 className=" has-text-weight-bold has-text-light">
                  {currentSong.artist.name}
                </h2>
                <h3 className=" has-text-light">{currentSong.artist.song}</h3>
                {/* <p className="has-text-weight-bold">{this.state.currentSong}</p>
                <p className="has-text-weight-light">Becky G</p> */}
              </Column>
            </Columns>
            {/* Album art end */}
          </Column>
          <Column
            isSize="2/4"
            className="is-flex"
            style={{
              alignItems: "center"
            }}
          >
            <Progress isColor="primary" value={this.state.progress} max={100} />
          </Column>
          <Column
            isSize="narrow"
            className="is-flex"
            style={{
              alignItems: "center"
            }}
          >
            <div className="player-buttons">
              <button>
                <i
                  className={volumeClass}
                  onClick={this.toggleMute}
                  title="Mute/Unmute"
                ></i>
              </button>
              <button
                className={repeatClass}
                onClick={this.repeat}
                title="Repeat"
              >
                <i className="fa fa-redo-alt"></i>
              </button>
              {/* <button
                className={favourite}
                title="favourite"
                onClick={this.favourite}
              > */}
              {/* <i class="far fa-heart"></i>
              </button> */}
              <button
                className={randomClass}
                onClick={this.randomize}
                title="Shuffle"
              >
                <i className="fa fa-random"></i>
              </button>
            </div>
          </Column>
          <Column
            isSize="1/4"
            className="is-flex"
            style={{
              alignItems: "center"
            }}
          >
            <Image
              isSize="32x32"
              alt="prev"
              onClick={this.previous}
              src={prev}
              title="Previous"
            />
            {/* Play or pause button */}
            {this.state.playing === true ? (
              <Image
                className="m-r-m m-l-m"
                isSize="64x64"
                title="pause"
                alt="pause"
                onClick={this.pause}
                src={pause}
              />
            ) : (
              <Image
                isSize="64x64"
                title="play"
                alt="play"
                className="m-r-m m-l-m"
                onClick={this.play}
                src={play}
              />
            )}
            <Image
              isSize="32x32"
              alt="next"
              onClick={this.next}
              src={next}
              title="Next"
            />
          </Column>
        </Columns>
      </Container>
    );
  }
}
