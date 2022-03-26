import { useField } from 'formik'
import React from 'react'

const FieldInput = ({ ...props }) => {
  const [field, meta] = useField(props.name)

  return (
    <div className='form-group'>
      <input className='form-control' {...field} {...props} />
      {meta.touched && meta.error ? (
        <small className='form-text text-danger'>{meta.error}</small>
      ) : null}
    </div>
  )
}

export default FieldInput
