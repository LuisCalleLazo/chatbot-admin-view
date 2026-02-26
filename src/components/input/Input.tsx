import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, fullWidth = false, className = '', ...props }, ref) => {
    const hasError = !!error
    
    const containerClass = fullWidth ? 'w-full' : ''
    
    const inputBaseStyles = 'block w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const inputVariantStyles = hasError
      ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500 dark:focus:border-red-500'
      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500'
    
    const inputBgStyles = 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
    
    const inputPaddingStyles = leftIcon && rightIcon 
      ? 'pl-10 pr-10 py-2.5'
      : leftIcon 
      ? 'pl-10 pr-4 py-2.5'
      : rightIcon
      ? 'pl-4 pr-10 py-2.5'
      : 'px-4 py-2.5'
    
    return (
      <div className={containerClass}>
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`${inputBaseStyles} ${inputVariantStyles} ${inputBgStyles} ${inputPaddingStyles} ${className}`}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={`mt-1.5 text-sm ${hasError ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'