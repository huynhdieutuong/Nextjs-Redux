export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

export const capitalizedCase = (value: string): string => {
  const arrValue = value.trim().split(' ')
  return arrValue
    .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
    .join(' ')
}
