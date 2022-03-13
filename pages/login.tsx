import { NextPage } from 'next'
import Link from 'next/link'

const Login: NextPage = () => {
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
          <form action='#'>
            <input
              type='text'
              className='form-control'
              placeholder='Email'
              required
            />
            <div className='ass1-input-copy'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                required
              />
              <a href='#'>Copy</a>
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
