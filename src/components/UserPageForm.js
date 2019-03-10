import React          from 'react'
import {Form,
        FormGroup,
        Input}        from 'reactstrap'
import {Redirect}     from 'react-router-dom'
import { FormattedMessage as T } from 'react-intl'
import Button         from './Button'

export default class UserPageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted:  false,
      username:   '',
    }
  }
  render() {
    const {submitted, username} = this.state
    return (
      <div>
        {submitted &&
          <Redirect push to={`/page/${username}`} />
        }
        {!submitted && (
          <Form onSubmit={this.handleSubmit()}>
            <FormGroup row>
              <div className="top_form">
                <h2>Connect</h2>
                <Input
                  type="text"
                  placeholder="Pseudo"
                  onChange={this.handleChange('username')}
                  autoFocus
                />
                <Button type="submit"><T id="Ok" /></Button>
              </div>
            </FormGroup>
          </Form>
        )}
      </div>
    )
  }
  handleChange = (key) => (event) => {
    const value = event.target.value
    this.setState({[key]: value})
  }
  handleSubmit = () => async (e) => {
    e.preventDefault()
    this.setState({submitted: true})
  }
}
