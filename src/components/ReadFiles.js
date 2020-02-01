import React from 'react'
import pdf from '../utils/contrato.pdf'
import { Card, Button, Modal } from 'antd'

export default function ReadFiles({ history }) {
  const [visible, setVisible] = React.useState(false)

  const handleVisible = () => setVisible(!visible)

  const handleOk = () => {
    handleVisible()
    history.push('/verify-id')
  }

  return (
    <Card className="card__full">
      <embed className="pdf__viewer" src={pdf}></embed>
      <Button
        onClick={handleVisible}
        type="primary"
        style={{
          position: 'fixed',
          bottom: '3%',
          right: '3%'
        }}
      >
        Siguiente
      </Button>
      <Modal
        title="Importante"
        visible={visible}
        onOk={handleOk}
        onCancel={handleVisible}
        okText="Acepto"
        cancelText="No acepto"
      >
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui quisquam
          voluptate temporibus labore minus itaque dolore id aliquam fuga
          repudiandae. Corrupti ad culpa omnis facilis officia quo molestiae,
          asperiores commodi?
        </p>
      </Modal>
    </Card>
  )
}
