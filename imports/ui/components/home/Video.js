import React      from 'react'
import T from '../Translator'


export default () => (
  <div className="video">
    <h2><T>Home.videoTitle</T></h2>
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
