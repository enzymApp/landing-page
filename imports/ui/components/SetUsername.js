import {Meteor}       from 'meteor/meteor'
import React          from 'react'
import {Form,
        FormGroup,
        FormFeedback,
        Input,
        Button,
        Label,
        Col}          from 'reactstrap'
import T from './Translator'


export default class SetUsername extends React.Component {
  constructor(props) {
    super(props)
    this.state = {form: false, username: ""}
  }
  render() {
    if(this.state.form) {
      return (
        <Form inline onSubmit={this.handleSubmit()}>
          <FormGroup className="mb-2">
            <Input
              type="text"
              id="username"
              placeholder="Pseudo"
              onChange={this.handleChange('username')}
              autoFocus={true}
            />
          </FormGroup>
          <Button type="submit" disabled={!this.hasUsername()}>
            <T>Common.submit</T>
          </Button>
        </Form>
      )
    }
    return (
      <a onClick={() => this.setState({form: true})}><T>Common.chooseUsername.text</T></a>
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
      {$set: {'profile.contest': true}}
    )
    if(username) {
      Meteor.setUsername(username)
    }
  }
}
