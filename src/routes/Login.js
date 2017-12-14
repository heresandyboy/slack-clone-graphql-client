import React, { Component } from 'react'
import { extendObservable } from 'mobx'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Button, Input, Container, Header } from 'semantic-ui-react'


/*
    This component is trying out Mobx
    (an alternative to Redux for some component state management)
    Though this could also be achieved with Apollo's global state
 */

class Login extends Component {
    constructor(props) {
      super(props)

      extendObservable(this, {
        email: '',
        password: '',
      })
    }

    static propTypes = {
      mutate: PropTypes.func.isRequired,
      history: PropTypes.object,
    }

    onSubmit = async () => {
      const { email, password } = this
      const response = await this.props.mutate({
        variables: { email, password },
      })
      console.log(response)
      const { ok, token, refreshToken } = response.data.login
      if (ok) {
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
      }
    };
    /*
    this syntax ( function = (e) = => ) bypasses the need to do: this.onChange = this.onChange.bind(this)
    */
    onChange = (e) => {
        const { name, value } = e.target
        this[name] = value
    }

    render() {
      const { email, password } = this

      return (
        <Container text>
          <Header as="h2">Login</Header>
          <Input name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Email" fluid />
          <Input name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="Password"
              fluid
          />
          <Button onClick={this.onSubmit}>Submit</Button>
        </Container>
      )
    }
  }

const loginMutation = gql`
    mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
}
`

export default graphql(loginMutation)(observer(Login))