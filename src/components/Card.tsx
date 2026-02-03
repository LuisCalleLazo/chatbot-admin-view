import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'md',
  className = '', 
  ...props 
}: CardProps) => {
  const baseStyles = 'rounded-xl bg-white dark:bg-slate-800 transition-all duration-200'
  
  const variants = {
    default: 'border border-slate-200 dark:border-slate-700',
    bordered: 'border-2 border-slate-200 dark:border-slate-700',
    elevated: 'shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-800',
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`} {...props}>
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardHeader = ({ children, className = '', ...props }: CardHeaderProps) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export const CardTitle = ({ children, className = '', ...props }: CardTitleProps) => {
  return (
    <h3 className={`text-lg font-semibold text-slate-900 dark:text-slate-100 ${className}`} {...props}>
      {children}
    </h3>
  )
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export const CardDescription = ({ children, className = '', ...props }: CardDescriptionProps) => {
  return (
    <p className={`text-sm text-slate-600 dark:text-slate-400 mt-1 ${className}`} {...props}>
      {children}
    </p>
  )
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardContent = ({ children, className = '', ...props }: CardContentProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardFooter = ({ children, className = '', ...props }: CardFooterProps) => {
  return (
    <div className={`mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 ${className}`} {...props}>
      {children}
    </div>
  )
}