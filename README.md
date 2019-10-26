# react-hoc-theme

## Description

<!-- A description of what this package does. -->

This package provides you with a higher order component (HOC) that can be used to help enable consistent and easy theming across your project.

## Basic Usage

<!-- A basic example of how to use this package. Doesn't have to be proper code, just enough to show how to use it. -->

```js
import { useTheme } from 'react-hoc-theme'

// Later on in your code...
const Visual = ({ $theme }) => <div style={{ color: $theme.text }}>Sample</div>

const ThemedComponent = useTheme(Visual)

// The useTheme HOC works really well styled-components
import styled from 'styled-components'

const ThemedStyledComponent = useTheme(styled.div`
  background-color: ${p => p.$theme.background100};
  color: ${p => p.$theme.text};
`)
```

## Exports

### `useTheme(Component)`

Injects a `$theme` prop into the provided component that gives it access to the theme values. If any theme values are updated, the component will receive these updates.
The theme used will be determined by a value stored in local storage. If this value does not exist, it will use the default theme included in this package. The active theme can be changed at any time by calling the `setActiveTheme` function.

### `useContrastingText(backgroundColor)`

Given the background color text will be rendered on top of, the function will return the primary text color which provides the best contrast ratio between the text and background.

### `isDark(hexColor)`

Returns a boolean as to whether or not the color is on the dark side.

### `setActiveTheme(themeObj)`

Given a valid theme object (see [Theme Structure](#theme-structure)), this will attempt to set it as the active theme. If the current theme is the same type as the desired active theme, it will only update the theme if the new theme object is more recent (ie has a higher version). If the themes are different types, it will update the active theme regardless of version numbers.

## Theme Structure

[Example themes](https://github.com/jasondippel/react-hoc-theme/tree/master/src/config)

```js
{
  type: string,
  version: number,
  values: object,
}
```

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
