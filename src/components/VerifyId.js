import React from 'react'
import {
  nets,
  draw,
  resizeResults,
  detectAllFaces,
  matchDimensions,
  createCanvasFromMedia,
  TinyFaceDetectorOptions
} from 'face-api.js/dist/face-api'

let interval

export default function VerifyId() {
  const videoEl = React.useRef()
  const [snapshot, setSnapshot] = React.useState(false)
  React.useEffect(() => {
    Promise.all([
      nets.tinyFaceDetector.loadFromUri('/models'),
      nets.faceLandmark68Net.loadFromUri('/models'),
      nets.faceRecognitionNet.loadFromUri('/models'),
      nets.faceExpressionNet.loadFromUri('/models')
    ])
      .then(startVideo)
      .catch(err => console.log(err))
  })

  function startVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then(handleSuccess)
      .catch(err => console.log(err))
  }

  function handleSuccess(stream) {
    videoEl.current.srcObject = stream
  }

  function checkFace() {
    const canvas = createCanvasFromMedia(videoEl.current)
    document.getElementById('container').append(canvas)
    const displaySize = {
      width: videoEl.current.width,
      height: videoEl.current.height
    }
    matchDimensions(canvas, displaySize)
    interval = setInterval(async () => {
      const detections = await detectAllFaces(
        videoEl.current,
        new TinyFaceDetectorOptions()
      )
        .withFaceLandmarks()
        .withFaceExpressions()
      const resizedDetections = resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      draw.drawDetections(canvas, resizedDetections)
      draw.drawFaceLandmarks(canvas, resizedDetections)
      draw.drawFaceExpressions(canvas, resizedDetections)
      if (detections.length >= 1 && detections[0].expressions.happy > 0.99) {
        canvas
          .getContext('2d')
          .drawImage(videoEl.current, 0, 0, canvas.width, canvas.height)
        takeSelfie(canvas.toDataURL('image/png'))
      }
    }, 100)
  }

  function takeSelfie(src) {
    setSnapshot(true)
    const photo = document.createElement('img')
    photo.src = src
    document.getElementById('container').append(photo)
    clearInterval(interval)
  }

  return (
    <div
      id="container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh'
      }}
    >
      <video
        width="720"
        height="560"
        onPlaying={!snapshot ? checkFace : null}
        ref={videoEl}
        autoPlay
        muted
      ></video>
    </div>
  )
}
