import React, {Component} from 'react';
import {signUpRequest, uploadImageRequest} from "../store/actions/users";
import {connect} from "react-redux";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      images: [],
      files: [],
      fileAttr: [],
    }
  }

  componentDidMount() {

  }

  handleChange = (ev, i) => {
    this.setState({values: {...this.state.values, [i]: ev.target.value}})
  };

  // handleChangeImages = (ev) => {
  //     const { files } = ev.target;
  //     const {images} = this.state;
  //     images.push(files)
  //     this.setState({ images, files })
  //     console.log(files)
  // };

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
    const {values, images, files, fileAttr} = this.state;
    const FileList = [];
    fileAttr.map((f, i) => FileList[i] = f.file);
    this.props.signUpRequest(FileList, {...values}, async (error, data) => {
      if (error) {
        console.error('ERROR')
        return;
      }
      this.props.history.replace('/')
    });
  };

  render() {
    const {values} = this.state;
    const {error} = this.props;

    return (
      <>
        <h1>Sign Up</h1>
        <form style={{display: 'flex', flexDirection: "column", width: '50%'}} onSubmit={this.handleSubmit}>
          <label htmlFor="first_name">first name</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'first_name')}
            type="text"
            value={values.first_name}
            id="first_name"
          />
          <label htmlFor="last_name">last name</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'last_name')}
            type="text"
            value={values.last_name}
            id="last_name"
          />
          <label htmlFor="email">email</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'email')}
            type="text"
            value={values.email}
            id="email"
          />
          <label htmlFor="phone">phone</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'phone')}
            type="text"
            value={values.phone}
            id="phone"
          />
          <label htmlFor="age">age</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'age')}
            type="text"
            value={values.age}
            id="age"
          />
          <label htmlFor="password">password</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'password')}
            type="password"
            value={values.password}
            id="password"
          />
          <label htmlFor="repeatPassword">repeat password</label>
          <input
            onChange={(ev) => this.handleChange(ev, 'repeatPassword')}
            type="password"
            value={values.repeatPassword}
            id="repeatPassword"
          />
          <label htmlFor="picture">upload picture</label>
          <input
            type="file"
            name="file"
            multiple
            id="picture"
            onChange={this.handleChangeImages}
          />
          <button type='submit'>sign in</button>
          <p style={{color: 'red'}}>{error}</p>
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
