import lamejs from 'lamejs'

export function calculateLineHeadPosition (ev, element) {
  let progressWidth = element.getBoundingClientRect().width
  let leftPosition = ev.target.getBoundingClientRect().left
  let pos = (ev.clientX - leftPosition) / progressWidth

  try {
    if (!ev.target.className.match(/^ar\-line\-control/)) {
      return
    }
  } catch (err) {
    return
  }

  pos = pos < 0 ? 0 : pos
  pos = pos > 1 ? 1 : pos

  return pos
}

export function convertTimeMMSS (seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5)
}

export function wav2mp3(buffer) {
  let wav = lamejs.WavHeader.readHeader(new DataView(buffer))
  let samples = new Int16Array(buffer, wav.dataOffset, wav.dataLen / 2)
  let bitRate = 128

  let mp3Data = []
  let mp3enc = new lamejs.Mp3Encoder(wav.channels, wav.sampleRate, bitRate)
  let remaining = samples.length
  let maxSamples = 1152

  for (let i = 0; maxSamples <= remaining; i += maxSamples) {

    console.debug(maxSamples, remaining)

    let mono = samples.subarray(i, i + maxSamples)
    let buf = mp3enc.encodeBuffer(mono)

    remaining -= maxSamples

    if (buf.length > 0) {
      mp3Data.push(new Int8Array(buf))
    }
  }

  let buf = mp3enc.flush()

  if (buf.length > 0) {
    mp3Data.push(new Int8Array(buf))
  }

  return new Blob(mp3Data, {type: 'audio/mp3'})
}
