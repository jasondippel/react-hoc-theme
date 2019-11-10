import React from 'react'
import PubSubPackage from 'pubsub-js'
import { THEME_UPDATE_EVENT } from './config'
import {
  initRootWindow,
  initPubSub,
  initTheme,
  getActiveTheme,
  getPubSub,
} from './utils'

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

const initialize = () => {
  initRootWindow()
  initPubSub(PubSubPackage)
  initTheme()
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
      const PubSub = getPubSub()
      this.unsubscribeToken = PubSub.subscribe(
        THEME_UPDATE_EVENT,
        this.handleThemeUpdate,
      )
    }

    componentWillUnmount() {
      this.mount = false
      const PubSub = getPubSub()
      PubSub.unsubscribe(this.unsubscribeToken)
    }

    handleThemeUpdate = () => this.forceUpdate()

    render() {
      const themeObj = getActiveTheme() || {}
      return <Comp {...this.props} $theme={themeObj.values} />
    }
  }
