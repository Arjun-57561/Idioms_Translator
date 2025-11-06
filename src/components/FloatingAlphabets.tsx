export function FloatingAlphabets() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-gray-200 dark:text-gray-800 text-opacity-20 font-bold animate-pulse"
          style={{
            fontSize: Math.random() * 80 + 40 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
          }}
        >
          {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
        </div>
      ))}
    </div>
  );
}
