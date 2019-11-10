import React from 'react'
import styled from 'styled-components'
import { useTheme, useContrastingText } from '../../src'

const CIRCLE_SIZE = 50
const SWATCH_WIDTH = 200

const Root = styled.div`
  display: inline-flex;
  margin-bottom: 25px;
  margin-right: 20px;
  width: ${SWATCH_WIDTH}px;
`

const Circle = useTheme(styled.div`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  min-width: ${CIRCLE_SIZE}px;
  min-height: ${CIRCLE_SIZE}px;
  border-radius: 50%;
  background-color: ${p => p.color};
  border: 1px solid ${p => p.$theme.keyline};
  margin-right: 15px;
`)

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`

const Title = useTheme(styled.h2`
  font-size: 16px;
  color: ${p => useContrastingText(p.$theme.background100)};
  margin: 0px;
`)

const Metadata = useTheme(styled.p`
  color: ${p => p.$theme.textMeta};
  margin: 0px;
  text-transform: uppercase;
`)

export const ColorSwatch = ({ color, text }) => (
  <Root>
    <Circle color={color} />
    <Description>
      <Title>{text}</Title>
      <Metadata>{color}</Metadata>
    </Description>
  </Root>
)
