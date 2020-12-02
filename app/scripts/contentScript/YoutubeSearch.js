import _ from 'lodash'

class YoutubeSearch {
  /**
   * Init function for YoutubeSearch
   */
  init () {
    this.interval = setInterval(() => {
      try {
        // Get artist name and song name
        this.songTitle = this.getPlayingSongTitle()
        this.artistName = this.getPlayingArtistName()
        let youtubeSearchURL = this.composeYoutubeSearchUrl({ artistName: this.artistName, songTitle: this.songTitle })
        this.addYoutubeSearchButtonInPlayer({ url: youtubeSearchURL })
      } catch (e) {
        // Remove youtube search button from player
        let youtubeSearchButton = document.querySelector('#youtubeSearchButton')
        youtubeSearchButton.parentElement.removeChild(youtubeSearchButton)
      }
    }, 1000)
  }

  /**
   * Retrieve from deezer player the current playing artist name
   * @returns String
   */
  getPlayingArtistName () {
    return document.querySelector('#page_player > div > div.player-track > div > div.track-heading > div.track-title > div > div > div > a:nth-child(2)').innerText
  }

  /**
   * Retrieve from deezer player the current playing song name
   * @returns String
   */
  getPlayingSongTitle () {
    return document.querySelector('#page_player > div > div.player-track > div > div.track-heading > div.track-title > div > div > div > a:nth-child(1)').innerText
  }

  /**
   * Giving song metadata generates a URL with the search of the song on youtube
   * @param artistName
   * @param songTitle
   * @returns {string}
   */
  composeYoutubeSearchUrl ({ artistName, songTitle }) {
    return 'https://www.youtube.com/results?search_query=' + songTitle.replaceAll(' ', '+') + '+' + artistName.replaceAll(' ', '+')
  }

  /**
   * Add youtube search button
   * @param url
   */
  addYoutubeSearchButtonInPlayer ({ url }) {
    let youtubeSearchButton = document.querySelector('#youtubeSearchButton')
    if (!_.isElement(youtubeSearchButton)) {
      let playerIconsContainer = document.querySelector('#page_player > div > div.player-track > div > div.track-heading > div.track-actions > ul')
      let li = document.createElement('li')
      li.setAttribute('id', 'youtubeSearchButton')
      li.setAttribute('title', chrome.i18n.getMessage('searchInYoutube'))
      li.className = 'svg-icon-group-item'
      let button = document.createElement('button')
      button.className = 'svg-icon-group-btn'
      button.type = 'button'
      button.setAttribute('aria-label', chrome.i18n.getMessage('searchInYoutube'))
      button.innerHTML = '<img class="svg-icon svg-icon-love-outline is-active" src="' + chrome.extension.getURL('images/youtube.png') + '"/>'
      button.dataset.url = url
      button.addEventListener('click', (e) => {
        window.open(document.querySelector('#youtubeSearchButton').dataset.url)
      })
      li.appendChild(button)
      playerIconsContainer.appendChild(li)
    } else {
      youtubeSearchButton.dataset.url = url
    }
  }

  /**
   * Destroy function for YoutubeSearch
   */
  destroy () {
    clearInterval(this.interval)
  }
}

export default YoutubeSearch
