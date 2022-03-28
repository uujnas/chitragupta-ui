import React from 'react'

const Card = ({ children, topic, description }) => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{ topic }</div>
        <p class="text-gray-700 text-base">
          { description }
        </p>
      </div>

      <div class="m-5">
        { children }
      </div>
    </div>
  )
}

export default Card