import React from 'react'

function Title({ text1, text2, centered = false, underlined = false, size = "lg" }) {
  // Size classes mapping
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl"
  };

  return (
    <div className={`${centered ? 'text-center' : ''} mb-8`}>
      <p className={`font-bold ${sizeClasses[size]} text-gray-800`}>
        {text1}
        {text2 }
        
      </p>
      {underlined && (
        <div className={`h-1 w-20 bg-blue-600 mt-2 ${centered ? 'mx-auto' : ''}`}></div>
      )}
    </div>
  )
}

export default Title