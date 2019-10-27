import React from 'react'
import PubSub from 'pubsub-js'
import { THEME_UPDATE_EVENT } from './config'
import {
  getActiveTheme,
  getDefaultTheme,
  getKnownThemeByType,
  setActiveTheme,
} from './utils'

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

const initialize = () => {
  const activeTheme = getActiveTheme()

  if (!!activeTheme) {
    const knownMatchingTheme = getKnownThemeByType(activeTheme.type)

    if (!knownMatchingTheme || typeof activeTheme.version !== 'number') return
    if (knownMatchingTheme.version <= activeTheme.version) {
      return
    }

    return setActiveTheme(knownMatchingTheme)
  }

  setActiveTheme(getDefaultTheme())
}

export const useTheme = Comp =>
  class extends React.Component {
    static displayName = `UseTheme(${getDisplayName(Comp)})`

    constructor(props) {
      super(props)
      initialize()
    }

    componentDidMount() {
      this.mount = true
      this.unsubscribeToken = PubSub.subscribe(
        THEME_UPDATE_EVENT,
        this.handleThemeUpdate,
      )
    }

    componentWillUnmount() {
      this.mount = false
      PubSub.unsubscribe(this.unsubscribeToken)
    }

    handleThemeUpdate = () => this.forceUpdate()

    render() {
      const themeObj = getActiveTheme() || {}
      return <Comp {...this.props} $theme={themeObj.values} />
    }
  }
