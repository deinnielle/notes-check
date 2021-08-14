navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}

function onMIDISuccess(midiAccess) {
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

function checkIfBlackKey(note) {
  const blackKeys = [
    37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80,
    82,
  ];
  if (blackKeys.includes(note)) {
    return true;
  } else {
    return false;
  }
}

let input = [];
const accidentals = ["bO", "#O"];
// const notes = [
//   { note: 36, position: 327, letter: "C" },
//   { note: 37, position: 327, letter: "C#, Db" },
//   { note: 38, position: 315, letter: "D" },
//   { note: 39, position: 315, letter: "D#, Eb" },
//   { note: 40, position: 303, letter: "E" },
//   { note: 41, position: 291, letter: "F" },
//   { note: 42, position: 291, letter: "F#, Gb" },
//   { note: 43, position: 279, letter: "G" },
//   { note: 44, position: 279, letter: "G#, Ab" },
//   { note: 45, position: 267, letter: "A" },
//   { note: 46, position: 267, letter: "A#, Bb" },
//   { note: 47, position: 255, letter: "B" },
//   { note: 48, position: 243, letter: "C" },
//   { note: 49, position: 243, letter: "C#, Db" },
//   { note: 50, position: 231, letter: "D" },
//   { note: 51, position: 231, letter: "D#, Eb" },
//   { note: 52, position: 219, letter: "E" },
//   { note: 53, position: 207, letter: "F" },
//   { note: 54, position: 207, letter: "F#, Gb" },
//   { note: 55, position: 195, letter: "G" },
//   { note: 56, position: 195, letter: "G#, Ab" },
//   { note: 57, position: 183, letter: "A" },
//   { note: 58, position: 183, letter: "A#, Bb" },
//   { note: 59, position: 171, letter: "B" },
//   { note: 60, position: 159, letter: "C" },
//   { note: 61, position: 159, letter: "C#, Db" },
//   { note: 62, position: 147, letter: "D" },
//   { note: 63, position: 147, letter: "D#, Eb" },
//   { note: 64, position: 135, letter: "E" },
//   { note: 65, position: 123, letter: "F" },
//   { note: 66, position: 123, letter: "F#, Gb" },
//   { note: 67, position: 111, letter: "G" },
//   { note: 68, position: 111, letter: "G#, Ab" },
//   { note: 69, position: 99, letter: "A" },
//   { note: 70, position: 99, letter: "A#, Bb" },
//   { note: 71, position: 87, letter: "B" },
//   { note: 72, position: 75, letter: "C" },
//   { note: 73, position: 75, letter: "C#, Db" },
//   { note: 74, position: 63, letter: "D" },
//   { note: 75, position: 63, letter: "D#, Eb" },
//   { note: 76, position: 51, letter: "E" },
//   { note: 77, position: 39, letter: "F" },
//   { note: 78, position: 39, letter: "F#, Gb" },
//   { note: 79, position: 27, letter: "G" },
//   { note: 80, position: 27, letter: "G#, Ab" },
//   { note: 81, position: 15, letter: "A" },
//   { note: 82, position: 15, letter: "A#, Bb" },
//   { note: 83, position: 3, letter: "B" },
//   { note: 84, position: -9, letter: "C" },
// ];

function getNotes(notes) {
  const randomValue = Math.floor(Math.random() * 2) + 2;
  return [...shuffle(notes)].splice(0, randomValue);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function checkNotes(notes, input) {
  for (const note of notes) {
    if (input.find((i) => i === note.note) === undefined) {
      return false;
    }
  }
  return true;
}

function paintNote(note) {
  if (checkIfBlackKey(note.note)) {
    let position = note.position;
    let randomValue = Math.random();
    if (randomValue >= 0.5) {
      randomValue = 1;
    } else {
      randomValue = 0;
    }
    if (randomValue === 0) {
      position -= 12;
    }
    const p = document.createElement("p");
    p.innerHTML = accidentals[randomValue];
    p.style.zIndex = 2;
    p.style.position = "fixed";
    p.style.left = "50px";
    p.style.top = `${position}px`;
    document.body.appendChild(p);
  } else {
    const p = document.createElement("p");
    p.innerHTML = "O";
    p.style.zIndex = 2;
    p.style.position = "fixed";
    p.style.left = "30px";
    p.style.top = `${note.position}px`;
    document.body.appendChild(p);
  }
}

let currentNotes = [];
function getMIDIMessage(midiMessage) {
  if (midiMessage.data[2] > 1) {
    input.push(midiMessage.data[1]);
  }
  console.log("currentNotes", currentNotes);
  console.log("midi", midiMessage.data[1]);

  if (checkNotes(currentNotes, input)) {
    input = [];
    currentNotes = [];
    document.querySelectorAll("p").forEach((e) => e.parentNode.removeChild(e));
    console.log("new");
    start();
  }
}

function start() {
  currentNotes = getNotes(notes);
  for (const note of currentNotes) {
    paintNote(note);
  }
}

start();
