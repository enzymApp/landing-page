import React          from 'react'
import {Meteor}      from 'meteor/meteor'
import {Form, FormGroup, FormFeedback, Input, Col, Row} from 'reactstrap'
import {withRouter}   from 'react-router'
import {Accounts}     from 'meteor/accounts-base'
import { compose, withProps, withState, withHandlers, branch, renderComponent, lifecycle } from 'recompose'
import { FormattedMessage as T } from 'react-intl'
import withAppState   from '../withAppState'
import Button         from './Button'
import UserPageForm   from './UserPageForm'
import SocialLogin    from './SocialLogin'

const HOME_SOCIAL_LOGIN = ['Facebook', 'Google', 'Twitter']
const RECAPTCHA_KEY = Meteor.settings.public.recaptchaKey

const SubscriptionForm = ({
  emailLoginAttempt, handleChange, handleSubmit, form, setForm, submitted,
  referrerToken, setShowUserPageForm,
}) => (
  <div id="top_bloc">
    <div className="logo">
      <img src="/images/logo_enzym_white.png" className="responsive-img"/>
    </div>
    <p><T id="home.descr.p1" /></p>
    <p><T id="home.descr.p2" /></p>
    <hr />
    <Row>
      <Col xs="12" md="6" align="center">
        <a href="https://play.google.com/store/apps/details?id=io.enzym.app" target="_blank">
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
    {!submitted && !emailLoginAttempt
      ? (
        <div id="subscribe">
          <p className="join-us">
            <T id="home.descr.p3" />
            <br />
            <T id="home.descr.p4" />
          </p>
          <div className="social_logins">
            <Row>
              {HOME_SOCIAL_LOGIN.map(name => <SocialLogin {...{name, referrerToken}} key={name} />)}<br/>
            </Row>
          </div>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <div className="top_form">
                <Input
                  type="email"
                  placeholder="E-mail"
                  onChange={handleChange('email')}
                />
                <FormFeedback><T id="common.signup.incorrectEmailAdress" /></FormFeedback>
                <Button type="submit">Ok</Button>
              </div>
            </FormGroup>
          </Form>
          <a role="button" tabIndex="0" onClick={() => setShowUserPageForm(true)} className="already-subscribed">
            <T id="common.signup.alreadySubscribed" />
          </a>
        </div>
      ) : (
        <div className="texte_valider_email">
          <T id="common.signup.emailSent1" />
          <div><strong>{form.email || emailLoginAttempt}</strong></div>
          <T id="common.signup.emailSent2" />
          <br />
          <br />
          <div>
            <div><T id="common.tryAgain.notReceived" /></div>
            <br />
            <Button type="button" onClick={() => clearLoginAttempt(setForm)}><T id="common.tryAgain.button" /></Button>
          </div>
        </div>
      )}
  </div>
)

const clearLoginAttempt = (setForm) => {
  Accounts.clearPasswordlessLoginAttempt()
  setForm({ submitted: false })
}

let recaptchaToken
const loadCaptchaReady = () => {
  let recaptchaReady = false
  return () => {
    if(!window.grecaptcha) return
    if(recaptchaReady) return
    window.grecaptcha.ready(() => {
      recaptchaReady = true
      window.grecaptcha.execute(RECAPTCHA_KEY, { action: 'signUp' })
        .then((token) => {
          recaptchaToken = token
        })
    })
  }
}

export default compose(
  withRouter,
  withAppState,
  withState('form', 'setForm', { submitted: false, email: '' }),
  withState('showUserPageForm', 'setShowUserPageForm', false),
  branch(({ showUserPageForm }) => showUserPageForm, renderComponent(UserPageForm)),
  withProps(({ appState: { locale }, form, match: { params: { referrerToken } } }) => ({
    locale,
    referrerToken,
    submitted: form.submitted,
    loadCaptchaReady: form.loadCaptchaReady,
  })),
  withHandlers({
    handleChange: ({ setForm }) => (key) => (event) => {
      const value = event.target.value
      setForm({[key]: value})
    },
    handleSubmit: ({ locale, form: { email }, match: { params: { referrerToken } }, setForm }) => (e) => {
      e.preventDefault()
      const profile = {
        lang: locale,
        referrerToken,
      }
      Meteor.sendVerificationCode(email, profile, { recaptchaToken })
      setForm({ submitted: true })
    },
  }),
  lifecycle({
    componentDidMount() {
      loadCaptchaReady()()
    }
  })
)(SubscriptionForm)
