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
        firstName: '',
        optionsCounties: [],
        phone: null,
        email: '',
        optionsCodes: [],
        password: '',
        passwordConfirm: '',
        showPassword: false,
        showPasswordConfirm: false,
        checked: false,
        country: null,
        codes: null
    }

    handleChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
	};

    componentDidMount() {
        let url = "http://0.0.0.0:3002/countries";
        fetch(url)
        .then (resp => resp.json())
        .then (data => {
            let optionsCounties = _map(data, (country, index) => {
                return (
                    <MenuItem key={index} value={country.name}>
                        {country.name}
                    </MenuItem>
                )
            });
            let optionsCodes = _map(data, (country, index) => {
                return (
                    <MenuItem key={index} value={country.dial_code}>
                        {country.dial_code}
                    </MenuItem>
                )
            });
            this.setState({optionsCounties: optionsCounties})
            this.setState({optionsCodes: optionsCodes})
        })
    }

    render() {
        const { 
            optionsCounties,
            optionsCodes,
            checked, 
            phone,
            email,
            password, 
            showPassword, 
            passwordConfirm,
            showPasswordConfirm,
            firstName
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
                            name='firstName'
                            value={firstName}
                            onChange={(e) => this.handleChange('firstName', e)}
                        />
                        <div className="form__codes"> 
                            <TextField
                                select
                                label="Code"
                                className='textField'
                                value={this.state.codes}
                                name='codes'
                                onChange={(e) => this.handleChange('codes', e)}
                                margin="normal"
                            >
                            {optionsCodes}
                            </TextField>
                            <TextField
                                label="Phone number"
                                className='textField dense'
                                margin="dense"
                                id='phone'
                                type='phone'
                                value={phone}
                                name='phone'
                                onChange={(e) => this.handleChange('phone', e)}
                            />
                        </div>
                        <TextField
                            label="Email address"
                            className='textField dense'
                            margin="dense"
                            id='email'
                            type='email'
                            value={email}
                            name='email'
                            onChange={(e) => this.handleChange('email', e)}
                        />
                        <TextField
                            select
                            label="Select country"
                            className='textField'
                            value={this.state.country}
                            name='country'
                            onChange={(e) => this.handleChange('country', e)}
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
                            name='password'
                            onChange={(e) => this.handleChange('password', e)}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => this.setState({showPassword: !this.state.showPassword})}
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
                            name='passwordConfirm'
                            onChange={(e) => this.handleChange('passwordConfirm', e)}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => this.setState({showPasswordConfirm: !this.state.showPasswordConfirm})}
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
                                onClick={() => this.setState({checked: !this.state.checked})}
                                value={checked}
                                name="checked"
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