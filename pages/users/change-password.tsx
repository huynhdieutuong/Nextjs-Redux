import React from 'react'

const ChangePassword = () => {
  return (
    <div className='ass1-login'>
      <div className='ass1-login__content'>
        <p>Change password</p>
        <div className='ass1-login__form'>
          <form action='#'>
            <input
              type='password'
              className='form-control'
              placeholder='Current password'
              required
            />
            <input
              type='password'
              className='form-control'
              placeholder='New password'
              required
            />
            <input
              type='password'
              className='form-control'
              placeholder='Confirm password'
              required
            />
            <div className='ass1-login__send justify-content-center'>
              <button type='submit' className='ass1-btn'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
