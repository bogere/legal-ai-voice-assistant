// src/components/ui/textarea.tsx
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm" {...props} />;
}
