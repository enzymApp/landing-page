import React      from 'react'
import T from '../Translator'


export default () => (
  <div className="video">
    <h2><T>Home.videotitle</T></h2>
    <div className="screenContainer">
      <div className="screen">
        <img src="/images/view.png" />
      </div>
      <div className="textPresentation">
        <p><T>Home.textpresentation</T><br/><br/><T>Home.textpresentationbis</T></p>
      </div>
    </div>
    <div className="videoContainer">
    <div className="videoWrapper">
      <T _translateProps={['src']}>
        <iframe width="560" height="315" src="Home.video" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      </T>
    </div>
    </div>
  </div>

)
