import React, {useState} from 'react'
import {AuthForm} from 'Auth_Components'

const Login_page = () => {

  const [{email, password}, setCredentials] = useState({
    email: '',
    password: ''
  })

  return (
    <AuthForm>
      <label htmlFor="email">Email</label>
      <input placeholder="Електронна адреса" value={email} onChange={(event) => setCredentials({
        email: event.target.value,
        password
      })} />
      <label htmlFor="password">Password</label>
      <input placeholder="Пароль" value={email} onChange={(event) => setCredentials({
        email,
        password: event.target.value
      })} />
      <label htmlFor="SaveData">Зберегти дані</label>
      <input type="checkbox" name="SaveData" id="Зберегти дані" />
      <button type="submit">Вхід</button>
    </AuthForm>
  )
}

export default Login_page;
