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
import FacebookLogin  from './FacebookLogin'
import GoogleLogin    from './GoogleLogin'
import TwitterLogin   from './TwitterLogin'
import UserPageForm   from './UserPageForm'
import Button   from './Button'

const RECAPTCHA_KEY = Meteor.settings.public.recaptchaKey

const BUTTON_TEST = 'mainButton'
emitter.defineVariants(BUTTON_TEST, ['A', 'B'])

class SubscriptionFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted:  false,
      email:      '',
    }
  }
  componentWillMount() {
    grecaptcha.ready(() => {
      console.log("ready")
      grecaptcha.execute(RECAPTCHA_KEY, {action: 'signUp'})
      .then((token) => {
        this.recaptchaToken = token
      })
    })
    emitter.addPlayListener((experimentName, variantName) => {
      console.log('experiment play:', experimentName, variantName)
      analytics.track(experimentName, {
        category: 'AB testing',
        label:    variantName,
        value:    1,
      })
    })
    emitter.addWinListener((experimentName, variantName) => {
      console.log('experiment win:', experimentName, variantName)
      analytics.track(`${experimentName}-win`, {
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
        <FacebookLogin /> <GoogleLogin /> <TwitterLogin />
        <a onClick={this.showUserPageForm()}>Déjà inscrit ?</a>
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
          <div>
            Nous vous avons envoyé un e-mail pour valider votre adresse.
            Dès que vous aurez cliqué sur le lien qu'il contient vous pourrez participer au concours de parrainage
          </div>
        }
      </div>
    )
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
