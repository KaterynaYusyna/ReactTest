import React, { Component } from 'react';
import {map as _map} from 'lodash';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import '../styles/main.scss';

class FormComponent extends Component {
    state = {
        optionsCounties: [],
        optionsCodes: [],
        password: '',
        passwordConfirm: '',
        showPassword: false,
        showPasswordConfirm: false,
        checked: false,
        values: {
            value: null
        }
    }

    handleChange(e) {
        let values = {...this.state.values}
        values.value = e.target.value
        this.setState( 
            {values}, ()=> {console.log(e.target.value)}
        );
    };

    handleChacked(e) {
        this.setState({
            checked: !this.state.checked
        });
    }

    handleChangePassword(e) {
        this.setState({
            password: event.target.value
        });
    }

    handleChangePasswordConfirm(e) {
        this.setState({
            passwordConfirm: event.target.value
        });
    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    handleClickShowPasswordConfirm() {
        this.setState({
            showPasswordConfirm: !this.state.showPasswordConfirm
        });
    }

    componentDidMount() {
        let url = "http://0.0.0.0:3002/countries";
        fetch(url)
        .then (resp => resp.json())
        .then (data => {
            let optionsCounties = data.map((country, index) => {
                return (
                    <MenuItem key={index} value={country.name}>
                        {country.name}
                    </MenuItem>
                )
            });
            this.setState({optionsCounties: optionsCounties})
        })
    }

    render() {
        const { 
            optionsCounties,
            optionsCodes,
            checked,
            values, 
            password, 
            showPassword, 
            passwordConfirm,
            showPasswordConfirm
        } = this.state;
        return (
            <div className='container'>
                <div className='form__block'>
                    <h2 className="form__title">Sign up</h2>
                    <form>
                        <TextField
                            label="Name"
                            className='textField dense'
                            margin="dense"
                            id='name'
                            type='text'
                        />
                        <TextField
                            label="Email address"
                            className='textField dense'
                            margin="dense"
                            id='email'
                            type='email'
                        />
                        <TextField
                            select
                            label="Select country"
                            className='textField'
                            value={values.value}
                            onChange={(e) => this.handleChange(e)}
                            margin="normal"
                        >
                        {optionsCounties}
                        </TextField>
                        <FormControl className='margin textField'>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => this.handleChangePassword(e)}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={(e) => this.handleClickShowPassword(e)}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className='margin textField'>
                            <InputLabel htmlFor="passwordConfirm">Password confirmation</InputLabel>
                            <Input
                            id="passwordConfirm"
                            type={showPasswordConfirm ? 'text' : 'password'}
                            value={passwordConfirm}
                            onChange={(e) => this.handleChangePasswordConfirm(e)}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={(e) => this.handleClickShowPasswordConfirm(e)}
                                >
                                    {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => this.handleChacked()}
                                value="checked"
                            />
                            }
                            label="Yes, I'd like to recieve the very occasional email with information on new services and discounts"
                        />
 
                        <button className='form__button'>
                            Create an account
                        </button>
                    </form>
                    <p className="form__attention">
                        Already have a 24Slides account? 
                        <a>Click here</a> to log in to your existing account and join a company team
                    </p>
                </div>
            </div>
        )
    }
}

export default FormComponent;