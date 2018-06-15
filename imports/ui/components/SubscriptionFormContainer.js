import React          from 'react'
import {Form,
        FormGroup,
        FormFeedback,
        Input,
        Label,
        Col}          from 'reactstrap'
import {withRouter}   from 'react-router'
import {Experiment,
        Variant,
        emitter}      from '@enzymapp/react-ab-test'
import {analytics}    from 'meteor/okgrow:analytics'
import i18n           from 'meteor/universe:i18n'
import Button         from './Button'
import UserPageForm   from './UserPageForm'
import SocialLogin    from './SocialLogin'

const HOME_SOCIAL_LOGIN = ['Facebook', 'Google', 'Twitter']
const RECAPTCHA_KEY = Meteor.settings.public.recaptchaKey
const T = i18n.createComponent()

class SubscriptionFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted:  false,
      email:      '',
    }
    this.LANG = i18n.getLocale()
    this.BUTTON_TEST = `${this.LANG}-mainButton`
    this.TEASER_TEST = `${this.LANG}-teaser`
    emitter.defineVariants(this.BUTTON_TEST, ['A', 'B'])
    emitter.defineVariants(this.TEASER_TEST, ['FAUX_PROFILS', 'JOUE', 'JOUER_SEUL', 'BAVARDAGES', 'VOL_DONNÉES', 'JEU_LOCAL'])
  }
  componentWillMount() {
    this.loadCaptchaReady()
    emitter.addPlayListener((experimentName, variantName) => {
      analytics.track(`${this.LANG}-${experimentName}`, {
        category: 'AB testing',
        label:    variantName,
        value:    1,
      })
    })
    emitter.addWinListener((experimentName, variantName) => {
      analytics.track(`${this.LANG}-${experimentName}-win`, {
        category: 'AB testing',
        label:    variantName,
        value:    1,
      })
    })
  }
  render() {
    const {submitted, userPageForm} = this.state
    if(userPageForm) return <UserPageForm />
    return (
      <div id="top_bloc">
        <h3 id="accroche" align="center">
          <Experiment name={this.TEASER_TEST}>
            <Variant name="FAUX_PROFILS">Tu en as marre des faux profils sur les réseaux sociaux ?</Variant>
            <Variant name="JOUE">Joue sur ton smartphone pour rencontrer des inconnus dans le monde réel</Variant>
            <Variant name="JOUER_SEUL">Tu en as marre de jouer tout seul sur ton téléphone ?</Variant>
            <Variant name="BAVARDAGES">Recontruisez une société de partages et de bavardages !</Variant>
            <Variant name="VOL_DONNÉES">Ras-le-bol de te faire voler tes données sur les réseaux sociaux ?</Variant>
            <Variant name="JEU_LOCAL">Rejoins le premier Jeu qui se vit près de chez soi !</Variant>
          </Experiment>
        </h3>
        <h4 id="accrochebis" align="center">
          <Experiment name={this.TEASER_TEST}>
            <Variant name="FAUX_PROFILS">Rejoins Enzym, le jeu qui te fait sortir près de chez toi</Variant>
            <Variant name="JOUE">Rejoins Enzym, le réseau social pour sortir avec ses potes et faire de nouvelles rencontres</Variant>
              <Variant name="JOUER_SEUL">Rejoins Enzym, le jeu qui te fait rencontrer du monde</Variant>
              <Variant name="BAVARDAGES">Enzym, l'application qui invite à la rencontre en bas de chez soi</Variant>
              <Variant name="VOL_DONNÉES">Rejoins Enzym, le Jeu local qui décentralise et protège tes données</Variant>
              <Variant name="JEU_LOCAL">Du virtuel au réel, Enzym revisite l'art de la rencontre</Variant>
          </Experiment>
        </h4>
        <div className="social_logins">
          {HOME_SOCIAL_LOGIN.map(name => <SocialLogin {...{name}} key={name} />)}<br/>
          <a role="button" tabIndex="0" onClick={this.showUserPageForm()}>Déjà inscrit ?</a>
        </div>
        {!submitted &&
          <Form onSubmit={this.handleSubmit()}>
            <FormGroup row>
              <div className="top_form">
                  <Input
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange('email')}
                  />
                  <FormFeedback>Adresse e-mail incorrecte</FormFeedback>
                  <Button type="submit">
                    <Experiment name={this.BUTTON_TEST}>
                      <Variant name="A">Participer !</Variant>
                      <Variant name="B">Rejoins-nous !</Variant>
                    </Experiment>
                  </Button>
                </div>
            </FormGroup>
          </Form>
        }
        {submitted &&
          <div className="texte_valider_email">
            Nous t'avons envoyé un e-mail pour valider ton adresse.
            Dès que tu auras cliqué sur le lien qu'il contient tu pourras participer au concours de parrainage.
          </div>
        }
      </div>
    )
  }
  loadCaptchaReady() {
    if(!window.grecaptcha) return
    if(this.recaptchaReady) return
    grecaptcha.ready(() => {
      this.recaptchaReady = true
      grecaptcha.execute(RECAPTCHA_KEY, {action: 'signUp'})
      .then((token) => {
        this.recaptchaToken = token
      })
    })
  }
  showUserPageForm = () => () => {
    this.setState({userPageForm: true})
  }
  handleChange = (key) => (event) => {
    const value = event.target.value
    this.setState({[key]: value})
  }
  handleSubmit = () => async (e) => {
    e.preventDefault()
    emitter.emitWin(this.BUTTON_TEST)
    emitter.emitWin(this.TEASER_TEST)
    const {email} = this.state
    const {referrerToken} = this.props.match.params
    const profile = {referrerToken}
    const options = {
      recaptchaToken: this.recaptchaToken
    }
    Meteor.sendVerificationCode(email, profile, options)
    this.setState({submitted: true})
  }
}

export default withRouter(SubscriptionFormContainer)
