import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { useNotAuthen } from '../helpers/useAuthen'
import { validateAuthForm } from '../helpers/validateForm'
import { RegisterData } from '../interfaces/user'

const Register: NextPage = () => {
  useNotAuthen()
  const router = useRouter()
  const errorString = router.query.error
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (errorString) {
      alert('Register failed')
      window.history.pushState({}, document.title, '/register')
    }
  }, [errorString])

  const initialData: RegisterData = {
    fullname: {
      value: '',
      error: '',
    },
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
    repassword: {
      value: '',
      error: '',
    },
  }
  const [formData, setFormData] = useState(initialData)

  const handleOnChange = (key: string) => (e: any) => {
    setFormData({
      ...formData,
      [key]: {
        value: e.target.value,
        error: validateAuthForm(key, e.target.value, formData.password.value),
      },
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    for (let key in formData) {
      const error = formData[key as keyof RegisterData].error
      const value = formData[key as keyof RegisterData].value
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
        <p>Register</p>
        <div className='ass1-login__form'>
          <form action='/api/register' method='POST' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                name='fullname'
                className='form-control'
                placeholder='Full name'
                value={formData.fullname.value}
                onChange={handleOnChange('fullname')}
              />
              {formData.fullname.error && (
                <small className='form-text text-danger'>
                  {formData.fullname.error}
                </small>
              )}
            </div>
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
            <div className='form-group'>
              <input
                type='password'
                name='repassword'
                className='form-control'
                placeholder='Confirm password'
                value={formData.repassword.value}
                onChange={handleOnChange('repassword')}
              />
              {formData.repassword.error && (
                <small className='form-text text-danger'>
                  {formData.repassword.error}
                </small>
              )}
            </div>
            <div className='ass1-login__send'>
              <Link href='/login'>
                <a>Login</a>
              </Link>
              <Button
                type='submit'
                className='ass1-btn'
                disabled={loading}
                isLoading={loading}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
