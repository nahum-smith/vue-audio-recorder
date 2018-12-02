# vue-audio-recorder

> Audio recorder for Vue.js. It allows to create, play, download and store records on a server.

#### [Live demo](https://jsfiddle.net/grishkovelli/rb1anxyj/)

![](https://raw.githubusercontent.com/grishkovelli/vue-audio-recorder/master/screenshot.png)

### Features

- Beautiful clean UI
- Download/upload/play record
- Time limit
- Records limit
- A lot of callbacks
- Individual an audio player

### Tested in (desktop)

- Chrome
- Firefox
- Safari

## Installation

```
npm i vue-audio-recorder --save
```

## AudioRecorder props

| Prop                  | Type     | Description                                                     |
| --------------------- | -------- | --------------------------------------------------------------- |
| attempts              | Number   | Number of recording attempts                                    |
| compact               | Boolean  | Hide the download and upload buttons                            |
| zip                   | Boolean  | To zip a record                                                 |
| headers               | Object   | HTTP headers                                                    |
| time                  | Number   | Time limit for the record (minutes)                             |
| filename              | String   | Download/Upload filename                                        |
| upload-url            | String   | URL for uploading                                               |
| attempts-limit        | Function | Fires after exceeding the attempts                              |
| blobHandler           | Function | Do something with a record                                      |
| failed-upload         | Function | Fires after a failure uploading                                 |
| mic-failed            | Function | Fires if your microphone doesn't work                           |
| start-record          | Function | Fires after click the record button                             |
| start-upload          | Function | Fires after start uploading                                     |
| stop-record           | Function | Fires after click the stop button or exceeding the time limit   |
| successful-upload     | Function | Fires after a successful uploading                              |
| successful-upload-msg | String   | Displays the message after a successful uploading               |
| failed-upload-msg     | String   | Displays the message after a failure uploading                  |

## AudioPlayer props
| Prop                  | Type     | Description                                                     |
| --------------------- | -------- | --------------------------------------------------------------- |
| src                   | String   | Specifies the URL of the audio file                             |

## Usage

```js
    import AudioRecorder from 'vue-audio-recorder'

    Vue.use(AudioRecorder)
```

```html
  <audio-recorder
    upload-url="YOUR_API_URL"
    :attempts="3"
    :headers="headers"
    :time="2"
    :start-record="callback"
    :stop-record="callback"
    :start-upload="callback"
    :successful-upload="callback"
    :failed-upload="callback"/>
```

```html
  <audio-player src="/demo/example.mp3"/>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Authors

[Gennady Grishkovtsov](https://www.linkedin.com/in/grishkovtsov/) - Developer

[Olga Zimina](https://www.behance.net/zimin4ik) - UIX Designer
