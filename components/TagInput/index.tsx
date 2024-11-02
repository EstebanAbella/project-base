import React, { useState } from "react"
import styles from "./TagInput.module.scss"

export type TagInputPropsType = {
  name: string
  disabled?: boolean
  value: string
  onChange?: (name: string, tags: string[]) => void
  placeholder?: string
}

const TagInput = ({
  name,
  disabled = false,
  value = "",
  onChange,
  placeholder = "",
}: TagInputPropsType) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [tags, setTags] = useState<string[]>(Array.isArray(value) ? value : [])

  const handleAddTag = () => {
    if (inputValue.trim()) {
      const updatedTags = [...tags, inputValue.trim()]
      setTags(updatedTags)
      setInputValue("")
      onChange && onChange(name, updatedTags)
    }
  }

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index)
    setTags(updatedTags)
    onChange && onChange(name, updatedTags)
  }

  return (
    <div className={styles.tagInput}>
      <div className={styles.inputContainer}>
        <input
          name={name}
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
        {inputValue && (
          <button onClick={handleAddTag} className={styles.addButton}>
            ✓
          </button>
        )}
      </div>

      <div className={styles.tagList}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tagItem}>
            {tag}
            <button
              onClick={() => handleRemoveTag(index)}
              className={styles.removeButton}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagInput
