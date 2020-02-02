import React from 'react'
import SignaturePad from 'signature_pad'
import { Button } from 'antd'

let signaturePad

export default function Signature({ history }) {
  const canvasEl = React.useRef()
  const [signing, setSigning] = React.useState(false)

  function startSign() {
    if (signing) return
    setSigning(true)
    signaturePad = new SignaturePad(canvasEl.current)
  }

  function sign() {
    localStorage.setItem('sign', signaturePad.toDataURL())
    history.push('/document-filled')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100vw',
        height: '100vh'
      }}
    >
      <h1>Sign</h1>
      <canvas
        onMouseOver={startSign}
        ref={canvasEl}
        style={{ position: 'inherit', border: '1px solid black' }}
        width="720"
        height="560"
      ></canvas>
      <Button
        onClick={() => signaturePad.clear()}
        style={{
          position: 'fixed',
          bottom: '9%',
          right: '3%'
        }}
      >
        Intentar otra vez
      </Button>
      <Button
        onClick={sign}
        style={{
          position: 'fixed',
          bottom: '3%',
          right: '3%'
        }}
        type="primary"
      >
        Firmar
      </Button>
    </div>
  )
}
