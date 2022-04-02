import { Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { FieldInput } from '../components/Field'
import { useAuthen } from '../helpers/useAuthen'
import { RegisterData } from '../interfaces/user'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const Register: NextPage = () => {
  useAuthen(false)
  const router = useRouter()
  const errorString = router.query.error
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (errorString) {
      toast.error('Register failed')
      window.history.pushState({}, document.title, '/register')
    }
  }, [errorString])

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
        <p>Register</p>
        <div className='ass1-login__form'>
          <Formik
            initialValues={{
              fullname: '',
              email: '',
              password: '',
              repassword: '',
            }}
            validationSchema={Yup.object({
              fullname: Yup.string()
                .min(5, 'Full name must be at least 5 chars')
                .required()
                .required('Full name is required'),
              email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
              password: Yup.string()
                .min(6, 'Password mus be at least 6 chars')
                .required('Password is required'),
              repassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Confirm password do not match')
                .required('Confirm password is required'),
            })}
            onSubmit={(
              values: RegisterData,
              { setSubmitting }: FormikHelpers<RegisterData>
            ) => {}}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form
                action='/api/register'
                method='POST'
                onSubmit={handleSubmit}
              >
                <FieldInput
                  name='fullname'
                  type='text'
                  placeholder='Full name'
                />
                <FieldInput name='email' type='text' placeholder='Email' />
                <FieldInput
                  name='password'
                  type='password'
                  placeholder='Password'
                />
                <FieldInput
                  name='repassword'
                  type='password'
                  placeholder='Confirm password'
                />

                <div className='ass1-login__send'>
                  <Link href='/login'>
                    <a>Login</a>
                  </Link>
                  <Button
                    type='submit'
                    className='ass1-btn'
                    disabled={loading || isSubmitting || !dirty || !isValid}
                    isLoading={loading || isSubmitting}
                  >
                    Register
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

export default Register
