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
    this.state = {formStep: 1, username: ''}
  }
  render() {
    const {formStep, username} = this.state
    return (
      <Form onSubmit={this.handleSubmit()}>
        <FormGroup>
          <Label for="username">Un pseudo pour le concours ?</Label>
          <Input
            type="text"
            id="username"
            placeholder="Pseudo"
            onChange={this.handleChange('username')}
          />
        </FormGroup>
        <Button type="submit">
          {this.hasUsername() && 'Valider' || 'Non merci'}
        </Button>
      </Form>
    )
  }
  handleChange = (key) => (event) => {
    const value = event.target.value
    this.setState({[key]: value})
  }
  hasUsername = () => this.state.username.length >= 3
  handleSubmit = () => async (e) => {
    const {username} = this.state
    e.preventDefault()
    Meteor.users.update(
      Meteor.userId(),
      {$set: {'profile.contest': this.hasUsername()}}
    )
    if(username) {
      Meteor.setUsername(username)
    }
  }
}
