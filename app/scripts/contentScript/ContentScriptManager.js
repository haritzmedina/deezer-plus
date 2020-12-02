import _ from 'lodash'
import YoutubeSearch from './YoutubeSearch'

class ContentScriptManager {
  constructor () {
    this.events = {}
    this.status = ContentScriptManager.status.notInitialized
  }

  init () {
    console.debug('Initializing content script manager')
    this.status = ContentScriptManager.status.initializing
    // Load youtube search icon
    this.youtuberSearch = new YoutubeSearch()
    this.youtuberSearch.init()
    this.status = ContentScriptManager.status.initialized
    console.debug('Initializing content script manager')
  }

  destroy () {
    console.debug('Destroying content script manager')
    this.status = ContentScriptManager.status.notInitialized
    console.debug('Destroyed content script manager')
  }
}

ContentScriptManager.status = {
  initializing: 'initializing',
  initialized: 'initialized',
  notInitialized: 'notInitialized'
}

export default ContentScriptManager
