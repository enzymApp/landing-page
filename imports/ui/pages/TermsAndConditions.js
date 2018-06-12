import React  from 'react'
import {Link} from 'react-router-dom'
import HomeContainer from './HomeContainer'
import Modal         from '../components/Modal'

export default () => (
  <div>
    <HomeContainer />
    <Modal title="Mentions légales" outRoute="/">
      <p>
        Le présent site est exploité par la société ENZYM, SAS au capital de 38 100€ immatriculée sous le numéro 830 854 618 au RCS de GRENOBLE dont le siège social est situé 8 C Avenue Pierre de Coubertin 38170 SEYSSINET PARISET et représentée par son Président Yannick Barnel.
      </p>
      <p>
        Notre Service Visiteurs se tient à votre disposition pour toute information nécessaire via le Chat disponible en bas et à droite de la page.
      </p>
      <p>
        Nous vous invitons également à consulter notre <Link to="/privacy">Politique de Confidentialité</Link> pour toutes précisions concernant le site et le concept d’Enzym.
      </p>
    </Modal>
  </div>
)
