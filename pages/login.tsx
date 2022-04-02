import { Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { FieldInput } from '../components/Field'
import { useAuthen } from '../helpers/useAuthen'
import { LoginData } from '../interfaces/user'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const Login: NextPage = () => {
  useAuthen(false)
  const router = useRouter()
  const queryString = router.query.error
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (queryString) {
      toast.error('Login failed')
      window.history.pushState({}, document.title, '/login')
    }
  }, [queryString])

  const handleSubmit = (e: any) => {
    e.preventDefault()
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
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
              password: Yup.string()
                .min(6, 'Password mus be at least 6 chars')
                .required('Password is required'),
            })}
            onSubmit={(
              values: LoginData,
              { setSubmitting }: FormikHelpers<LoginData>
            ) => {}}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form action='/api/login' method='POST' onSubmit={handleSubmit}>
                <FieldInput name='email' type='text' placeholder='Email' />
                <FieldInput
                  name='password'
                  type='password'
                  placeholder='Password'
                />

                <div className='ass1-login__send'>
                  <Link href='/register'>
                    <a>Register an account</a>
                  </Link>
                  <Button
                    type='submit'
                    className='ass1-btn'
                    disabled={loading || isSubmitting || !dirty || !isValid}
                    isLoading={loading || isSubmitting}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login
