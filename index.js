const note = document.createElement("p");
note.innerHTML = "bO";
note.style.zIndex = 2;
note.style.position = "fixed";
note.style.left = "30%";
note.style.top = "38px";
document.body.appendChild(note);

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIFailure() {
  console.log("Could not access your MIDI devices.");
}

function onMIDISuccess(midiAccess) {
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

let input = [];
const notes = [
  { note: 60, css: "bla" },
  { note: 61, css: "bla" },
  { note: 62, css: "bla" },
  { note: 64, css: "bla" },
  //   { note: 65, css: "bla" },
  //   { note: 66, css: "bla" },
  //   { note: 67, css: "bla" },
  //   { note: 68, css: "bla" },
  //   { note: 69, css: "bla" },
  //   { note: 70, css: "bla" },
];

function getNotes(notes) {
  const randomValue = Math.floor(Math.random() * 2) + 1;
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

let currentNotes = [];
function getMIDIMessage(midiMessage) {
  if (midiMessage.data[2] > 1) {
    input.push(midiMessage.data[1]);
  }

  if (currentNotes.length === 0) {
    currentNotes = getNotes(notes);
  }

  if (checkNotes(currentNotes, input) === true) {
    currentNotes = [];
    console.log("new notes");
  }
  console.log("input", input);
}
