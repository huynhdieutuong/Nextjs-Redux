import { capitalizedCase, validateEmail } from './utils'

export function validateAuthForm(
  key: string,
  value: string,
  password?: string
): string {
  let error = ''

  if (value.trim().length === 0) {
    switch (key) {
      case 'fullname':
        key = 'full name'
        break
      case 'repassword':
        key = 'confirm password'
        break
    }

    return (error = `${capitalizedCase(key)} is required`)
  }

  switch (key) {
    case 'fullname':
      if (value.length < 5) error = 'Full Name must at least 5 chars'
      break
    case 'email':
      if (!validateEmail(value)) error = 'Invalid email'
      break
    case 'password':
      if (value.length < 6) error = 'Password must at least 6 chars'
      break
    case 'repassword':
      if (value !== password) error = 'Confirm Password incorrect'
      break
  }

  return error
}
