import Link from 'next/link'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { selectCurrentUser } from '../../redux/user/userReducers'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setCurrentUser } from '../../redux/user/userActions'
import { selectCategories } from '../../redux/post/postReducers'
import SearchBar from './SearchBar'

const Header: FC = () => {
  const router = useRouter()
  const currentUser = useAppSelector(selectCurrentUser)
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    const check = window.confirm('Are you sure to logout?')
    if (check) {
      const currentTime = new Date()
      document.cookie = `token=;expires=${currentTime}.toUTCString();path=\/`
      dispatch(setCurrentUser(null))
      router.push('/login')
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
                <div className='ass1-header__nav'>
                  <div className='container'>
                    <ul>
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link href={`/categories/${category.id}`}>
                            <a>{category.text}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='ass1-header__menu-transition' />
                </div>
              </li>
              <li className='active'>
                <a href='#'>Hot</a>
                <div className='ass1-header__nav' style={{ display: 'none' }}>
                  <div className='container'>
                    <ul></ul>
                  </div>
                  <div className='ass1-header__menu-transition' />
                </div>
              </li>
            </ul>
          </nav>
          <SearchBar />
          <Link href='/posts/create'>
            <a className='ass1-header__btn-upload ass1-btn'>
              <i className='icon-Upvote' /> Upload
            </a>
          </Link>
          {currentUser ? (
            <div className='wrapper-user'>
              <Link href={`/users/${currentUser.USERID}`}>
                <a className='user-header'>
                  <span className='avatar'>
                    <img src={currentUser.profilepicture} alt='' />
                  </span>
                  <span className='email'>{currentUser.fullname}</span>
                </a>
              </Link>
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
