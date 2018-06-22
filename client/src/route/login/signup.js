import React, { Component } from "react";
import Logo from "../../images/instagram.png";
import { Button, Message, Icon, Divider, Form } from 'semantic-ui-react';

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!, $fullname:  String!, $email:  String!) {
        createUser(username: $username, password: $password, fullname: $fullname, email: $email) {
            success
            errors {
                path
                message
            }
        }
    }
`;

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            args: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev, input){
        let nn = this.state.args;
        nn[input.name] = input.value;
        this.setState({
            args: nn
        })
    }

    render(){
        const { handleClick } = this.props;
        return(
            <div>
                <div className="box">
                    <img src={Logo} alt=""/>
                    <h2>Regístrate para ver fotos y videos de tus amigos.</h2>
                    <Button color='facebook' fluid>
                        <Icon name='facebook' /> Facebook
                    </Button>
                    <Divider horizontal>O</Divider>
                    <Mutation mutation={CREATE_USER}>
                        {(createUser, { loading, error, data }) => (
                            <div>
        
                                <Form onSubmit={e=>{
                                    e.preventDefault();
                                    createUser({variables: { username: this.state.args.username, password: this.state.args.password, fullname: this.state.args.fullname, email: this.state.args.email }});
                                }}>
                                    <Form.Field>
                                        <Form.Input onChange={this.handleChange} name="email" placeholder='Número de celular o correo electrónico' icon={<Icon name='remove circle' size='large'/>} />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input onChange={this.handleChange} name="fullname" placeholder='Nombre completo' icon={<Icon name='remove circle' size='large'/>}  />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input onChange={this.handleChange} name="username" placeholder='Nombre de usuario' icon={<Icon name='remove circle' size='large'/>} />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input onChange={this.handleChange} name="password" placeholder='Contraseña' icon={<Icon name='remove circle' size='large'/>} />
                                    </Form.Field>
                                    <Button type='submit' loading={loading} disabled={ !this.state.args.username || !this.state.args.password || !this.state.args.fullname || !this.state.args.email} fluid primary>Iniciar session</Button>
                                </Form>
                                { data &&
                                    <Message negative>
                                        <Message.Header>We're sorry we can't apply that discount</Message.Header>
                                        <p>That offer has expired</p>
                                        { console.log(data) }
                                    </Message>
                                }
                            </div>
                        )}
                    </Mutation>
                    <Divider hidden />
                    <p>Al registrarte, aceptas nuestras Condiciones, la Política de datos y la Política de cookies.</p>
                </div>
                <div className="box">
                    <p> ¿Tienes una cuenta? <a href="" onClick={handleClick}>Inicia sesión</a></p>
                </div>
            </div>
        )
    }
}

export default Signup;