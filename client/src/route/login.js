import React, { Component } from "react";
import Phone from "./../images/phone.jpg";
import { Grid } from "semantic-ui-react";

import Signin from './login/signin';
import Signup from './login/signup';
import LostPassword from './login/lostpassword';

const styles = {
    grid: {
        height: '100%',
    }
};

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            showLogin: true,
            showRegister: false,
            showLostPassword: false,
        };
        this.showLogin = this.showLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    showLogin(e){
        e.preventDefault();
        this.setState({
            showLogin: true,
            showRegister: false,
            showLostPassword: false,
        });
    }

    showRegister(e){
        e.preventDefault();
        this.setState({
            showLogin: false,
            showRegister: true,
            showLostPassword: false,
        });
    }

    handleLogin(ev, args){
        console.log(args);
    }
    
    render(){
        const {showLogin, showRegister, showLostPassword} = this.state;
        return (
            <Grid verticalAlign='middle' container columns={2} centered style={styles.grid}>
                <Grid.Row>
                    <Grid.Column>
                        <img src={ Phone } alt=""/>
                    </Grid.Column>
                    <Grid.Column>
                        { showLogin && <Signin handleClick={ this.showRegister } handleLogin={this.handleLogin}/> }
                        { showRegister && <Signup handleClick={ this.showLogin }/> }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Login;