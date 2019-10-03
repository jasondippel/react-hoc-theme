import React from 'react'
import styled from 'styled-components'
import { useTheme, setActiveTheme, LIGHT_THEME, DARK_THEME } from '../src'

window.setActiveTheme = setActiveTheme
window.LIGHT_THEME = LIGHT_THEME
window.DARK_THEME = DARK_THEME

import { Section } from './Section'
import { SubSection } from './SubSection'
import { ColorSwatch } from './ColorSwatch'
import { ColorCombo } from './ColorCombo'

const COLOR_SECTIONS = {
  Text: ['text', 'textInverse', 'textMeta', 'textDisabled', 'link'],
  Background: [
    'background100',
    'background200',
    'background300',
    'background400',
    'background500',
    'background600',
    'keyline',
  ],
  Primary: ['primary', 'primaryAccent', 'primaryBackground'],
  Success: ['success', 'successAccent', 'successBackground'],
  Warning: ['warning', 'warningAccent', 'warningBackground'],
  Error: ['error', 'errorAccent', 'errorBackground'],
}

const Root = useTheme(styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 12px;
  background-color: ${p => p.$theme.background100};
  color: ${p => p.$theme.text};
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

const Content = useTheme(styled.div`
  margin: 0px 8px;
`)

const SectionTitle = useTheme(styled.h2`
  border-bottom: 1px solid ${p => p.$theme.keyline};
`)

const Group = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const App = useTheme(({ $theme }) => (
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
      <Section title={'Details'}>TODO: README contents go here...</Section>
      <Section title={'Color Swatches'}>
        {Object.keys(COLOR_SECTIONS).map(s => (
          <React.Fragment key={`${s}_fragment`}>
            <SectionTitle key={s}>{s}</SectionTitle>
            {COLOR_SECTIONS[s].map(k => {
              const key = `${k}_${$theme[k]}`
              return <ColorSwatch color={$theme[k]} text={k} key={key} />
            })}
          </React.Fragment>
        ))}
      </Section>
      <Section title={'Color Combinations and Accessibility'}>
        <SubSection title={'Text Variations on Standard Backgrounds'}>
          <Group>
            <ColorCombo color={'text'} background={'background100'} />
            <ColorCombo color={'text'} background={'background200'} />
            <ColorCombo color={'text'} background={'background300'} />
            <ColorCombo color={'text'} background={'background400'} />
            <ColorCombo color={'text'} background={'background500'} />
            <ColorCombo color={'textInverse'} background={'background600'} />
          </Group>
          <Group>
            <ColorCombo color={'textMeta'} background={'background100'} />
            <ColorCombo color={'textMeta'} background={'background200'} />
            <ColorCombo color={'textMeta'} background={'background300'} />
            <ColorCombo color={'textMeta'} background={'background400'} />
            <ColorCombo color={'textMeta'} background={'background500'} />
            <ColorCombo color={'textMeta'} background={'background600'} />
          </Group>
          <Group>
            <ColorCombo color={'textDisabled'} background={'background100'} />
            <ColorCombo color={'textDisabled'} background={'background200'} />
            <ColorCombo color={'textDisabled'} background={'background300'} />
            <ColorCombo color={'textDisabled'} background={'background400'} />
            <ColorCombo color={'textDisabled'} background={'background500'} />
            <ColorCombo color={'textDisabled'} background={'background600'} />
          </Group>
          <Group>
            <ColorCombo color={'link'} background={'background100'} />
            <ColorCombo color={'link'} background={'background200'} />
            <ColorCombo color={'link'} background={'background300'} />
            <ColorCombo color={'link'} background={'background400'} />
            <ColorCombo color={'link'} background={'background500'} />
            <ColorCombo color={'link'} background={'background600'} />
          </Group>
        </SubSection>
        <SubSection title={'Primary Color Uses'}>
          <Group>
            <ColorCombo color={'text'} background={'primary'} />
            <ColorCombo color={'textInverse'} background={'primary'} />
            <ColorCombo color={'text'} background={'primaryAccent'} />
            <ColorCombo color={'text'} background={'primaryBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'textMeta'} background={'primary'} />
            <ColorCombo color={'textMeta'} background={'primaryAccent'} />
            <ColorCombo color={'textMeta'} background={'primaryBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'textDisabled'} background={'primary'} />
            <ColorCombo color={'textDisabled'} background={'primaryAccent'} />
            <ColorCombo
              color={'textDisabled'}
              background={'primaryBackground'}
            />
          </Group>
          <Group>
            <ColorCombo color={'link'} background={'primary'} />
            <ColorCombo color={'link'} background={'primaryAccent'} />
            <ColorCombo color={'link'} background={'primaryBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'primary'} background={'background100'} />
            <ColorCombo color={'primary'} background={'background200'} />
            <ColorCombo color={'primary'} background={'background300'} />
            <ColorCombo color={'primary'} background={'background400'} />
            <ColorCombo color={'primary'} background={'background500'} />
            <ColorCombo color={'primary'} background={'background600'} />
          </Group>
        </SubSection>
        <SubSection title={'Success Color Uses'}>
          <Group>
            <ColorCombo color={'text'} background={'success'} />
            <ColorCombo color={'textInverse'} background={'success'} />
            <ColorCombo color={'text'} background={'successAccent'} />
            <ColorCombo color={'text'} background={'successBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'textMeta'} background={'success'} />
            <ColorCombo color={'textMeta'} background={'successAccent'} />
            <ColorCombo color={'textMeta'} background={'successBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'textDisabled'} background={'success'} />
            <ColorCombo color={'textDisabled'} background={'successAccent'} />
            <ColorCombo
              color={'textDisabled'}
              background={'successBackground'}
            />
          </Group>
          <Group>
            <ColorCombo color={'link'} background={'success'} />
            <ColorCombo color={'link'} background={'successAccent'} />
            <ColorCombo color={'link'} background={'successBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'success'} background={'background100'} />
            <ColorCombo color={'success'} background={'background200'} />
            <ColorCombo color={'success'} background={'background300'} />
            <ColorCombo color={'success'} background={'background400'} />
            <ColorCombo color={'success'} background={'background500'} />
            <ColorCombo color={'success'} background={'background600'} />
          </Group>
        </SubSection>
        <SubSection title={'Warning Color Uses'}>
          <Group>
            <ColorCombo color={'text'} background={'warning'} />
            <ColorCombo color={'textInverse'} background={'warning'} />
            <ColorCombo color={'text'} background={'warningAccent'} />
            <ColorCombo color={'text'} background={'warningBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'textMeta'} background={'warning'} />
            <ColorCombo color={'textMeta'} background={'warningAccent'} />
            <ColorCombo color={'textMeta'} background={'warningBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'textDisabled'} background={'warning'} />
            <ColorCombo color={'textDisabled'} background={'warningAccent'} />
            <ColorCombo
              color={'textDisabled'}
              background={'warningBackground'}
            />
          </Group>
          <Group>
            <ColorCombo color={'link'} background={'warning'} />
            <ColorCombo color={'link'} background={'warningAccent'} />
            <ColorCombo color={'link'} background={'warningBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'warning'} background={'background100'} />
            <ColorCombo color={'warning'} background={'background200'} />
            <ColorCombo color={'warning'} background={'background300'} />
            <ColorCombo color={'warning'} background={'background400'} />
            <ColorCombo color={'warning'} background={'background500'} />
            <ColorCombo color={'warning'} background={'background600'} />
          </Group>
        </SubSection>
        <SubSection title={'Error Color Uses'}>
          <Group>
            <ColorCombo color={'text'} background={'error'} />
            <ColorCombo color={'textInverse'} background={'error'} />
            <ColorCombo color={'text'} background={'errorAccent'} />
            <ColorCombo color={'text'} background={'errorBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'textMeta'} background={'error'} />
            <ColorCombo color={'textMeta'} background={'errorAccent'} />
            <ColorCombo color={'textMeta'} background={'errorBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'textDisabled'} background={'error'} />
            <ColorCombo color={'textDisabled'} background={'errorAccent'} />
            <ColorCombo color={'textDisabled'} background={'errorBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'link'} background={'error'} />
            <ColorCombo color={'link'} background={'errorAccent'} />
            <ColorCombo color={'link'} background={'errorBackground'} />
          </Group>
          <Group>
            <ColorCombo color={'error'} background={'background100'} />
            <ColorCombo color={'error'} background={'background200'} />
            <ColorCombo color={'error'} background={'background300'} />
            <ColorCombo color={'error'} background={'background400'} />
            <ColorCombo color={'error'} background={'background500'} />
            <ColorCombo color={'error'} background={'background600'} />
          </Group>
        </SubSection>
      </Section>
    </Content>
  </Root>
))
