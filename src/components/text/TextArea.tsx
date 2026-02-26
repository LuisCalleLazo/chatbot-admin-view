import { forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    const hasError = !!error
    
    const containerClass = fullWidth ? 'w-full' : ''
    
    const textareaBaseStyles = 'block w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-none'
    
    const textareaVariantStyles = hasError
      ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500 dark:focus:border-red-500'
      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500'
    
    const textareaBgStyles = 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
    
    return (
      <div className={containerClass}>
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`${textareaBaseStyles} ${textareaVariantStyles} ${textareaBgStyles} px-4 py-2.5 ${className}`}
          {...props}
        />
        
        {(error || helperText) && (
          <p className={`mt-1.5 text-sm ${hasError ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'