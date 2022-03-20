import React, { FC } from 'react'

interface ButtonType {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  isLoading?: boolean
  disabled?: boolean
  colorStroke?: string
  onClick?: () => void
}

const Button: FC<ButtonType> = ({
  type,
  className,
  isLoading,
  disabled,
  colorStroke,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='1em'
          height='1em'
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid'
        >
          <circle
            cx={50}
            cy={50}
            fill='none'
            stroke={colorStroke}
            strokeWidth={10}
            r={35}
            strokeDasharray='164.93361431346415 56.97787143782138'
            transform='rotate(238.877 50 50)'
          >
            <animateTransform
              attributeName='transform'
              type='rotate'
              repeatCount='indefinite'
              dur='1s'
              values='0 50 50;360 50 50'
              keyTimes='0;1'
            />
          </circle>
        </svg>
      ) : (
        children
      )}
    </button>
  )
}

Button.defaultProps = {
  colorStroke: '#000',
  type: 'button',
}

export default Button
