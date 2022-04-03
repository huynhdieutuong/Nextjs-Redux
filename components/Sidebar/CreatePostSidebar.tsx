import { useField, useFormikContext } from 'formik'
import React, { FC, useState } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { selectCategories } from '../../redux/post/postReducers'
import { Button } from '../Button'
import { FieldCheckbox } from '../Field'

const CreatePostSidebar: FC = () => {
  const categories = useAppSelector(selectCategories)
  const [field, meta] = useField('category')
  const { isSubmitting, dirty, isValid } = useFormikContext()

  return (
    <aside className='ass1-aside ass1-aside__edit-post'>
      <div>
        <Button
          type='submit'
          className='ass1-btn'
          disabled={isSubmitting || !dirty || !isValid}
          isLoading={isSubmitting}
        >
          Create post
        </Button>
      </div>
      <div className='ass1-aside__edit-post-head'>
        <span style={{ display: 'block', width: '100%', marginBottom: '30px' }}>
          Select categories{' '}
          {meta.touched && meta.error && (
            <small className='form-text text-danger'>{meta.error}</small>
          )}
        </span>
        {categories.map((category) => (
          <FieldCheckbox
            name='category'
            className='ass1-checkbox'
            key={category.id}
            value={category.id}
            text={category.text}
          />
        ))}
      </div>
    </aside>
  )
}

export default CreatePostSidebar
