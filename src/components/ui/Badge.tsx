import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'category' | 'condition' | 'featured' | 'status' | 'default'
  children: React.ReactNode
  className?: string
}

const variantClasses = {
  category: 'bg-blue-100 text-blue-800',
  condition: 'bg-gray-100 text-gray-700',
  featured: 'bg-amber-100 text-amber-800',
  status: 'bg-green-100 text-green-800',
  default: 'bg-gray-100 text-gray-700',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
