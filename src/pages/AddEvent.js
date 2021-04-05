import React, {Component} from 'react';
import {connect} from "react-redux";
import WrapperSign from "../Components/WrapperSign";
import _ from "lodash";
import {addEventRequest} from "../store/actions/events";
import Account from "../helpers/Account";

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            errors: {
                title: '',
                description: '',
                limit: '',
                status: '',
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
        const user = Account.getAccount();
        fileAttr.map((f, i) => FileList[i] = f.file);

        values.userId = user._id;

        this.props.addEventRequest(FileList, {...values}, async (error, data) => {
            if (error) {
                delete values.userId;

                if (_.isEmpty(values)) {
                    errors.title = this.props.error.title;
                    errors.description = this.props.error.description;
                    errors.limit = this.props.error.limit;
                    errors.status = this.props.error.status;
                    errors.file = 'The title field is mandatory.';
                    this.setState({errors})
                }
                return;
            }
            this.props.history.replace('/account')
        });
    };

    inputValidate = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        const {errors, fileAttr} = this.state;

        switch (name) {
            case 'title':
                errors.title = value.length ? '' : 'Title is required';
                break;
            case 'description':
                errors.description = value.length ? '' : 'Description is required';
                break;
            case 'limit':
                errors.limit = value.length ? '' : 'Limit is required';
                break;
            case 'status':
                errors.status = value.length ? '' : 'Status is required';
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
            <WrapperSign>
                <h1>Add Event</h1>
                <form style={{display: 'flex', flexDirection: "column", width: '50%'}} onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                      onChange={(ev) => this.handleChange(ev, 'title')}
                      onBlur={this.inputValidate}
                      type="text"
                      value={values.title}
                      id="title"
                      name="title"
                    />
                    <p className="errors">{errors.title}</p>
                    <label htmlFor="description">Description</label>
                    <input
                      onChange={(ev) => this.handleChange(ev, 'description')}
                      onBlur={this.inputValidate}
                      type="text"
                      value={values.description}
                      id="description"
                      name="description"
                    />
                    <p className="errors">{errors.description}</p>
                    <label htmlFor="limit">Limit</label>
                    <input
                      onChange={(ev) => this.handleChange(ev, 'limit')}
                      onBlur={this.inputValidate}
                      type="limit"
                      value={values.limit}
                      id="limit"
                      name="limit"
                    />
                    <p className="errors">{errors.limit}</p>
                    <label htmlFor="status">Status</label>
                    <input
                      onChange={(ev) => this.handleChange(ev, 'status')}
                      onBlur={this.inputValidate}
                      type="text"
                      value={values.status}
                      id="status"
                      name="status"
                    />
                    <p className="errors">{errors.status}</p>
                    <label htmlFor="image">Upload image</label>
                    <input
                      type="file"
                      name="file"
                      multiple
                      id="image"
                      onChange={this.handleChangeImages}
                      onBlur={this.inputValidate}
                    />
                    <p className="errors">{errors.file}</p>
                    <button type='submit'>ADD</button>
                    <p className="errors">{error.title}</p>
                    <p className="errors">{error.description}</p>
                    <p className="errors">{error.limit}</p>
                    <p className="errors">{error.status}</p>
                </form>
            </WrapperSign>
        );
    }
}


const mapStateToProps = (state) => ({
    error: state.events.error,
});
const mapDispatchToProps = {
    addEventRequest
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddEvent);

export default Container;
