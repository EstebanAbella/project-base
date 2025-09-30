"use client"
import React, { useEffect } from "react"

export type StepPropsType = {
  active: boolean
  title: string
  percentage: string
  type: string
}

export const Step = ({
  active = false,
  title,
  percentage,
  type,
}: StepPropsType) => {
  useEffect(() => {
    const elementPercentage = document.querySelector<HTMLElement>(
      `.percentageDynamic-${type}`
    )
    if (!elementPercentage) return
    elementPercentage.style.setProperty("width", `${percentage}%`)
  }, [percentage])

  return (
    <section className={`step ${active ? "show" : ""}`}>
      <h1 className='titleSteps'>{title}</h1>

      <div className='progress'>
        <span className={`percentageDynamic-${type}`}></span>
      </div>

      <p className='percentageSteps'>{percentage}%</p>
    </section>
  )
}
