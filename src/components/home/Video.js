import React      from 'react'
import { FormattedMessage as T } from 'react-intl'


const Video = () => (
  <div className="video">
    <h2><T id="home.videoTitle" /></h2>
    <div className="videoContainer">
      <div className="videoWrapper">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/CUIr7w3d2Gs"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen />
      </div>
    </div>
  </div>
)

export default Video
