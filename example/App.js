import React from 'react'
import styled from 'styled-components'
import { useTheme, useContrastingText } from '../src'

const Root = useTheme(styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${p => p.$theme.background100};
  color: ${useContrastingText(p => p.$theme.background100)};
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
`)

const Title = useTheme(styled.h1``)

const Link = useTheme(styled.a`
  color: ${p => p.$theme.link};
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`)

const Content = useTheme(styled.p`
  margin-top: 15px;
`)

export const App = () => (
  <Root>
    <Title>
      Demo of{' '}
      <Link
        href="https://github.com/jasondippel/react-hoc-theme"
        target="_blank"
        rel="noreferrer noopener"
      >
        react-hoc-theme
      </Link>
    </Title>
    <Content>
      This is a very basic example of how this HOC can be used. You will get the
      most out of this by looking at{' '}
      <Link href="./App.js" target="_blank" rel="noreferrer noopener">
        the source code
      </Link>
      .
    </Content>
  </Root>
)
