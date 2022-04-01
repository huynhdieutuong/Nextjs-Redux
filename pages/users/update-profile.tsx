/* eslint-disable @next/next/no-img-element */
import { Form, Formik, FormikHelpers } from 'formik'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import { Button } from '../../components/Button'
import {
  FieldFile,
  FieldInput,
  FieldSelect,
  FieldTextarea,
} from '../../components/Field'

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
  const inputFileEl = useRef<HTMLInputElement>(null)

  const handleClickImage = () => {
    inputFileEl.current?.click()
  }

  return (
    <div className='ass1-login'>
      <div className='ass1-login__content'>
        <p>Profile</p>
        <div className='ass1-login__form'>
          <Formik
            initialValues={{
              name: '',
              gender: '',
              avatar: {
                file: {} as File,
                url: '',
              },
              bio: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(5, 'Name mus be at least 5 chars')
                .max(20, 'Name must be less than or equal to 20 chars')
                .required('Name is required'),
              gender: Yup.string()
                .oneOf(['1', '0'], 'Invalid Gender')
                .required('Please select a gender'),
              bio: Yup.string()
                .max(200, 'Bio must be less than or equal to 200 chars')
                .required('Bio is required'),
            })}
            onSubmit={(
              values: ProfileType,
              { setSubmitting }: FormikHelpers<ProfileType>
            ) => {
              console.log(values)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting, isValid, dirty, values }) => {
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
                      <option value={1}>Male</option>
                      <option value={0}>Female</option>
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
