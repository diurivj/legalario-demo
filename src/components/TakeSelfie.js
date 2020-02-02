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
import { Button } from 'antd'

export default function TakeSelfie({ history }) {
  const interval = React.useRef(null)
  const videoEl = React.useRef()
  const [snapShot, setSnapshot] = React.useState(false)
  React.useEffect(() => {
    const video = videoEl.current
    Promise.all([
      nets.tinyFaceDetector.loadFromUri('/models'),
      nets.faceLandmark68Net.loadFromUri('/models'),
      nets.faceRecognitionNet.loadFromUri('/models'),
      nets.faceExpressionNet.loadFromUri('/models')
    ])
      .then(startVideo)
      .catch(err => console.log(err))
    video.addEventListener('playing', checkFace)
    return () => {
      video.removeEventListener('playing', checkFace)
    }
  })

  function startVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then(stream => (videoEl.current.srcObject = stream))
      .catch(err => console.log(err))
  }

  function checkFace() {
    const canvas = createCanvasFromMedia(videoEl.current)
    document.getElementById('container').append(canvas)
    const displaySize = {
      width: videoEl.current.width,
      height: videoEl.current.height
    }
    matchDimensions(canvas, displaySize)
    interval.current = setInterval(async () => {
      const detections = await detectAllFaces(videoEl.current, new TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
      const resizedDetections = resizeResults(detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      draw.drawDetections(canvas, resizedDetections)
      draw.drawFaceLandmarks(canvas, resizedDetections)
      draw.drawFaceExpressions(canvas, resizedDetections)
      if (!!detections.length && detections[0].expressions.happy > 0.99) {
        canvas.getContext('2d').drawImage(videoEl.current, 0, 0, 720, 560)
        takeSelfie(canvas.toDataURL('image/png'))
      }
    }, 500)
  }

  function takeSelfie(src) {
    setSnapshot(true)
    videoEl.current.removeEventListener('playing', checkFace)
    clearInterval(interval.current)
    localStorage.setItem('selfie', src)
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
      <h1 style={{ position: 'fixed', top: '50px' }}>Sonrie</h1>
      <video
        style={{ border: '1px solid black' }}
        width="720"
        height="560"
        ref={videoEl}
        autoPlay
        muted
      ></video>
      {snapShot && (
        <Button
          type="primary"
          style={{
            position: 'fixed',
            bottom: '3%',
            right: '3%'
          }}
          onClick={() => history.push('/signature')}
        >
          Siguiente
        </Button>
      )}
    </div>
  )
}
