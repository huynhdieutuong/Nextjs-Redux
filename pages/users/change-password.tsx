import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { FieldInput } from '../../components/Field'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { ChangePasswordType } from '../../interfaces/user'
import { Button } from '../../components/Button'
import userService from '../../services/user'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../redux/hooks'
import { selectCurrentUser } from '../../redux/user/userReducers'

const ChangePassword = () => {
  const router = useRouter()
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <div className='ass1-login'>
      <div className='ass1-login__content'>
        <p>Change password</p>
        <div className='ass1-login__form'>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              reNewPassword: '',
            }}
            validationSchema={Yup.object({
              oldPassword: Yup.string()
                .min(6, 'Current password must be at least 6 chars')
                .required()
                .required('Current password is required'),
              newPassword: Yup.string()
                .min(6, 'New password must be at least 6 chars')
                .required('New password is required'),
              reNewPassword: Yup.string()
                .oneOf(
                  [Yup.ref('newPassword')],
                  'Confirm password do not match'
                )
                .required('Confirm password is required'),
            })}
            onSubmit={async (
              values: ChangePasswordType,
              { setSubmitting }: FormikHelpers<ChangePasswordType>
            ) => {
              try {
                await userService.changePassword(values)
                toast.success('Password changed successfully')
                router.push(`/users/${currentUser?.USERID}`)
              } catch (error) {
                toast.error('Password change failed')
              }
              setSubmitting(false)
            }}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form>
                <FieldInput
                  name='oldPassword'
                  type='password'
                  placeholder='Current password'
                />
                <FieldInput
                  name='newPassword'
                  type='password'
                  placeholder='New password'
                />
                <FieldInput
                  name='reNewPassword'
                  type='password'
                  placeholder='Confirm password'
                />
                <div className='ass1-login__send justify-content-center'>
                  <Button
                    type='submit'
                    className='ass1-btn'
                    disabled={isSubmitting || !dirty || !isValid}
                    isLoading={isSubmitting}
                  >
                    Submit
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

export default ChangePassword
