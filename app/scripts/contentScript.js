import ContentScriptManager from './contentScript/ContentScriptManager'
import _ from 'lodash'

if (_.isEmpty(window.deezerPlus)) {
  window.deezerPlus = {} // Global namespace for variables
  if (_.isEmpty(window.deezerPlus.contentScriptManager)) {
    window.deezerPlus.contentScriptManager = new ContentScriptManager()
  }
  if (window.deezerPlus.contentScriptManager.status === ContentScriptManager.status.notInitialized) {
    window.deezerPlus.contentScriptManager.init()
  }
}
