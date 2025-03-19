"use client"

import type React from "react"

interface CustomInputProps {
  icon?: React.ReactNode
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const CustomInput: React.FC<CustomInputProps> = ({ icon, placeholder, value, onChange, className }) => {
  return (
    <div
      className={`
        flex items-center w-full border border-gray-300 rounded-full overflow-hidden
        focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500
        ${className || ""}
      `}
    >
      {icon && <div className="pl-3">{icon}</div>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full py-2 px-3 outline-none text-gray-700 text-sm
          placeholder:text-gray-400
        "
      />
    </div>
  )
}

