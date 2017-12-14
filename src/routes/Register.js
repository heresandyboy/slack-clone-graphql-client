import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { Container, Header, Input, Button, Message } from 'semantic-ui-react'

class Register extends Component {
    state = {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    }

    static propTypes = {
        mutate: PropTypes.func.isRequired,
        history: PropTypes.object,
    }

    onSubmit = async () => {

        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: ''
        })

        const { username, email, password } = this.state

        const response = await this.props.mutate({
            variables: { username, email, password },
        })

        const { ok, errors } = response.data.register

        if (ok) {
            this.props.history.push('/')
        } else {
            const validationError = {}
            errors.forEach(({ path, message }) => {
                validationError[`${path}Error`] = message
            })

            this.setState(validationError)
        }
    }

    onChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {

        const { username, email, password, usernameError, emailError, passwordError } = this.state

        const errorList = []

        if (usernameError) errorList.push(usernameError)
        if (emailError) errorList.push(emailError)
        if (passwordError) errorList.push(passwordError)

        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Input name="username"
                    value={username}
                    placeholder="Username" fluid
                    onChange={this.onChange}
                    error={!!usernameError}
                />
                <Input name="email"
                    value={email}
                    placeholder="Email" fluid
                    onChange={this.onChange}
                    error={!!emailError}
                />
                <Input name="password"
                    value={password} type="password"
                    placeholder="Password" fluid
                    onChange={this.onChange}
                    error={!!passwordError}
                />
                <Button onClick={this.onSubmit}>Submit</Button>
                {(usernameError || passwordError || emailError) ? (<Message
                    error
                    header='There are some errors with your submission'
                    list={errorList}
                    />
                ) : null}          
            </Container>
        )
    }
}

const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
        }
    }
`

export default graphql(registerMutation)(Register)