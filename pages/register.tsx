import { NextPage } from 'next'
import Link from 'next/link'

const Register: NextPage = () => {
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
          <form action='#'>
            <input
              type='text'
              className='form-control'
              placeholder='Display name'
              required
            />
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              required
            />
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              required
            />
            <input
              type='password'
              className='form-control'
              placeholder='Confirm password'
              required
            />
            <div className='ass1-login__send'>
              <Link href='/login'>
                <a>Login</a>
              </Link>
              <button type='submit' className='ass1-btn'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
