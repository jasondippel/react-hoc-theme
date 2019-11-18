import React from 'react'
import styled from 'styled-components'
import { useTheme } from '../../src'

const Root = useTheme(styled.div`
  display: flex;
  color: ${p => p.$theme`colors/${p.color}`};
  font-weight: 700;
`)

export const LargeText = ({ color, children }) => (
  <Root color={color}>{children}</Root>
)
