export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full opacity-20 animate-pulse" />
        <div className="absolute inset-2 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full opacity-10 animate-pulse" />
        <div className="absolute inset-4 border-2 border-transparent border-t-cyan-500 border-r-blue-600 rounded-full animate-spin" />
      </div>
      <p className="text-muted-foreground text-sm">Generating explanations...</p>
    </div>
  )
}
