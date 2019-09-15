import React from 'react'
import styled from 'styled-components'
import { useTheme } from '../../src'

const Root = useTheme(styled.div`
  display: flex;
  color: ${p => p.$theme[p.color]};
  font-weight: 400;
`)

export const NormalText = ({ color, children }) => (
  <Root color={color}>{children}</Root>
)
