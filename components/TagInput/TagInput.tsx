"use client"
import React, { useEffect, useState } from "react"

export type TagInputPropsType = {
  name: string
  disabled?: boolean
  value: string[]
  onChange: (e: any) => void
  placeholder?: string
  label?: string
  isRequired: boolean
  title?: string
}

export const TagInput = ({
  name,
  disabled = false,
  value = [],
  onChange,
  placeholder = "",
  label = "",
  isRequired = false,
  title,
}: TagInputPropsType) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [tags, setTags] = useState<string[]>(value)

  useEffect(() => {
    setTags(value || [])
  }, [value])

  const handleAddTag = () => {
    if (inputValue.trim()) {
      const updatedTags = [...tags, inputValue.trim()]
      setTags(updatedTags)
      setInputValue("")
      onChange({ [name]: updatedTags })
    }
  }

  const handleRemoveTag = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    const updatedTags = tags.filter((_, i) => i !== index)
    setTags(updatedTags)
    onChange({ [name]: updatedTags })
  }

  return (
    <div className='tagInput'>
      <label title={title || ""}>
        {label} {isRequired && <span className='isRequiredIcon'>*</span>}
      </label>
      <div className='inputContainer'>
        <input
          name={name}
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className='inputTag'
        />
        {inputValue && (
          <button onClick={handleAddTag} className='addButton'>
            ✓
          </button>
        )}
      </div>

      <div className='tagList'>
        {tags.map((tag, index) => (
          <div key={index} className='tagItem'>
            {tag}
            <span
              className={`icon-close close`}
              onClick={handleRemoveTag(index)}
              tabIndex={0}
            ></span>
          </div>
        ))}
      </div>
    </div>
  )
}
