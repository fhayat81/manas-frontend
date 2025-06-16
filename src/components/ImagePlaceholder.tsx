interface ImagePlaceholderProps {
  title: string;
  className?: string;
}

export default function ImagePlaceholder({ title, className = "" }: ImagePlaceholderProps) {
  return (
    <div className={`flex items-center justify-center h-full text-indigo-600 text-lg font-bold bg-gradient-to-br from-indigo-50 to-indigo-100 ${className}`}>
      <div className="text-center">
        <div className="text-4xl mb-2">📸</div>
        <div className="text-sm">{title}</div>
      </div>
    </div>
  );
} 