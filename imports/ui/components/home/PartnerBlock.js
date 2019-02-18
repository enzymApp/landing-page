import {Random}   from 'meteor/random'
import React      from 'react'
import Slider     from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import T from '../Translator'

const settings = {
  dots:           true,
  infinite:       true,
  autoplaySpeed:  3000,
  autoplay : true,
  arrows:         false,
  slidesToShow:   6,
  slidesToScroll: 2,
}
const settingsSmall = {
  ...settings,
  slidesToShow:   2,
  slidesToScroll: 2,
}
const slides = [
  {photoSrc: '/images/b2expand.jpg',    name: 'B2Expand - Technical Advisor', link: 'http://b2expand.com'},
  {photoSrc: '/images/crypto-lyon.jpg',      name: 'Association Crypto-Lyon', link: 'https://www.crypto-lyon.fr'},
  {photoSrc: '/images/integre.jpg', name: 'Association Integre Grenoble', link: 'https://www.integre-grenoble.org'},
  {photoSrc: '/images/copain-abord.jpg',    name: 'Le Bar les Copains d\'Abord', link: 'https://www.facebook.com/lescopainsdabordofficiel/'},
  {photoSrc: '/images/explore.jpg',     name: 'La Page Instagram Explore Rhône-Alpes', link: 'https://www.instagram.com/explore_rhonealpes/?hl=fr'},
  {photoSrc: '/images/sos-apero.jpg',    name: 'Le Bar SOS Apéro', link: 'https://www.instagram.com/stories/grenoble.gaming/'},
  {photoSrc: '/images/grenoble-gaming.jpg',   name: 'La Page Instagram Grenoble Gaming', link: 'https://www.instagram.com/stories/grenoble.gaming/'},
  {photoSrc: '/images/corep.jpg',    name: 'L\'entreprise COREP Photocopie', link: 'https://www.corep.fr/agence/corep-grenoble-campus/'},
]

export default ({text}) => (
  <div className="team">
    <div className="container">
      <h2><T>Home.partner.title</T></h2>
      <Slider {...settings} className="d-none d-md-block">
        {slides.map(({photoSrc, name, link}) => (
          <div className="slide" key={name}>
            <a href={link} target="_blank"> <img src={photoSrc} /></a>
            <p>
              {name}<br/>
            </p>
          </div>
        ))}
      </Slider>
      <Slider {...settingsSmall} className="d-block d-md-none">
        {slides.map(({photoSrc, name, link}) => (
          <div className="slide" key={name}>
            <img src={photoSrc} />
            <p>
              {name}<br/>
            </p>
          </div>
        ))}
      </Slider>
    </div>
  </div>
)
