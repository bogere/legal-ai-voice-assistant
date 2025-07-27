import * as React from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, variant = 'default', size = 'base', ...props }: any) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-colors';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  };
  return <button className={cn(base, variants[variant], className)} {...props} />;
}