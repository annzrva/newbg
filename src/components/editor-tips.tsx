export function EditorTips() {
  return (
    <div className="absolute right-4 top-20 bg-white/95 p-4 rounded-lg shadow-lg z-20 border border-gray-100">
      <h3 className="font-medium text-sm mb-3 text-gray-700">Quick Tips</h3>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="bg-gray-100 p-1 rounded">🖱️</span>
        <span>Drag to move & resize</span>
      </div>
    </div>
  )
} 