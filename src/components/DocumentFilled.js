import React from 'react'

export default function DocumentFilled() {
  const [id, setId] = React.useState('')
  const [selfie, setSelfie] = React.useState('')
  const [sign, setSign] = React.useState('')
  React.useEffect(() => {
    setId(localStorage.getItem('id'))
    setSelfie(localStorage.getItem('selfie'))
    setSign(localStorage.getItem('sign'))
  }, [])
  return (
    <div
      className="finish"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100vw',
        height: '100vh'
      }}
    >
      <img src={id} alt="id" />
      <img src={selfie} alt="selfie" />
      <img src={sign} alt="sign" />
    </div>
  )
}
