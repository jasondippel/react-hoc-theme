# react-hoc-theme

> NOTE: The documentation of this package is still in progress, as is it's development

## Description

<!-- A description of what this package does. -->

This package provides you with a higher order component (HOC) that can be used to help enable consistent and easy theming across your project.

## Basic Usage

<!-- A basic example of how to use this package. Doesn't have to be proper code, just enough to show how to use it. -->

```js
import { useTheme, useContrastingText } from 'react-hoc-theme'

// Later on in your code...
const ThemedComponent = useTheme(Visual)

const Visual = ({ $theme }) => <div style={{ color: $theme.text }}>Sample</div>

// The useTheme HOC works really well styled-components
import styled from 'styled-components'

const ThemedStyledComponent = useTheme(styled.div`
  background-color: ${p => p.$theme.background100};
  color: ${p => useContrastingText(p.$theme.background100)};
`)
```

## Exports

### `useTheme(Component)`

TODO: add description...

### `useContrastingText(backgroundColor)`

TODO: add description...

### `isDark(hexColor)`

TODO: add description...

### `getTheme()`

TODO: add description...

### `updateTheme(key, value)`

TODO: add description...

## Theme Structure

TODO: add description...

## Known Issues

<!-- Are there any current issues with this component? -->

There are no known issues at this time.

## Running the Example

```bash
$ git clone https://github.com/jasondippel/react-hoc-theme.git
$ cd react-hoc-theme
$ yarn install
$ yarn start-demo
```
