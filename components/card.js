import React from 'react'

const Card = ({ children, topic, description }) => {
  return (
    <div className="max-w-sm overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{ topic }</div>
        <p className="text-base text-gray-700">
          { description }
        </p>
      </div>

      <div className="m-5">
        { children }
      </div>
    </div>
  )
}

export default Card