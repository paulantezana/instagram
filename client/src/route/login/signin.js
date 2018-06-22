import React, { Component } from "react";
import { Button, Icon, Divider, Form } from 'semantic-ui-react';

import Logo from "../../images/instagram.png";

let args = {};

const handleChange = (ev, input)=>{
    args[input.name] = input.value;
    console.log(args);
};

export default ({handleClick, handleLogin})=> (

    <div>
        <div className="box">
            <img src={Logo} alt=""/>
            <Form onSubmit={(ev)=>handleLogin(ev, args)}>
                <Form.Field>
                    <Form.Input onChange={handleChange} error name="username" placeholder='Teléfono, usuario o correo electrónico' icon={<Icon name='remove circle' size='large'/>} />
                </Form.Field>
                <Form.Field>
                    <Form.Input onChange={handleChange} name="password" placeholder='Contraseña' icon={<Icon name='remove circle' size='large'/>}  />
                </Form.Field>
                <Button type='submit' fluid primary>Iniciar session</Button>
            </Form>
            <Divider horizontal>O</Divider>
            <Button color='facebook'>
                <Icon name='facebook' /> Facebook
            </Button>
        </div>
        <div className="box">
            <p> ¿No tienes una cuenta? <a href="" onClick={handleClick}>Regístrate</a></p>
        </div>
    </div>
);