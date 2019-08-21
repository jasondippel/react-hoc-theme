import React from 'react'
import PubSub from 'pubsub-js'
import { VERSION, THEME_UPDATE_EVENT } from './config'
import { getTheme } from './utils'

const initialize = () => {
  if (!!window.$themeVersion && window.$themeVersion >= VERSION) return

  const sendUpdate = !!window.$themeVersion
  const theme = getTheme()

  window.$themeVersion = VERSION
  window.$theme = theme

  if (sendUpdate) PubSub.publish(THEME_UPDATE_EVENT)
}

export const useTheme = Comp =>
  class extends React.Component {
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
      return <Comp {...this.props} $theme={getTheme()} />
    }
  }
