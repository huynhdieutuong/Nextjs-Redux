import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { useNotAuthen } from '../helpers/useAuthen'
import { validateAuthForm } from '../helpers/validateForm'
import { LoginData } from '../interfaces/user'

const Login: NextPage = () => {
  useNotAuthen()
  const router = useRouter()
  const queryString = router.query.error
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (queryString) {
      alert('Login failed')
      window.history.pushState({}, document.title, '/login')
    }
  }, [queryString])

  const initData: LoginData = {
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  }
  const [formData, setFormData] = useState(initData)

  const handleOnChange = (key: string) => (e: any) => {
    const error = validateAuthForm(key, e.target.value)

    setFormData({
      ...formData,
      [key]: {
        value: e.target.value,
        error,
      },
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    for (let key in formData) {
      const error = formData[key as keyof LoginData].error
      const value = formData[key as keyof LoginData].value
      if (error || !value.trim().length) {
        return alert('Please input valid data')
      }
    }

    setLoading(true)

    e.target.submit()
  }

  return (
    <div className='ass1-login'>
      <div className='ass1-login__logo'>
        <Link href='/'>
          <a className='ass1-logo'>Meme</a>
        </Link>
      </div>
      <div className='ass1-login__content'>
        <p>Login</p>
        <div className='ass1-login__form'>
          <form action='/api/login' method='POST' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                name='email'
                className='form-control'
                placeholder='Email'
                value={formData.email.value}
                onChange={handleOnChange('email')}
              />
              {formData.email.error && (
                <small className='form-text text-danger'>
                  {formData.email.error}
                </small>
              )}
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password'
                className='form-control'
                placeholder='Password'
                value={formData.password.value}
                onChange={handleOnChange('password')}
              />
              {formData.password.error && (
                <small className='form-text text-danger'>
                  {formData.password.error}
                </small>
              )}
            </div>
            <div className='ass1-login__send'>
              <Link href='/register'>
                <a>Register an account</a>
              </Link>
              <Button
                type='submit'
                className='ass1-btn'
                disabled={loading}
                isLoading={loading}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
