import { useField } from 'formik'
import React, { FC } from 'react'

interface FieldTextareaType {
  className?: string
  name: string
  placeholder?: string
  cols?: number
  rows?: number
}

const FieldTextarea: FC<FieldTextareaType> = ({ className, ...props }) => {
  const [field, meta] = useField(props.name)

  return (
    <div className='form-group'>
      <textarea className={`form-control ${className}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <small className='form-text text-danger'>{meta.error}</small>
      ) : null}
    </div>
  )
}

export default FieldTextarea
