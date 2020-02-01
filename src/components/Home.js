import React from 'react'
import { Form, Button, Icon, Input, Typography } from 'antd'

const { Title } = Typography

const logo = 'https://www.sandbox-legalario.com/images/general/legalario.png'

export default function Home({ history }) {
  const onSubmit = e => {
    e.preventDefault()
    history.push('/select-files')
  }

  return (
    <section className="home-container">
      <nav>
        <img src={logo} alt="logo" />
      </nav>

      <Title level={2}>Inicia Sesion</Title>

      <Form className="home-container__form" onSubmit={onSubmit}>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Correo Electrónico"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>

      <footer>
        <div>Legalario © 2020 - Todos los derechos reservados.</div>
        <div>
          <span>Aviso de Privacidad</span>
          <span>
            <Icon type="mail" /> ¡Contáctanos!
          </span>
        </div>
      </footer>
    </section>
  )
}
