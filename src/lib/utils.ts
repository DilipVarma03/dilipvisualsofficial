import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateId(prefix: string): string {
  const year = new Date().getFullYear();
  const randomStr = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomStr}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'TBD';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'In Progress':
      return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
    case 'Review':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    case 'Revision':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    case 'Awaiting Approval':
    case 'Quotation Sent':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    case 'Payment Pending':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    case 'Cancelled':
      return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    case 'new':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'contacted':
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    case 'in_discussion':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'converted':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    case 'archived':
      return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    default:
      return 'bg-zinc-800/80 text-zinc-300 border-zinc-700';
  }
}
