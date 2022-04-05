import { Form, Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'
import { AddCommentType, CommentType } from '../../interfaces/comment'
import { FieldTextarea } from '../Field'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Button } from '../Button'
import commentService from '../../services/comment'
import { useAppSelector } from '../../redux/hooks'
import { selectCurrentUser } from '../../redux/user/userReducers'

interface CommentFormType {
  postid: string
  comments: CommentType[]
  setComments: any
}

const CommentForm: FC<CommentFormType> = ({
  postid,
  comments,
  setComments,
}) => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <div className='ass1-add-comment'>
      <Formik
        enableReinitialize
        initialValues={{
          comment: '',
          postid: postid,
        }}
        validationSchema={Yup.object({
          comment: Yup.string()
            .min(5, 'Comment must be at least 5 chars')
            .max(180, 'Comment must be more than 180 chars')
            .required('Comment is required'),
          postid: Yup.string().required(),
        })}
        onSubmit={async (
          values: AddCommentType,
          { setSubmitting, resetForm }: FormikHelpers<AddCommentType>
        ) => {
          try {
            const res = await commentService.addCommentByPostId(values)
            setComments([
              ...comments,
              {
                ...res.data.body,
                fullname: currentUser?.fullname,
                profilepicture: currentUser?.profilepicture,
              },
            ])
            resetForm()
          } catch (error) {
            toast.error('Add comment failed')
          }

          setSubmitting(false)
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <FieldTextarea
              name='comment'
              className='ttg-border-none'
              placeholder='Add a comment'
              max={180}
            />

            <div className='ass1-add-comment__content'>
              <Button
                type='submit'
                className='ass1-btn'
                disabled={isSubmitting || !dirty || !isValid}
                isLoading={isSubmitting}
              >
                Add
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CommentForm
