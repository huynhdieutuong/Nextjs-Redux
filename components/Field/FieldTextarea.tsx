import { useField } from 'formik'
import React, { FC } from 'react'

interface FieldTextareaType {
  className?: string
  name: string
  placeholder?: string
  cols?: number
  rows?: number
  max?: number
}

const FieldTextarea: FC<FieldTextareaType> = ({ className, max, ...props }) => {
  const [field, meta, helpers] = useField(props.name)

  const handleChange = (e: any) => {
    const value = e.target.value
    if (max) {
      if (value.length <= max) helpers.setValue(e.target.value)
    } else {
      helpers.setValue(e.target.value)
    }
  }

  return (
    <div className='form-group'>
      <textarea
        className={`form-control ${className}`}
        {...props}
        {...field}
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <small className='form-text text-danger'>{meta.error}</small>
      ) : null}
      {max && (
        <span style={{ position: 'absolute', right: '0', padding: '5px' }}>
          {max - field.value.length}
        </span>
      )}
    </div>
  )
}

export default FieldTextarea
