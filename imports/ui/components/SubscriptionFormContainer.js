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
import T              from './Translator'

const HOME_SOCIAL_LOGIN = ['Facebook', 'Google', 'Twitter']
const RECAPTCHA_KEY = Meteor.settings.public.recaptchaKey
const ABTestingIndex = 2

class SubscriptionFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted:  false,
      email:      '',
    }
    this.LANG = i18n.getLocale()
    this.BUTTON_TEST = `${this.LANG}-mainButton-${ABTestingIndex}`
    this.TEASER_TEST = `${this.LANG}-teaser-${ABTestingIndex}`
    emitter.defineVariants(this.BUTTON_TEST, ['PARTICIPER', 'REJOINS_NOUS'])
    emitter.defineVariants(this.TEASER_TEST, ['FAUX_PROFILS', 'JOUE', 'JOUER_SEUL', 'BAVARDAGES', 'VOL_DONNÉES', 'JEU_LOCAL'])
  }
  componentWillMount() {
    this.loadCaptchaReady()
    emitter.addPlayListener((experimentName, variantName) => {
      analytics.track(experimentName, {
        category: 'AB testing',
        label:    variantName,
        value:    1,
      })
    })
    emitter.addWinListener((experimentName, variantName) => {
      analytics.track(`${experimentName}-win`, {
        category: 'AB testing',
        label:    variantName,
        value:    1,
      })
    })
  }
  render() {
    const {referrerToken} = this.props.match.params
    const {submitted, userPageForm} = this.state
    if(userPageForm) return <UserPageForm />
    return (
      <div id="top_bloc">
        <h3 id="accroche" align="center">
          <Experiment name={this.TEASER_TEST}>
            <Variant name="FAUX_PROFILS"><T>ABTesting.fakeProfiles.big</T></Variant>
            <Variant name="JOUE">        <T>ABTesting.play.big</T>        </Variant>
            <Variant name="JOUER_SEUL">  <T>ABTesting.playAlone.big</T>   </Variant>
            <Variant name="BAVARDAGES">  <T>ABTesting.cheapChat.big</T>   </Variant>
            <Variant name="VOL_DONNÉES"> <T>ABTesting.dataStealing.big</T></Variant>
            <Variant name="JEU_LOCAL">   <T>ABTesting.localGame.big</T>   </Variant>
          </Experiment>
        </h3>
        <h4 id="accrochebis" align="center">
          <Experiment name={this.TEASER_TEST}>
            <Variant name="FAUX_PROFILS"><T>ABTesting.fakeProfiles.small</T></Variant>
            <Variant name="JOUE">        <T>ABTesting.play.small</T>        </Variant>
            <Variant name="JOUER_SEUL">  <T>ABTesting.playAlone.small</T>   </Variant>
            <Variant name="BAVARDAGES">  <T>ABTesting.cheapChat.small</T>   </Variant>
            <Variant name="VOL_DONNÉES"> <T>ABTesting.dataStealing.small</T></Variant>
            <Variant name="JEU_LOCAL">   <T>ABTesting.localGame.small</T>   </Variant>
          </Experiment>
        </h4>
        <div className="social_logins">
          {HOME_SOCIAL_LOGIN.map(name => <SocialLogin {...{name, referrerToken}} key={name} />)}<br/>
          <a role="button" tabIndex="0" onClick={this.showUserPageForm()}>
            <T>Common.signup.alreadySubscribed</T>
          </a>
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
                <FormFeedback><T>Common.signup.incorrectEmailAdress</T></FormFeedback>
                  <Button type="submit">
                    <Experiment name={this.BUTTON_TEST}>
                      <Variant name="PARTICIPER"><T>ABTesting.engageButton.participate</T></Variant>
                      <Variant name="REJOINS_NOUS"><T>ABTesting.engageButton.joinUs</T></Variant>
                    </Experiment>
                  </Button>
                </div>
            </FormGroup>
          </Form>
        }
        {submitted &&
          <div className="texte_valider_email">
            <T>Common.signup.emailSent</T>
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
