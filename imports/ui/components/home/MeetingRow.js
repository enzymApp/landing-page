import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'


i18n.addTranslations('fr', 'home.meet.title', 'Rencontrez')
i18n.addTranslations('en', 'home.meet.title', 'Meet')
const T = i18n.createComponent()

export default () => (
  <Row>
    <Col xs="6">
      <img src="/images/photo_rencontre.jpg" />
    </Col>
    <Col xs="6">
      <div className="rencontrez text_blocks">
        <h4><T>home.meet.title</T></h4>
        <p>Has autem provincias, quas Orontes ambiens amnis imosque pedes Cassii montis illius celsi praetermeans funditur in Parthenium mare, Gnaeus Pompeius superato Tigrane regnis Armeniorum abstractas dicioni Romanae coniunxit.<br/><br/>

Quae dum ita struuntur, indicatum est apud Tyrum indumentum regale textum occulte, incertum quo locante vel cuius usibus apparatum. ideoque rector provinciae tunc pater Apollinaris eiusdem nominis ut conscius ductus est aliique congregati sunt ex diversis civitatibus multi, qui atrocium criminum ponderibus urgebantur.
        </p>
      </div>
    </Col>
  </Row>
)
