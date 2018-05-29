import React          from 'react'
import {Form,
        FormGroup,
        FormFeedback,
        Input,
        Label,
        Button,
        Col}          from 'reactstrap'
import {withRouter}   from 'react-router'
import {Experiment,
        Variant,
        emitter}      from '@marvelapp/react-ab-test'
import {analytics}    from 'meteor/okgrow:analytics'


emitter.defineVariants('mainButton', ['A', 'B'])


class SubscriptionFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formStep:   1,
      email:      '',
      newsletter: '',
      engage:     '',
      username:   '',
    }
  }
  componentWillMount() {
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
    const {formStep} = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit()}>
          {formStep === 1 &&
            <FormGroup row>
              <Col sm={6}>
                <Input
                  type="email"
                  placeholder="Adresse e-mail"
                  onChange={this.handleChange('email')}
                />
                <FormFeedback>Adresse e-mail incorrecte</FormFeedback>
              </Col>
              <Col sm={6}>
                <Button onClick={this.nextStep('mainButton')}>
                  <Experiment name="mainButton">
                    <Variant name="A">Participer !</Variant>
                    <Variant name="B">Rejoignez-nous !</Variant>
                  </Experiment>
                </Button>
              </Col>
            </FormGroup>
          }
          {formStep === 2 &&
            <div>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={this.handleChange('newsletter')}
                  /> s'inscrire à la newsletter
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={this.handleChange('engage')}
                  /> participer au concours
                </Label>
              </FormGroup>
              <Button onClick={this.nextStep()}>Continuer</Button>
            </div>
          }
          {formStep === 3 &&
            <FormGroup>
              <Label for="username">Un pseudo pour le concours :)</Label>
              <Input
                type="text"
                id="username"
                placeholder="Pseudo"
                onChange={this.handleChange('username')}
              />
              <Button type="submit">C'est fini !</Button>
            </FormGroup>
          }
          {formStep === 4 &&
            <div>
              Nous vous avons envoyé un e-mail pour valider votre adresse.
              Dès que vous aurez cliqué sur le lien qu'il contient vous pourrez participer au concours de parrainage
            </div>
          }
        </Form>
      </div>
    )
  }
  handleChange = (key) => (event) => {
    const value = event.target.value
    this.setState({[key]: value})
  }
  nextStep = (experiment) => () => {
    if(experiment) {
      emitter.emitWin(experiment)
    }
    this.setState(({formStep}) => ({formStep: formStep + 1}))
  }
  handleSubmit = () => async (e) => {
    e.preventDefault()
    console.log(this.state)
    const {email, engage, newsletter, username} = this.state
    const {referrerToken} = this.props.match.params
    //emitter.emitWin('mainButton')
    const options = {
      profile: {
        engage:       engage === 'on',
        newsletter:   newsletter === 'on',
        referrerToken,
      },
      username
    }
    Meteor.sendVerificationCode(email, options)
    this.nextStep()()
  }
}

export default withRouter(SubscriptionFormContainer)
