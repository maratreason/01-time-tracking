import { v4 as uuid } from "uuid"

export const newTimer = (attrs = {}) => {
  return {
    title: attrs.title || 'Timer',
    project: attrs.project || 'Project',
    id: uuid(),
    elapsed: 0,
  };
}

export const findById = (array, id, cb) => {
  array.forEach((el) => {
    if (el.id === id) {
      cb(el);
      return;
    }
  });
}

export const renderElapsedString = (elapsed, runningSince) => {
  let totalElapsed = elapsed;
  if (runningSince) {
    totalElapsed += Date.now() - runningSince;
  }
  return millisecondsToHuman(totalElapsed);
}

const millisecondsToHuman = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  return [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');
}

const pad = (numberString, size) => {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}
