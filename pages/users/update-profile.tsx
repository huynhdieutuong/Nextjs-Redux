import React from 'react'

const UpdateProfile = () => {
  return (
    <div className='ass1-login'>
      <div className='ass1-login__content'>
        <p>Profile</p>
        <div className='ass1-login__form'>
          <div className='avatar'>
            <img src='/images/cat-1634369_1920.jpg' alt='' />
          </div>
          <form action='#'>
            <input
              type='text'
              className='form-control'
              placeholder='Name ...'
              required
            />
            <select className='form-control'>
              <option>Gender</option>
              <option value={1}>Male</option>
              <option value={0}>Female</option>
            </select>
            <input
              type='file'
              name='avatar'
              placeholder='Avatar'
              className='form-control'
            />
            <textarea
              className='form-control'
              cols={30}
              rows={5}
              placeholder='Bio ...'
              defaultValue={''}
            />
            <div className='ass1-login__send justify-content-center'>
              <button type='submit' className='ass1-btn'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
