import React from 'react'
import styled from 'styled-components'
import { useTheme } from '../src'

const ARROW_SIZE = '4px'

const Root = useTheme(styled.div``)

const Title = useTheme(styled.button`
  display: flex;
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;
  margin: 0;

  &:hover {
    color: ${p => p.$theme.link};

    > span {
      border-color: ${p => p.$theme.link};
    }
  }
`)

const Text = useTheme(styled.h1`
  display: inline-block;
`)

const IndicatorIcon = useTheme(styled.span`
  display: flex;
  margin: auto 8px;
  border: solid black;
  border-width: 0 ${ARROW_SIZE} ${ARROW_SIZE} 0;
  display: inline-block;
  padding: ${ARROW_SIZE};

  ${p =>
    p.isOpen ? `transform: rotate(45deg);` : `transform: rotate(135deg);`}
`)

const Content = useTheme(styled.div`
  padding: 0px 12px;
  background-image: linear-gradient(
    ${p => p.$theme.background200},
    ${p => p.$theme.background100}
  );
  max-height: ${p => (p.isOpen ? 'auto' : '0px')};
  min-height: ${p => (p.isOpen ? '100px' : '0px')};
  overflow: hidden;
`)

export class Section extends React.Component {
  constructor(props) {
    super(props)

    const { startOpen } = this.props

    this.state = {
      isOpen: startOpen || false,
    }
  }

  toggleOpen = () =>
    this.setState({
      isOpen: !this.state.isOpen,
    })

  render() {
    const { isOpen } = this.state
    const { title, children } = this.props

    return (
      <Root>
        <Title onClick={this.toggleOpen}>
          <Text>{title}</Text>
          <IndicatorIcon isOpen={isOpen} />
        </Title>
        <Content isOpen={isOpen}>{children}</Content>
      </Root>
    )
  }
}
