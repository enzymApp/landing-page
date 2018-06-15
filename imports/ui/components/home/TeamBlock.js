import {Random}   from 'meteor/random'
import React      from 'react'
import Slider     from 'react-slick'
import {Row, Col} from 'reactstrap'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const settings = {
  dots:           true,
  infinite:       true,
  slidesToShow:   3,
  slidesToScroll: 3,
}
const settingsSmall = {
  ...settings,
  slidesToShow:   1,
  slidesToScroll: 1,
}
const slides = [
  {photoSrc: '/images/team_jeremy.jpg',  name: 'Jeremy',  job: 'CMO'},
  {photoSrc: '/images/team_alfred.jpg',  name: 'Alfred',  job: 'Artistic Director'},
  {photoSrc: '/images/team_sylvain.jpg', name: 'Sylvain', job: 'CTO'},
  {photoSrc: '/images/team_yannick.jpg', name: 'Yannick', job: 'CEO'},
  {photoSrc: '/images/team_octave.jpg',  name: 'Octave',  job: 'Writer'},
  {photoSrc: '/images/team_pauline.jpg', name: 'Pauline', job: 'Community Manager'},
  {photoSrc: '/images/team_pascal.jpg',  name: 'Pascal',  job: 'Full-stack developer'},
]
const orderedSlides = randomlyOrderedSlides(slides)

export default ({text}) => (
  <div className="team">
    <h2>{'L\'équipe'}</h2>
    <Slider {...settings} className="d-none d-md-block">
      {orderedSlides.map(({photoSrc, name, job}) => (
        <div className="slide" key={name}>
          <img src={photoSrc} />
          <p>
            {name}<br/>
            <span>{` - ${job} - `}</span>
          </p>
        </div>
      ))}
    </Slider>
    <Slider {...settingsSmall} className="d-block d-md-none">
      {orderedSlides.map(({photoSrc, name, job}) => (
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

function randomlyOrderedSlides(slides) {
  let i = 0
  const ids = new Array(slides.length).fill().map(() => i++)
  const ordered = []
  while(ordered.length < slides.length) {
    const id = Random.choice(ids)
    ids.splice(ids.indexOf(id), 1)
    ordered.push(slides[id])
  }
  return ordered
}
