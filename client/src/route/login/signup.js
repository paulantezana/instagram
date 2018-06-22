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

let args = {};

const handleChange = (ev, input)=>{
    args[input.name] = input.value;
    console.log(args);
};


export default ({handleClick})=> (
    <div>
        <div className="box">
            <img src={Logo} alt=""/>
            <h2>Regístrate para ver fotos y videos de tus amigos.</h2>
            <Button color='facebook' fluid>
                <Icon name='facebook' /> Facebook
            </Button>
            <Divider horizontal>O</Divider>
            <Mutation mutation={CREATE_USER}>
                {(createUser, { loading, error }) => (
                    <div>

                        <Form onSubmit={e=>{
                            e.preventDefault();
                            createUser({variables: { username: args.username, password: args.password, fullname: args.fullname, email: args.email }});
                            args = {};
                        }}>
                            <Form.Field>
                                <Form.Input onChange={handleChange} name="email" placeholder='Número de celular o correo electrónico' icon={<Icon name='remove circle' size='large'/>} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input onChange={handleChange} name="fullname" placeholder='Nombre completo' icon={<Icon name='remove circle' size='large'/>}  />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input onChange={handleChange} name="username" placeholder='Nombre de usuario' icon={<Icon name='remove circle' size='large'/>} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input onChange={handleChange} name="password" placeholder='Contraseña' icon={<Icon name='remove circle' size='large'/>} />
                            </Form.Field>
                            <Button type='submit' loading={loading} fluid primary>Iniciar session</Button>
                        </Form>
                        { error &&
                            <Message negative>
                                <Message.Header>We're sorry we can't apply that discount</Message.Header>
                                <p>That offer has expired</p>
                                { console.log(error) }
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
);