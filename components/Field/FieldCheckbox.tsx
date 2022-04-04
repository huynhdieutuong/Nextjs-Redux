import { useField } from 'formik'
import React, { FC } from 'react'

interface FieldCheckboxType {
  className?: string
  name: string
  value: number
  text: string
  checked?: boolean
}

const FieldCheckbox: FC<FieldCheckboxType> = ({
  className,
  text,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name)

  const handleChange = (e: any) => {
    let categories: string[] = field.value ? field.value.split(',') : []

    if (e.target.checked) {
      categories = [...categories, e.target.value]
    } else {
      categories = categories.filter((cat) => cat !== e.target.value)
    }

    helpers.setTouched(true)
    helpers.setValue(categories.join(','))
  }

  return (
    <label className={className}>
      <input type='checkbox' {...field} {...props} onChange={handleChange} />
      <span />
      <p>{text}</p>
    </label>
  )
}

export default FieldCheckbox
