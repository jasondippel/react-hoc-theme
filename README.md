# react-hoc-theme

## Description

<!-- A description of what this package does. -->

This package provides you with a higher order component (HOC) that can be used to help enable consistent and easy theming across your project.

## Basic Usage

<!-- A basic example of how to use this package. Doesn't have to be proper code, just enough to show how to use it. -->

```js
import { useTheme } from 'react-hoc-theme'

// Later on in your code...
const Visual = ({ $theme }) => (
  <div style={{ color: $theme`colors/text` }}>Sample</div>
)
const ThemedComponent = useTheme(Visual)

// The useTheme HOC works really well styled-components
import styled from 'styled-components'

const ThemedStyledComponent = useTheme(styled.div`
  background-color: ${p => p.$theme`colors/background100`};
  color: ${p => p.$theme(`colors/text`)};
`)
```

## Exports

### `useTheme(Component)`

Injects a `$theme` prop into the provided component that gives it access to the theme values. `$theme` is a function that can be called as a standard function (ex `$theme('colors/text')`) or as a [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). If any theme values are updated, the component will receive these updates.
The theme used will be determined by a value stored in local storage. If this value does not exist, it will use the default theme included in this package. The active theme can be changed at any time by calling the `setActiveTheme` function.

### `useContrastingText(backgroundColor)`

Given the background color text will be rendered on top of, the function will return the primary text color which provides the best contrast ratio between the text and background.

### `isDark(hexColor)`

Returns a boolean as to whether or not the color is on the dark side.

### `setActiveTheme(themeObj)`

Given a valid theme object (see [Theme Structure](#theme-structure)), this will attempt to set it as the active theme. If the current theme is the same type as the desired active theme, it will only update the theme if the new theme object is more recent (ie has a higher version). If the themes are different types, it will update the active theme regardless of version numbers.
The active theme type is stored in local storage. This enables the same theme to be used the next time the page loads.

### `getActiveTheme()`

Returns the active theme object.

### `LIGHT_THEME`, `DARK_THEME`, `DEFAULT_THEME`

Predefined themes available for use.

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

- NPM package contains more than what's necessary

## Running the Example

```bash
$ git clone https://github.com/jasondippel/react-hoc-theme.git
$ cd react-hoc-theme
$ yarn install
$ yarn start-demo
```
