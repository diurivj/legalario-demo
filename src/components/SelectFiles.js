import React from 'react'
import { Checkbox, Card, Button } from 'antd'
const CheckboxGroup = Checkbox.Group

const plainOptions = [
  'Documento 1',
  'Documento 2',
  'Documento 3',
  'Documento 4',
  'Documento 5',
  'Documento 6',
  'Documento 7',
  'Documento 8',
  'Documento 9',
  'Documento 10'
]
const defaultCheckedList = []

export default function SelectFiles({ history }) {
  const [state, setState] = React.useState({
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false
  })

  const onChange = checkedList => {
    setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    })
  }

  const onCheckAllChange = e => {
    setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }

  return (
    <Card
      title="Seleccionar archivos"
      style={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <Checkbox
        indeterminate={state.indeterminate}
        onChange={onCheckAllChange}
        checked={state.checkAll}
      >
        Seleccionar todos
      </Checkbox>
      <br />
      <br />
      <CheckboxGroup
        className="checkbox__container"
        options={plainOptions}
        value={state.checkedList}
        onChange={onChange}
      />
      <Button
        onClick={() => history.push('/read-files')}
        type="primary"
        style={{
          position: 'fixed',
          bottom: '3%',
          right: '3%'
        }}
      >
        Siguiente
      </Button>
    </Card>
  )
}
