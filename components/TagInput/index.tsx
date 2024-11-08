import React, { useEffect, useState } from "react"
import styles from "./TagInput.module.scss"

export type TagInputPropsType = {
  name: string
  disabled?: boolean
  value: string[]
  onChange: (e: any) => void
  placeholder?: string
  label?: string
  isRequired: boolean
}

const TagInput = ({
  name,
  disabled = false,
  value = [],
  onChange,
  placeholder = "",
  label = "",
  isRequired = false,
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
    <div className={styles.tagInput}>
      <label>
        {label}{" "}
        {isRequired && <span className={`${styles.isRequiredIcon}`}>*</span>}
      </label>
      <div className={styles.inputContainer}>
        <input
          name={name}
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.inputTag}
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
            <span
              className={`icon-close ${styles.close}`}
              onClick={handleRemoveTag(index)}
              tabIndex={0}
            ></span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagInput
