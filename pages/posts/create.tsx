import { Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import React from 'react'
import { PostDetailForm } from '../../components/Post'
import { CreatePostSidebar } from '../../components/Sidebar'
import { useAuthen } from '../../hooks'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { CreatePostType } from '../../interfaces/post'
import { FILE_SIZE, SUPPORTED_FORMATS } from '../../constants/validate'
import { isEmptyObject } from '../../helpers/utils'
import postService from '../../services/post'
import { useRouter } from 'next/router'

const CreatePost: NextPage = () => {
  useAuthen()
  const router = useRouter()

  const validateFile = (values: CreatePostType) => {
    const file = values.obj_image.file
    const url_image = values.url_image

    if (isEmptyObject(file) && !url_image) {
      return {
        obj_image: 'Please select an image',
        url_image: 'Or please paste an image address',
      }
    }
  }

  return (
    <div className='container'>
      <Formik
        initialValues={{
          obj_image: {
            file: {} as File,
            url: '',
          },
          url_image: '',
          post_content: '',
          category: '',
        }}
        validate={validateFile}
        validationSchema={Yup.object({
          obj_image: Yup.mixed()
            .test(
              'FILE_SIZE',
              'File size is too large',
              (value) =>
                isEmptyObject(value.file) || value.file.size <= FILE_SIZE
            )
            .test(
              'FILE_FORMAT',
              'Unsupported file format',
              (value) =>
                isEmptyObject(value.file) ||
                SUPPORTED_FORMATS.includes(value.file.type)
            ),
          url_image: Yup.string().matches(
            /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
            'Please enter a correct url'
          ),
          post_content: Yup.string()
            .min(5, 'Description must be at least 5 chars')
            .required('Description is required'),
          category: Yup.string().required(
            'Please select at least one category'
          ),
        })}
        onSubmit={async (
          values: CreatePostType,
          { setSubmitting }: FormikHelpers<CreatePostType>
        ) => {
          try {
            await postService.createPost(values)
            router.push('/')
            toast.success('Post created successfully')
          } catch (error) {
            toast.error('Post create failed')
          }
          setSubmitting(false)
        }}
      >
        <Form>
          <div className='row'>
            <div className='col-lg-8'>
              <PostDetailForm />
            </div>
            <div className='col-lg-4'>
              <CreatePostSidebar />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
