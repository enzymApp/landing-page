import React          from 'react'
import {Form,
        FormGroup,
        FormFeedback,
        Input,
        Col, Row}     from 'reactstrap'
import {withRouter}   from 'react-router'
import {Accounts}     from 'meteor/accounts-base'
import i18n           from 'meteor/universe:i18n'
import Button         from './Button'
import UserPageForm   from './UserPageForm'
import SocialLogin    from './SocialLogin'
import T              from './Translator'

const HOME_SOCIAL_LOGIN = ['Facebook', 'Google', 'Twitter']
const RECAPTCHA_KEY = Meteor.settings.public.recaptchaKey

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
  }
  render() {
    const {emailLoginAttempt} = this.props
    const {referrerToken} = this.props.match.params
    const {submitted, userPageForm} = this.state
    if(userPageForm) return <UserPageForm />
    return (
      <div id="top_bloc">
        <div className="logo">
          <img src="/images/logo_enzym_white.png" className="responsive-img"/>
        </div>
        <p><T>Home.descr.p1</T></p>
        <p><T>Home.descr.p2</T></p>
        <hr />
        <Row>
          <Col xs="12" md="6" align="center">
            <a href="https://play.google.com/store/apps/details?id=com.enzym_proto" target="_blank">
              <img src="/images/available-android.png" className="responsive-img available-support"/>
            </a>
          </Col>
          <Col xs="12" md="6" align="center">
            <a href="https://itunes.apple.com/app/id1437880226" target="_blank">
              <img src="/images/available-ios.png" className="responsive-img"/>
            </a>
          </Col>
        </Row>
        <hr />
        {!submitted && !emailLoginAttempt &&
          <div id="subscribe">
            <p className="join-us">
              <T>Home.descr.p3</T><br />
              <T>Home.descr.p4</T>
            </p>
            <div className="social_logins">
              <Row>
              {HOME_SOCIAL_LOGIN.map(name => <SocialLogin {...{name, referrerToken}} key={name} />)}<br/>
              </Row>
            </div>
            <Form onSubmit={this.handleSubmit()}>
              <FormGroup row>
                <div className="top_form">
                  <Input
                    type="email"
                    placeholder="E-mail"
                    onChange={this.handleChange('email')}
                  />
                  <FormFeedback><T>Common.signup.incorrectEmailAdress</T></FormFeedback>
                  <Button type="submit">Ok</Button>
                </div>
              </FormGroup>
            </Form>
            <a role="button" tabIndex="0" onClick={this.showUserPageForm()} className="already-subscribed">
              <T>Common.signup.alreadySubscribed</T>
            </a>
          </div>
        }
        {(submitted || emailLoginAttempt) &&
          <div className="texte_valider_email">
            <T>Common.signup.emailSent1</T>
            <div><strong>{this.state.email || emailLoginAttempt}</strong></div>
            <T>Common.signup.emailSent2</T>
            <br/>
            <br/>
            <div>
              <div><T>Common.tryAgain.notReceived</T></div>
              <br/>
              <Button type="button" onClick={this.clearLoginAttempt}><T>Common.tryAgain.button</T></Button>
            </div>
          </div>
        }
      </div>
    )
  }
  clearLoginAttempt = () => {
    Accounts.clearPasswordlessLoginAttempt()
  }
  loadCaptchaReady() {
    if(!window.grecaptcha) return
    if(this.recaptchaReady) return
    window.grecaptcha.ready(() => {
      this.recaptchaReady = true
      window.grecaptcha.execute(RECAPTCHA_KEY, {action: 'signUp'})
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
    const {email} = this.state
    const {referrerToken} = this.props.match.params
    const profile = {
      lang: i18n.getLocale(),
      referrerToken,
    }
    const options = {
      recaptchaToken: this.recaptchaToken
    }
    Meteor.sendVerificationCode(email, profile, options)
    this.setState({submitted: true})
  }
}

export default withRouter(SubscriptionFormContainer)
