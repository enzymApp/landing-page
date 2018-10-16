import React          from 'react'
import {Form,
        FormGroup,
        FormFeedback,
        Input,
        Label,
        Col}          from 'reactstrap'
import {Redirect}     from 'react-router-dom'
import {analytics}    from 'meteor/okgrow:analytics'
import Button         from './Button'
import T              from './Translator'

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
        {!submitted &&
          <Form onSubmit={this.handleSubmit()}>
            <FormGroup row>
              <div className="top_form">
                <h2>Connect</h2>
                <Input
                  type="text"
                  placeholder="Pseudo"
                  onChange={this.handleChange('username')}
                  autoFocus={true}
                />
                <Button type="submit"><T>Ok</T></Button>
                </div>
              </FormGroup>
          </Form>
        }
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
