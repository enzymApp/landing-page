import React from 'react'
import {Row, Col} from 'reactstrap'
import T              from '../components/Translator'

export default class Header extends React.Component {

  constructor(){
    super();
    this.state ={
      video:false
    }
  }

  toggleVideo(){
    this.setState({
      video: true
    });
    console.log('toggle button handler: '+ this.state.video);
  }

  render() {
    return (
      <div className="background-img-video-ico">

          {this.state.video ?
            <Row>
              <div class="videoWrapper-ico">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/CUIr7w3d2Gs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </Row>
            :
            <Row id="video-ico">
              <div className="center">
                <a href="Javascript:void(0);"><img src="/images/play-ico.png" className="play" onClick={()=>this.toggleVideo()}/></a>
              </div>
            </Row>
          }

      </div>
    )
  }
}
