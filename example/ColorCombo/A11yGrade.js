import React from 'react'
import styled from 'styled-components'
import { useTheme } from '../../src'
import { CheckCircleFilled } from './CheckCircleFilled'
import { CrossCircleFilled } from './CrossCircleFilled'
import { contrast } from '../utils'

export const NORMAL = 'normal' // 4.5:1
export const LARGE = 'large' // 3:1

const a11yMinimums = {
  [NORMAL]: 4.5,
  [LARGE]: 3,
}

const Root = styled.div`
  margin-left: 8px;
`

export const A11yGrade = useTheme(({ $theme, background, color, type }) => {
  const contrastVal = contrast(
    $theme(`colors/${background}`),
    $theme(`colors/${color}`),
  )
  const pass = contrastVal >= a11yMinimums[type]
  return (
    <Root>
      {pass ? (
        <CheckCircleFilled fill={$theme`colors/success`} />
      ) : (
        <CrossCircleFilled fill={$theme`colors/error`} />
      )}
    </Root>
  )
})
