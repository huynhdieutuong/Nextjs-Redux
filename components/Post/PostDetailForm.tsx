import { useFormikContext } from 'formik'
import React, { FC, useEffect, useRef, useState } from 'react'
import { CreatePostType } from '../../interfaces/post'
import { FieldFile, FieldInput, FieldTextarea } from '../Field'

const PostDetailForm: FC = () => {
  const inputFileEl = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState('/images/no_image_available.jpg')
  const formik = useFormikContext()
  const values = formik.values as CreatePostType

  useEffect(() => {
    if (values.url_image) {
      setUrl(values.url_image)
      formik.setFieldValue('obj_image', {
        file: {} as File,
        url: '',
      })
    }
  }, [values.url_image])

  useEffect(() => {
    if (values.obj_image.url) {
      setUrl(values.obj_image.url)
      formik.setFieldValue('url_image', '')
    }
  }, [values.obj_image.url])

  return (
    <div className='ass1-section ass1-section__edit-post'>
      <div className='ass1-section__content'>
        <FieldTextarea
          name='post_content'
          className='ttg-border-none'
          placeholder='Describe ...'
        />

        <div className='ass1-section__image'>
          <img src={url} alt='' onClick={() => inputFileEl.current?.click()} />
        </div>

        <FieldFile
          ref={inputFileEl}
          name='obj_image'
          style={{ display: 'none' }}
        />

        <hr />

        <a
          href='https://memeful.com/generator'
          target='_blank'
          rel='noreferrer'
          className='ass1-btn ass1-btn-meme'
        >
          Or create a photo from meme and paste image address to input below
        </a>
        <FieldInput
          name='url_image'
          className='ttg-border-none'
          type='text'
          placeholder='https://'
        />
      </div>
    </div>
  )
}

export default PostDetailForm
