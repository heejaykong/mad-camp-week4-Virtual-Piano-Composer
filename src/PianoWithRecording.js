import React from "react";
import { Piano } from "react-piano";
import './styles/test.css';

// const DURATION_UNIT = 0.2;
// const DEFAULT_NOTE_DURATION = DURATION_UNIT;

// 위치 조정(em 기준, 0.5가 한음 차이)
let NoteHeight = {};
NoteHeight[48] = 5.1
NoteHeight[49] = 5.1
NoteHeight[50] = 4.6
NoteHeight[51] = 4.6
NoteHeight[52] = 4.1
NoteHeight[53] = 3.6
NoteHeight[54] = 3.6
NoteHeight[55] = 3.1
NoteHeight[56] = 3.1
NoteHeight[57] = 2.6
NoteHeight[58] = 2.6
NoteHeight[59] = 2.1
NoteHeight[60] = 1.6
NoteHeight[61] = 1.6
NoteHeight[62] = 1.1
NoteHeight[63] = 1.1
NoteHeight[64] = 0.6
NoteHeight[65] = 0.1
NoteHeight[66] = 0.1
NoteHeight[67] = -0.45
NoteHeight[68] = -0.45
NoteHeight[69] = -0.95
NoteHeight[70] = -0.95
NoteHeight[71] = -1.55
NoteHeight[72] = -2.1
NoteHeight[73] = -2.1
NoteHeight[74] = -2.53
NoteHeight[75] = -2.53
NoteHeight[76] = -3.1
NoteHeight[77] = -3.6
NoteHeight[78] = -3.6
NoteHeight[79] = -4.1
NoteHeight[80] = -4.1
NoteHeight[81] = -4.6
NoteHeight[82] = -4.6
NoteHeight[83] = -5.1

const BLACK_KEYS_MIDI_NUMBER = [49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82];
const KEYS_THAT_NEEDS_LITTLE_HORIZONTAL_LINE = [50, 51, 53, 54, 57, 58, 60, 61, 81, 82];

class PianoWithRecording extends React.Component {
  static defaultProps = {
    notesRecorded: false,
    BPM: 120
  };

  state = {
    keysDown: {},
    noteDuration: 2,
    notesRecorded: true,
    noteType: ""
  };

  setnoteType = duration => {
    if(duration >= 180/this.props.BPM){
      return "./img/Whole_note"
    }
    if(duration >= 90/this.props.BPM){
      return "./img/Half_note"
    }
    if(duration >= 45/this.props.BPM){
      return "./img/Quarter_note"
    }
    if(duration >= 22.5/this.props.BPM){
      return "./img/Eighth_note"
    }
    return "./img/Sixteenth_note"
  }

  onPlayNoteInput = (midiNumber) => {
    if (this.state.notesRecorded === true){
      console.log(midiNumber);
      console.log(this.props.BPM)
      this.setState({
        notesRecorded: false
      });
      this.props.recording.currentTime = Date.now()
    }
  };

  onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
    if (this.state.notesRecorded === false) {
      
      this.state.noteDuration = (Date.now() - this.props.recording.currentTime)/1000
      this.state.noteType = this.setnoteType(this.state.noteDuration);
      this.recordNotes(prevActiveNotes, this.state.noteDuration, this.state.noteType);
      this.setState({
        notesRecorded: true,
        //noteDuration: this.state.noteDuration
      });
    }
  };

  recordNotes = (midiNumbers, duration, noteType) => {
    let isBlackKey;
    let isLineNeeded;
    if (this.props.recording.mode !== "RECORDING") {
      return;
    }
    const newEvents = midiNumbers.map((midiNumber) => {
      // img 태그로 일일이 음표 찍어주기
      const musicNotePrintSpan = document.querySelector(".musicNotePrint");
      const span = document.createElement("span");
      const img = new Image();
      img.style.top = `${NoteHeight[midiNumber]}em`;
      if(81 <= midiNumber){
        const line = document.createElement("span");
        line.style.position = "absolute"
        line.style.backgroundColor = "rgb(59, 59, 59)"
        line.style.borderRadius = "1px"
        line.style.height = "2px"
        line.style.width = "2em"
        line.style.left = "2.6em"
        line.style.top = "-7.2em"
        span.appendChild(line)
      }
      if(midiNumber <= 60){
        const line = document.createElement("span");
        line.style.position = "absolute"
        line.style.backgroundColor = "rgb(59, 59, 59)"
        line.style.borderRadius = "1px"
        line.style.height = "2px"
        line.style.width = "2em"
        line.style.left = "2.6em"
        line.style.top = "-1.2em"
        span.appendChild(line)
      }
      if(midiNumber <= 57){
        const line = document.createElement("span");
        line.style.position = "absolute"
        line.style.backgroundColor = "rgb(59, 59, 59)"
        line.style.borderRadius = "1px"
        line.style.height = "2px"
        line.style.width = "2em"
        line.style.left = "2.6em"
        line.style.top = "-0.2em"
        span.appendChild(line)
      }
      if(midiNumber <= 53){
        const line = document.createElement("span");
        line.style.position = "absolute"
        line.style.backgroundColor = "rgb(59, 59, 59)"
        line.style.borderRadius = "1px"
        line.style.height = "2px"
        line.style.width = "2em"
        line.style.left = "2.6em"
        line.style.top = "0.8em"
        span.appendChild(line)
      }
      if(midiNumber <= 50){
        const line = document.createElement("span");
        line.style.position = "absolute"
        line.style.backgroundColor = "rgb(59, 59, 59)"
        line.style.borderRadius = "1px"
        line.style.height = "2px"
        line.style.width = "2em"
        line.style.left = "2.6em"
        line.style.top = "1.8em"
        span.appendChild(line)
      }
      isBlackKey = BLACK_KEYS_MIDI_NUMBER.includes(midiNumber);
      if (isBlackKey) {
        img.src = require(`${noteType}_w_sharp.png`);
        img.alt = `musical note with sharp(${noteType})`;
      } else {
        img.src = require(`${noteType}.png`);
        img.alt = `musical note(${noteType})`;
      }

      switch (noteType) {
        case "./img/Whole_note" :
        case "./img/Whole_note_w_sharp" :
          img.style.marginRight = "8em";
          break;
        case "./img/Half_note" :
        case "./img/Half_note_w_sharp" :
          img.style.marginRight = "4em";
          break;
        case "./img/Quarter_note" :
        case "./img/Quarter_note_w_sharp" :
          img.style.marginRight = "2em";
          break;
        case "./img/Eighth_note" :
        case "./img/Eighth_note_w_sharp" :
          img.style.marginRight = "1em";
          break;
        default: // "./img/Sixteenth_note" :
        // "./img/Sixteenth_note_w_sharp" :
          img.style.marginRight = "0em";
      }
      span.appendChild(img);
      musicNotePrintSpan.appendChild(span);

      return {
        midiNumber,
        time: (this.props.recording.currentTime - this.props.recording.startTime)/1000,
        duration,
        noteType: noteType.slice(6)
      };
    });
    this.props.setRecording({
      events: this.props.recording.events.concat(newEvents),
      currentTime: this.props.recording.currentTime + duration
    });
  };

  render() {
    const {
      playNote,
      stopNote,
      recording,
      setRecording,
      ...pianoProps
    } = this.props;

    const { mode, currentEvents } = this.props.recording;
    const activeNotes =
      mode === "PLAYING"
        ? currentEvents.map((event) => event.midiNumber)
        : null;
    return (
      <div>
        <Piano
          playNote={this.props.playNote}
          stopNote={this.props.stopNote}
          onPlayNoteInput={this.onPlayNoteInput}
          onStopNoteInput={this.onStopNoteInput}
          activeNotes={activeNotes}
          {...pianoProps}
        />
      </div>
    );
  }
}

export default PianoWithRecording;
