import React      from 'react'
import Slider     from 'react-slick'
import {Row, Col} from 'reactstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const settings = {
  dots:         true,
  infinite:     true,
  slidesToShow: 3,
}
const slides = [
  {photoSrc: '/images/team_jeremy.jpg',  name: 'Jeremy',  job: 'Chasseur-cueilleur'},
  {photoSrc: '/images/team_alfred.jpg',  name: 'Alfred',  job: 'Chasseur-cueilleur'},
  {photoSrc: '/images/team_sylvain.jpg', name: 'Sylvain', job: 'Chasseur-cueilleur'},
  {photoSrc: '/images/team_yannick.jpg', name: 'Yannick', job: 'Chasseur-cueilleur'},
  {photoSrc: '/images/team_octave.jpg',  name: 'Octave',  job: 'Chasseur-cueilleur'},
  {photoSrc: '/images/team_pauline.jpg', name: 'Pauline', job: 'Chasseur-cueilleur'},
  {photoSrc: '/images/team_pascal.jpg',  name: 'Pascal',  job: 'Chasseur-cueilleur'},
]

export default ({text}) => (
  <div className="team">
    <h2>{'L\'équipe'}</h2>
    <Slider {...settings}>
      {slides.map(({photoSrc, name, job}) => (
        <div className="slide" key={name}>
          <img src={photoSrc} />
          <p>
            {name}<br/>
            <span>{` - ${job} - `}</span>
          </p>
        </div>
      ))}
    </Slider>
  </div>
)
