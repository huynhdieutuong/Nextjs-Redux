/* eslint-disable @next/next/no-img-element */
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { Button } from '../../components/Button'
import {
  FieldFile,
  FieldInput,
  FieldSelect,
  FieldTextarea,
} from '../../components/Field'
import { FILE_SIZE, SUPPORTED_FORMATS } from '../../constants/validate'
import { isEmptyObject } from '../../helpers/utils'
import { UpdateProfileType } from '../../interfaces/user'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setCurrentUser } from '../../redux/user/userActions'
import { selectCurrentUser } from '../../redux/user/userReducers'
import userService from '../../services/user'

interface FileType {
  file: File
  url: string
}
interface ProfileType {
  name: string
  gender: string
  avatar: FileType
  bio: string
}

const UpdateProfile = () => {
  const dispatch = useAppDispatch()
  const inputFileEl = useRef<HTMLInputElement>(null)
  const currentUser = useAppSelector(selectCurrentUser)

  const handleClickImage = () => {
    inputFileEl.current?.click()
  }

  const validateFile = (values: ProfileType) => {
    const file = values.avatar.file

    if (!isEmptyObject(file)) {
      if (file.size > FILE_SIZE) return { avatar: 'File size is too large' }

      if (!SUPPORTED_FORMATS.includes(file.type))
        return { avatar: 'Unsupported file format' }
    }
  }

  return (
    <div className='ass1-login'>
      <div className='ass1-login__content'>
        <p>Profile</p>
        <div className='ass1-login__form'>
          <Formik
            enableReinitialize
            initialValues={{
              name: currentUser?.fullname || '',
              gender: currentUser?.gender || '',
              avatar: {
                file: {} as File,
                url: currentUser?.profilepicture || '',
              },
              bio: currentUser?.description || '',
            }}
            validate={validateFile}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .min(5, 'Name mus be at least 5 chars')
                .max(20, 'Name must be less than or equal to 20 chars')
                .required('Name is required'),
              gender: Yup.string()
                .oneOf(['nam', 'nu'], 'Invalid Gender')
                .required('Please select a gender'),
              bio: Yup.string()
                .max(200, 'Bio must be less than or equal to 200 chars')
                .required('Bio is required'),
            })}
            onSubmit={async (
              values: ProfileType,
              { setSubmitting }: FormikHelpers<ProfileType>
            ) => {
              const data: UpdateProfileType = {
                avatar: values.avatar.file,
                fullname: values.name,
                description: values.bio,
                gender: values.gender,
              }

              try {
                const res = await userService.updateProfile(data)
                dispatch(setCurrentUser(res.data.user))
                toast.success('Profile updated successfully')
              } catch (error) {
                toast.error('Profile update failed')
              }
              setSubmitting(false)
            }}
          >
            {({ values, isSubmitting, dirty, isValid }) => {
              return (
                <>
                  <div className='avatar'>
                    <img
                      src={values.avatar.url || '/images/avatar-02.png'}
                      alt='avatar'
                      onClick={handleClickImage}
                    />
                  </div>
                  <Form>
                    <FieldInput
                      name='name'
                      type='text'
                      placeholder='Name ...'
                    />

                    <FieldSelect name='gender'>
                      <option>Gender</option>
                      <option value='nam'>Male</option>
                      <option value='nu'>Female</option>
                    </FieldSelect>

                    <FieldFile
                      ref={inputFileEl}
                      name='avatar'
                      placeholder='Avatar'
                    />

                    <FieldTextarea
                      name='bio'
                      cols={30}
                      rows={5}
                      placeholder='Bio ...'
                    />

                    <div className='ass1-login__send justify-content-center'>
                      <Button
                        type='submit'
                        className='ass1-btn'
                        disabled={isSubmitting || !dirty || !isValid}
                        isLoading={isSubmitting}
                      >
                        Update
                      </Button>
                    </div>
                  </Form>
                </>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
