import {Random}   from 'meteor/random'
import React      from 'react'
import Slider     from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import T from '../Translator'

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
  {photoSrc: '/images/team_alfred.jpg',    name: 'Alfred',    job: 'Artistic Director'},
  {photoSrc: '/images/team_fred.jpg',      name: 'Frédéric',  job: 'Developer'},
  {photoSrc: '/images/team_guillaume.jpg', name: 'Guillaume', job: 'Community Manager'},
  {photoSrc: '/images/team_jeremy.jpg',    name: 'Jeremy',    job: 'CMO'},
  {photoSrc: '/images/team_kevin.jpg',     name: 'Kevin',     job: 'Community Manager'},
  {photoSrc: '/images/team_octave.jpg',    name: 'Octave',    job: 'Writer'},
  {photoSrc: '/images/team_pauline.jpg',   name: 'Pauline',   job: 'Community Manager'},
  {photoSrc: '/images/team_sophea.jpg',    name: 'Sophea',    job: 'UX Designer'},
  {photoSrc: '/images/team_sylvain.jpg',   name: 'Sylvain',   job: 'CTO'},
  {photoSrc: '/images/team_yannick.jpg',   name: 'Yannick',   job: 'CEO'},
]
const orderedSlides = randomlyOrderedSlides(slides)

export default ({text}) => (
  <div className="team">
    <div className="container">
      <h2><T>Home.team.title</T></h2>
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
