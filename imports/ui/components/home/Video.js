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
            allowFullScreen>
          </iframe>
        </div>
      </div>
    <div className="screenContainer">
      <div className="screen">
        <img src="/images/view.png" />
      </div>
      <div className="textPresentation">
        <p>
          <T>Home.textPresentation</T><br/><br/>
          <T>Home.textPresentationBis</T><br/><br/>
          <a href="https://play.google.com/store/apps/details?id=com.enzym_proto" target="_blank">
            <img src="/images/google_play.png" height="60" />
          </a><br/><br/>
          <T>Home.textPresentationBisBis</T><br/>
        </p>
      </div>
    </div>
  </div>

)
