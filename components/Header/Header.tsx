import Link from 'next/link'
import React, { FC, useContext } from 'react'
import UserContext from '../../contexts/user/userContext'
import { useRouter } from 'next/router'

const Header: FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(UserContext)

  const handleLogout = () => {
    const check = window.confirm('Are you sure to logout?')
    if (check) {
      const currentTime = new Date()
      document.cookie = `token=;expires=${currentTime}.toUTCString();path=\/`
      router.push('/')
    }
  }

  return (
    <header>
      <div className='ass1-header'>
        <div className='container'>
          <Link href='/'>
            <a className='ass1-logo'>Meme</a>
          </Link>
          <nav>
            <ul className='ass1-header__menu'>
              <li>
                <a href='#'>Category</a>
                <div className='ass1-header__nav' style={{ display: 'none' }}>
                  <div className='container'>
                    <ul>
                      <li>
                        <a href='#'>Funny</a>
                      </li>
                      <li>
                        <a href='#'>Animals</a>
                      </li>
                      <li>
                        <a href='#'>Anime &amp; Mâng</a>
                      </li>
                      <li>
                        <a href='#'>Awesome</a>
                      </li>
                      <li>
                        <a href='#'>Basketball</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href='#'>Car</a>
                      </li>
                      <li>
                        <a href='#'>Comic</a>
                      </li>
                      <li>
                        <a href='#'>Cosplay</a>
                      </li>
                      <li>
                        <a href='#'>Countryballs</a>
                      </li>
                      <li>
                        <a href='#'>Classical Art Memes</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href='#'>Girl</a>
                      </li>
                      <li>
                        <a href='#'>History</a>
                      </li>
                      <li>
                        <a href='#'>K-POP</a>
                      </li>
                      <li>
                        <a href='#'>V-POP</a>
                      </li>
                      <li>
                        <a href='#'>Pokémon</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href='#'>School</a>
                      </li>
                      <li>
                        <a href='#'>Star war</a>
                      </li>
                      <li>
                        <a href='#'>Coder</a>
                      </li>
                      <li>
                        <a href='#'>Travel</a>
                      </li>
                      <li>
                        <a href='#'>Sport</a>
                      </li>
                    </ul>
                  </div>
                  <div className='ass1-header__menu-transition' />
                </div>
              </li>
              <li className='active'>
                <a href='#'>Hot</a>
                <div className='ass1-header__nav' style={{ display: 'none' }}>
                  <div className='container'>
                    <ul>
                      <li>
                        <a href='#'>Funny</a>
                      </li>
                      <li>
                        <a href='#'>Animals</a>
                      </li>
                      <li>
                        <a href='#'>Anime &amp; Manga</a>
                      </li>
                      <li>
                        <a href='#'>Awesome</a>
                      </li>
                      <li>
                        <a href='#'>Basketball</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href='#'>Car</a>
                      </li>
                      <li>
                        <a href='#'>Comic</a>
                      </li>
                      <li>
                        <a href='#'>Cosplay</a>
                      </li>
                      <li>
                        <a href='#'>Countryballs</a>
                      </li>
                      <li>
                        <a href='#'>Classical Art Memes</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href='#'>Girl</a>
                      </li>
                      <li>
                        <a href='#'>History</a>
                      </li>
                      <li>
                        <a href='#'>K-POP</a>
                      </li>
                      <li>
                        <a href='#'>V-POP</a>
                      </li>
                      <li>
                        <a href='#'>Pokémon</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href='#'>School</a>
                      </li>
                      <li>
                        <a href='#'>Star war</a>
                      </li>
                      <li>
                        <a href='#'>Coder</a>
                      </li>
                      <li>
                        <a href='#'>Travel</a>
                      </li>
                      <li>
                        <a href='#'>Sport</a>
                      </li>
                    </ul>
                  </div>
                  <div className='ass1-header__menu-transition' />
                </div>
              </li>
            </ul>
          </nav>
          <div className='ass1-header__search'>
            <form action='#'>
              <label>
                <input
                  type='search'
                  name='search-text'
                  className='form-control'
                  placeholder='Input keyword ...'
                />
                <i className='icon-Search' />
              </label>
            </form>
          </div>
          <Link href='/posts/create'>
            <a className='ass1-header__btn-upload ass1-btn'>
              <i className='icon-Upvote' /> Upload
            </a>
          </Link>
          {currentUser ? (
            <div className='wrapper-user'>
              <a className='user-header'>
                <span className='avatar'>
                  <img
                    src={currentUser.profilepicture || '/images/avatar-02.png'}
                    alt='avatar'
                  />
                </span>
                <span className='email'>{currentUser.email}</span>
              </a>
              <div onClick={handleLogout} className='logout'>
                Logout
              </div>
            </div>
          ) : (
            <>
              <Link href='/login'>
                <a className='ass1-header__btn-upload ass1-btn'>Login</a>
              </Link>
              <Link href='/register'>
                <a className='ass1-header__btn-upload ass1-btn'>Register</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header