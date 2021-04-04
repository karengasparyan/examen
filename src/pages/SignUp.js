import React, {Component} from 'react';
import {signUpRequest, uploadImageRequest} from "../store/actions/users";
import _ from "lodash";
import {connect} from "react-redux";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      errors: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        age: '',
        password: '',
        repeatPassword: '',
        file: '',
      },
      fileAttr: [],
    }
  }

  handleChange = (ev, i) => {
    const values = {...this.state.values, [i]: ev.target.value}
    this.setState({values})
  };

  handleChangeImages = (ev) => {
    const fileAttr = [];
    const {files} = ev.target;
    for (let i = 0; i < files.length; i++) {
      fileAttr.push({
        path: URL.createObjectURL(files[i]),
        file: files[i],
      })
    }
    this.setState({fileAttr})
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {values, fileAttr} = this.state;
    const FileList = [];
    const errors = {};
    fileAttr.map((f, i) => FileList[i] = f.file);
    this.props.signUpRequest(FileList, {...values}, async (error, data) => {
      if (error) {
        if (_.isEmpty(values)) {
          errors.last_name = 'this is a required field'
          errors.first_name = 'this is a required field'
          errors.email = 'this is a required field'
          errors.phone = 'this is a required field'
          errors.age = 'this is a required field'
          errors.password = 'this is a required field'
          errors.repeatPassword = 'this is a required field'
          errors.file = 'this is a required field'
          this.setState({errors})
        }
        return;
      }
      this.props.history.replace('/')
    });
  };

  inputValidate = (event) => {
    event.preventDefault();
    const {name, value} = event.target;
    const values = {...this.state.values, [name]: event.target.value}
    const {errors, fileAttr} = this.state;

    switch (name) {
      case 'first_name':
        errors.first_name = value.length < 5 ? 'Firstname must be 5 characters long!' : '';
        break;
      case 'last_name':
        errors.last_name =
          value.length < 5 ? 'Lastname must be 5 characters long!' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'phone':
        errors.phone = value.length ? '' : 'Phone is required';
        break;
      case 'age':
        errors.age = value.length ? '' : 'Age is required';
        break;
      case 'password':
        errors.password = value.length < 3 ? 'Password must be 3 characters long!' : '';
        break;
      case 'repeatPassword':
        errors.repeatPassword = values.password === values.repeatPassword ? '' : 'Invalid repeat password';
        break;
      case 'file':
        errors.file = fileAttr && _.isEmpty(fileAttr) ? 'Image is required' : '';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
  }

  render() {
    const {values, errors} = this.state;
    const {error} = this.props;

    return (
      <>
        <h1>Sign Up</h1>
        <form style={{display: 'flex', flexDirection: "column", width: '50%'}} onSubmit={this.handleSubmit}>
          <label htmlFor="first_name">first name</label>
          <input
            onChange={(ev) => {
              this.handleChange(ev, 'first_name')
              // this.inputValidate(ev)
            }}
            onBlur={this.inputValidate}
            type="text"
            value={values.first_name}
            id="first_name"
            name="first_name"
          />
          <p className="errors">{errors.first_name}</p>
          <label htmlFor="last_name">last name</label>
          <input
            onChange={(ev) => {
              this.handleChange(ev, 'last_name')
              // this.inputValidate(ev)
            }}
            onBlur={this.inputValidate}
            type="text"
            value={values.last_name}
            id="last_name"
            name="last_name"
          />
          <p className="errors">{errors.last_name}</p>
          <label htmlFor="email">email</label>
          <input
            onChange={(ev) => {
              this.handleChange(ev, 'email')
              // this.inputValidate(ev)
            }}
            onBlur={this.inputValidate}
            type="email"
            value={values.email}
            id="email"
            name="email"
          />
          <p className="errors">{errors.email}</p>
          <label htmlFor="phone">phone</label>
          <input
            onChange={(ev) => {
              this.handleChange(ev, 'phone')
              // this.inputValidate(ev)
            }}
            onBlur={this.inputValidate}
            type="text"
            value={values.phone}
            id="phone"
            name="phone"
          />
          <p className="errors">{errors.phone}</p>
          <label htmlFor="age">age</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'age')}
            onBlur={this.inputValidate}
            type="number"
            value={values.age}
            id="age"
            name="age"
          />
          <p className="errors">{errors.age}</p>
          <label htmlFor="password">password</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'password')}
            onBlur={this.inputValidate}
            type="password"
            value={values.password}
            id="password"
            name="password"
          />
          <p className="errors">{errors.password}</p>
          <label htmlFor="repeatPassword">repeat password</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'repeatPassword')}
            onBlur={this.inputValidate}
            type="password"
            value={values.repeatPassword}
            id="repeatPassword"
            name="repeatPassword"
          />
          <p className="errors">{errors.repeatPassword}</p>
          <label htmlFor="picture">upload picture</label>
          <input
            type="file"
            name="file"
            multiple
            id="picture"
            onChange={this.handleChangeImages}
            onBlur={this.inputValidate}
          />
          <p className="errors">{errors.file}</p>
          <button type='submit'>sign in</button>
          <p className="errors">{error}</p>
        </form>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  error: state.users.error,
});
const mapDispatchToProps = {
  signUpRequest,
  uploadImageRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

export default Container;
