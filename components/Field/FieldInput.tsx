import { useField } from 'formik'
import React, { FC } from 'react'

interface FieldInputType {
  className?: string
  name: string
  type: string
  placeholder?: string
}

const FieldInput: FC<FieldInputType> = ({ className, ...props }) => {
  const [field, meta] = useField(props.name)

  return (
    <div className='form-group'>
      <input className={`form-control ${className}`} {...field} {...props} />
      {meta.touched && meta.error ? (
        <small className='form-text text-danger'>{meta.error}</small>
      ) : null}
    </div>
  )
}

export default FieldInput
