import React          from 'react'
import {Form,
        FormGroup,
        FormFeedback,
        Input,
        Label,
        Button,
        Col}          from 'reactstrap'
import {withRouter}   from 'react-router'


export default class AfterSignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {formStep: 1}
  }
  render() {
    const {formStep} = this.state
    return (
      <Form onSubmit={this.handleSubmit()}>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={this.handleChange('newsletter')}
            /> s'inscrire à la newsletter
          </Label>
        </FormGroup>
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
      </Form>
    )
  }
  handleChange = (key) => (event) => {
    const value = event.target.value
    this.setState({[key]: value})
  }
  handleSubmit = () => async (e) => {
    e.preventDefault()
    const {newsletter, username} = this.state
    Meteor.users.update(
      Meteor.userId(),
      {$set: {'profile.newsletter': newsletter === 'on'}}
    )
    Meteor.setUsername(username)
  }
}
