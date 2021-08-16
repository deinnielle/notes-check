const treble = document.querySelector("#treble");
const trebleAccidentals = document.querySelector("#treble-accidentals");
const bass = document.querySelector("#bass");
const bassAccidentals = document.querySelector("#bass-accidentals");
const easyNotes = document.querySelector("#easy-notes");
const noteLetters = document.querySelector("#note-letters");
const number = document.querySelector("#number");

const notes = [
  { note: 36, position: 327, letter: "C" },
  { note: 37, position: 327, letter: "C#, Db" },
  { note: 38, position: 315, letter: "D" },
  { note: 39, position: 315, letter: "D#, Eb" },
  { note: 40, position: 303, letter: "E" },
  { note: 41, position: 291, letter: "F" },
  { note: 42, position: 291, letter: "F#, Gb" },
  { note: 43, position: 279, letter: "G" },
  { note: 44, position: 279, letter: "G#, Ab" },
  { note: 45, position: 267, letter: "A" },
  { note: 46, position: 267, letter: "A#, Bb" },
  { note: 47, position: 255, letter: "B" },
  { note: 48, position: 243, letter: "C" },
  { note: 49, position: 243, letter: "C#, Db" },
  { note: 50, position: 231, letter: "D" },
  { note: 51, position: 231, letter: "D#, Eb" },
  { note: 52, position: 219, letter: "E" },
  { note: 53, position: 207, letter: "F" },
  { note: 54, position: 207, letter: "F#, Gb" },
  { note: 55, position: 195, letter: "G" },
  { note: 56, position: 195, letter: "G#, Ab" },
  { note: 57, position: 183, letter: "A" },
  { note: 58, position: 183, letter: "A#, Bb" },
  { note: 59, position: 171, letter: "B" },
  { note: 60, position: 159, letter: "C" },
  { note: 61, position: 159, letter: "C#, Db" },
  { note: 62, position: 147, letter: "D" },
  { note: 63, position: 147, letter: "D#, Eb" },
  { note: 64, position: 135, letter: "E" },
  { note: 65, position: 123, letter: "F" },
  { note: 66, position: 123, letter: "F#, Gb" },
  { note: 67, position: 111, letter: "G" },
  { note: 68, position: 111, letter: "G#, Ab" },
  { note: 69, position: 99, letter: "A" },
  { note: 70, position: 99, letter: "A#, Bb" },
  { note: 71, position: 87, letter: "B" },
  { note: 72, position: 75, letter: "C" },
  { note: 73, position: 75, letter: "C#, Db" },
  { note: 74, position: 63, letter: "D" },
  { note: 75, position: 63, letter: "D#, Eb" },
  { note: 76, position: 51, letter: "E" },
  { note: 77, position: 39, letter: "F" },
  { note: 78, position: 39, letter: "F#, Gb" },
  { note: 79, position: 27, letter: "G" },
  { note: 80, position: 27, letter: "G#, Ab" },
  { note: 81, position: 15, letter: "A" },
  { note: 82, position: 15, letter: "A#, Bb" },
  { note: 83, position: 3, letter: "B" },
  { note: 84, position: -9, letter: "C" },
];
let inputs = [];
let currentNotes = [];

function blackKey(note) {
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

function getNotes(notes, number) {
  return [...shuffle(notes)].splice(0, number);
}

function filterNotes() {
  const filteredNotes = [];
  const excludeNotes = [36, 38, 45, 50, 55, 60, 65, 71, 76, 83, 84];
  const trebleNotes = [
    60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84,
  ];
  const accidentalTrebleNotes = [61, 63, 66, 68, 70, 73, 75, 78, 80, 82];
  const bassNotes = [36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59];
  const accidentalBassNotes = [37, 39, 42, 44, 46, 49, 51, 54, 56, 58];

  if (treble.checked) {
    for (const trebleNote of trebleNotes) {
      const result = notes.find((o) => o.note === trebleNote);
      filteredNotes.push(result);
    }
  }

  if (trebleAccidentals.checked) {
    for (const accidentalTrebleNote of accidentalTrebleNotes) {
      const result = notes.find((o) => o.note === accidentalTrebleNote);
      filteredNotes.push(result);
    }
  }

  if (bass.checked) {
    for (const bassNote of bassNotes) {
      const result = notes.find((o) => o.note === bassNote);
      filteredNotes.push(result);
    }
  }

  if (bassAccidentals.checked) {
    for (const accidentalBassNote of accidentalBassNotes) {
      const result = notes.find((o) => o.note === accidentalBassNote);
      filteredNotes.push(result);
    }
  }

  if (!easyNotes.checked) {
    for (const excludeNote of excludeNotes) {
      const result = filteredNotes.findIndex((o) => o.note === excludeNote);
      if (result != -1) {
        filteredNotes.splice(result, 1);
      }
    }
  }

  return filteredNotes;
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
  if (blackKey(note.note)) {
    const p = document.createElement("p");
    let position = note.position;
    if (Math.random() >= 0.5) {
      p.innerHTML = "#O";
      p.style.left = "60px";
    } else {
      p.innerHTML = "bO";
      p.style.left = "100px";
      position -= 12;
    }
    p.style.zIndex = 2;
    p.style.position = "fixed";
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

function checkLetters() {
  const e = document.querySelector(".note-letters");
  if (noteLetters.checked) {
    e.style.visibility = "visible";
  } else {
    e.style.visibility = "hidden";
  }
}

navigator.requestMIDIAccess().then(midiSuccess, midiFail);

function midiFail() {
  console.log("Could not access your MIDI device");
}

function midiSuccess(midi) {
  for (const input of midi.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

function getMIDIMessage(input) {
  if (input.data[2] > 1) {
    inputs.push(input.data[1]);
  }

  if (checkNotes(currentNotes, inputs)) {
    start();
  }
}

function start() {
  inputs = [];
  currentNotes = [];
  document.querySelectorAll("p").forEach((e) => e.parentNode.removeChild(e));
  currentNotes = getNotes(filterNotes(), number.value);
  for (const note of currentNotes) {
    paintNote(note);
  }
}

start();

treble.addEventListener("change", start);
trebleAccidentals.addEventListener("change", start);
bass.addEventListener("change", start);
bassAccidentals.addEventListener("change", start);
number.addEventListener("change", start);
easyNotes.addEventListener("change", start);
noteLetters.addEventListener("change", checkLetters);
