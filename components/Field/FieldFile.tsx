import { useField } from 'formik'
import React, { forwardRef } from 'react'

interface FieldFileType {
  children?: React.ReactNode
  name: string
  placeholder?: string
  style?: object
}

const FieldFile = forwardRef<HTMLInputElement, FieldFileType>((props, ref) => {
  const [field, meta, helpers] = useField(props.name)

  const handleFileChange = (e: any) => {
    const file = e.target.files[0] as File

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        helpers.setValue({
          file,
          url: reader.result,
        })
      }
    }
  }

  return (
    <div className='form-group'>
      <input
        type='file'
        className='form-control'
        onChange={handleFileChange}
        ref={ref}
        {...props}
      />
      {meta.error ? (
        <small className='form-text text-danger'>{meta.error}</small>
      ) : null}
    </div>
  )
})

FieldFile.displayName = 'FieldFile'

export default FieldFile
