import React          from 'react'
import {Form,
        FormGroup,
        FormFeedback,
        Input,
        Label,
        Button,
        Col}          from 'reactstrap'
import {Redirect}     from 'react-router-dom'
import {analytics}    from 'meteor/okgrow:analytics'


class SubscriptionFormContainer extends React.Component {
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
              <Col sm={6}>
                <Input
                  type="text"
                  placeholder="Pseudo"
                  onChange={this.handleChange('username')}
                />
              </Col>
              <Col sm={6}>
                <Button type="submit">Go !</Button>
              </Col>
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

export default SubscriptionFormContainer
