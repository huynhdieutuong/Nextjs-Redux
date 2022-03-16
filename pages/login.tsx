import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useNotAuthen } from '../helpers/useAuthen'
import { LoginData } from '../interfaces/user'

const Login: NextPage = () => {
  useNotAuthen()
  const router = useRouter()
  const queryString = router.query.error

  useEffect(() => {
    if (queryString) {
      alert('Login failed')
      window.history.pushState({}, document.title, '/login')
    }
  }, [queryString])

  const initData: LoginData = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initData)

  const hanldeOnChange = (key: string) => (e: any) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
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
                required
                value={formData.email}
                onChange={hanldeOnChange('email')}
              />
              {/* <small className='form-text text-danger'>Error</small> */}
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password'
                className='form-control'
                placeholder='Password'
                required
                value={formData.password}
                onChange={hanldeOnChange('password')}
              />
              {/* <small className='form-text text-danger'>Error</small> */}
            </div>
            <div className='ass1-login__send'>
              <Link href='/register'>
                <a>Register an account</a>
              </Link>
              <button type='submit' className='ass1-btn'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
