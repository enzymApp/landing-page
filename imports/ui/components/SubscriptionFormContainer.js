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
const LANG = i18n.getLocale()
const BUTTON_TEST = `${LANG}-mainButton`
emitter.defineVariants(BUTTON_TEST, ['A', 'B'])

i18n.addTranslations('en-US', 'teaser', 'Meet and face your neighbors')
i18n.addTranslations('fr', 'teaser', 'Rencontre et affronte tes voisins')
const T = i18n.createComponent()

class SubscriptionFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted:  false,
      email:      '',
    }
  }
  componentWillMount() {
    this.loadCaptchaReady()
    emitter.addPlayListener((experimentName, variantName) => {
      console.log('experiment play:', experimentName, variantName)
      analytics.track(`${LANG}-${experimentName}`, {
        category: 'AB testing',
        label:    variantName,
        value:    1,
      })
    })
    emitter.addWinListener((experimentName, variantName) => {
      console.log('experiment win:', experimentName, variantName)
      analytics.track(`${LANG}-${experimentName}-win`, {
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
      <div>
      <h3 id="accroche" align="center">
        <T>teaser</T>
      </h3>
        <div className="social_logins">
          {HOME_SOCIAL_LOGIN.map(name => <SocialLogin {...{name}} key={name} />)}<br/>
          <a href="javascript:;" onClick={this.showUserPageForm()}>Déjà inscrit ?</a>
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
                    <Experiment name={BUTTON_TEST}>
                      <Variant name="A">Participer !</Variant>
                      <Variant name="B">Rejoignez-nous !</Variant>
                    </Experiment>
                  </Button>
                </div>
            </FormGroup>
          </Form>
        }
        {submitted &&
          <div className="texte_valider_email">
            Nous vous avons envoyé un e-mail pour valider votre adresse.
            Dès que vous aurez cliqué sur le lien qu'il contient vous pourrez participer au concours de parrainage.
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
    emitter.emitWin(BUTTON_TEST)
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
