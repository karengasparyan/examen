import React, {Component} from 'react';
import {connect} from "react-redux";
import WrapperSign from "../Components/WrapperSign";
import _ from "lodash";
import {addEventRequest, singleEventRequest, updateEventRequest} from "../store/actions/events";
import Account from "../helpers/Account";
import memoizeOne from "memoize-one";
import axios from "axios";

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            deleteImages: [],
            errors: {
                title: '',
                description: '',
                limit: '',
                // status: '',
                duration: '',
                file: '',
                address: ''
            },
            fileAttr: [],
        }
    }


    handleChange = (ev, i) => {
        const values = {...this.state.values, [i]: ev.target.value};
        this.setState({values})
    };

    handleChangeImages = (ev) => {
        const {fileAttr} = this.state;
        const {files} = ev.target;
        for (let i = 0; i < files.length; i++) {
            fileAttr.push({
                path: URL.createObjectURL(files[i]),
                file: files[i],
            })
        }

        this.setState({fileAttr})
    };

    handleSubmitAdd = (ev) => {
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
                    // errors.status = this.props.error.status;
                    errors.duration = this.props.error.duration;
                    errors.address = this.props.error.address;
                    errors.file = 'The title field is mandatory.';
                    this.setState({errors})
                }
                return;
            }
            this.props.history.replace('/account')
        });
    };

    handleSubmitEdit = (ev) => {
        ev.preventDefault();
        const {values, fileAttr, deleteImages} = this.state;
        const {match: {params: eventId}} = this.props;
        const FileList = [];
        const errors = {};
        const user = Account.getAccount();
        const event = Account.getEvents();
        fileAttr.map((f, i) => FileList[i] = f.file);

        values.userId = user._id;
        values.eventId = event._id;
        delete values.previewDeleteImages;
        values.deleteImages = deleteImages;

        this.props.updateEventRequest(FileList, values, async (error, data) => {
            if (error) {
                delete values.userId;
                delete values.eventId;

                if (_.isEmpty(values)) {
                    errors.title = this.props.error.title;
                    errors.description = this.props.error.description;
                    errors.limit = this.props.error.limit;
                    // errors.status = this.props.error.status;
                    errors.duration = this.props.error.duration;
                    errors.address = this.props.error.address;
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
            // case 'status':
            //     errors.status = value.length ? '' : 'Status is required';
            //     break;
            case 'duration':
                errors.status = value.length ? '' : 'Duration is required';
                break;
            case 'address':
                errors.address = value.length ? '' : 'Address is required';
                break;
            case 'file':
                errors.file = fileAttr && _.isEmpty(fileAttr) ? 'Image is required' : '';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});
    };

    removePreviewImage = (removeImage) => {
        const {fileAttr} = this.state;

        const index = fileAttr?.indexOf(removeImage);

        if (index > -1) {
            fileAttr.splice(index, 1);
            this.setState({fileAttr, uploadImageCount: fileAttr?.length})
        }
    };

    removeImage = (removeImage) => {
        const {values: {previewDeleteImages}, deleteImages} = this.state;

        const index = previewDeleteImages?.indexOf(removeImage);

        if (index > -1) {
            previewDeleteImages.splice(index, 1);
            deleteImages.push(removeImage);
            this.setState({previewDeleteImages, removeImage})
        }
    };

    initEvent = memoizeOne((singleEvent) => {
        if (singleEvent) {
            const values = {};
            values.title = singleEvent.title;
            values.description = singleEvent.description;
            values.limit = singleEvent.limit;
            // values.status = singleEvent.status;
            values.duration = singleEvent.duration;
            values.address = singleEvent.address;
            values.previewDeleteImages = singleEvent.image;
            this.setState({values})
        }
    }, _.isEqual);

    render() {
        const {values, errors, fileAttr} = this.state;
        const {error, singleEvent, match: {params: eventId}} = this.props;

        const edit = !!eventId.eventId;

        if (edit) {
            this.initEvent(singleEvent)
        }
        return (
            <WrapperSign>
                <div className="formContainer">
                    <form className="signForm" onSubmit={edit ? this.handleSubmitEdit : this.handleSubmitAdd}>
                        <h1 className="titles">Add event</h1>
                        <label className="labels" htmlFor="title">Title</label>
                        <input
                            onChange={(ev) => this.handleChange(ev, 'title')}
                            onBlur={this.inputValidate}
                            type="text"
                            value={values.title}
                            id="title"
                            name="title"
                            className="inputs"
                        />
                        <p className="errors">{errors.title}</p>
                        <label className="labels" htmlFor="description">Description</label>
                        <input
                            onChange={(ev) => this.handleChange(ev, 'description')}
                            onBlur={this.inputValidate}
                            type="text"
                            value={values.description}
                            id="description"
                            name="description"
                            className="inputs"
                        />
                        <p className="errors">{errors.description}</p>
                        <label className="labels" htmlFor="limit">Limit</label>
                        <input
                            onChange={(ev) => this.handleChange(ev, 'limit')}
                            onBlur={this.inputValidate}
                            type="number"
                            value={values.limit}
                            id="limit"
                            name="limit"
                            className="inputs"
                        />
                        <p className="errors">{errors.limit}</p>
                        {/*<label className="labels" htmlFor="status">Status</label>*/}
                        {/*<input*/}
                        {/*    onChange={(ev) => this.handleChange(ev, 'status')}*/}
                        {/*    onBlur={this.inputValidate}*/}
                        {/*    type="text"*/}
                        {/*    value={values.status}*/}
                        {/*    id="status"*/}
                        {/*    name="status"*/}
                        {/*    className="inputs"*/}
                        {/*/>*/}
                        {/*<p className="errors">{errors.status}</p>*/}
                        <label className="labels" htmlFor="duration">Duration</label>
                        {/*<input*/}
                        {/*    onChange={(ev) => this.handleChange(ev, 'duration')}*/}
                        {/*    onBlur={this.inputValidate}*/}
                        {/*    type="datetime-local"*/}
                        {/*    value={values.duration}*/}
                        {/*    id="duration"*/}
                        {/*    name="duration"*/}
                        {/*    className="inputs"*/}
                        {/*/> */}
                        <input
                            onChange={(ev) => this.handleChange(ev, 'duration')}
                            onBlur={this.inputValidate}
                            type="number"
                            value={values.duration}
                            id="duration"
                            name="duration"
                            className="inputs"
                        />
                        <p className="errors">{errors.duration}</p>
                        <label className="labels" htmlFor="duration">Address</label>
                        <input
                            onChange={(ev) => this.handleChange(ev, 'address')}
                            onBlur={this.inputValidate}
                            type="text"
                            value={values.address}
                            id="address"
                            name="address"
                            className="inputs"
                        />
                        <p className="errors">{errors.address}</p>
                        <label className="labels" htmlFor="image">Upload image</label>
                        <input
                            type="file"
                            name="file"
                            multiple
                            id="image"
                            onChange={(ev) => {
                                this.handleChangeImages(ev);
                                this.inputValidate(ev);
                            }}
                        />
                        <div className="previewImages">
                            {fileAttr?.map((f, i) => <div key={f.path} className="imageContainer">
                                <img
                                    key={i}
                                    className="imagePreview"
                                    src={f.path}
                                    alt={`image${i}`}
                                />
                                <span
                                    onClick={() => this.removePreviewImage(f)}
                                    className="deleteImageButton"
                                    title="delete"
                                >x</span>
                            </div>)}
                        </div>
                        {edit && <div className="previewImages">
                            {singleEvent.image?.map((i) => <div key={i} className="imageContainer">
                                <img
                                    className="imagePreview"
                                    src={`http://localhost:4000/eventImage/folder_${singleEvent._id}/${i}`}
                                    alt={`image${i}`}
                                />
                                <span
                                    onClick={() => this.removeImage(i)}
                                    className="deleteImageButton"
                                    title="delete"
                                >x</span>
                            </div>)}
                        </div>}
                        <div>
                            <p className="errors">{errors.file}</p>
                            {edit ? <button className="buttons" type='submit'>Save Change</button> :
                                <button className="buttons" type='submit'>Add</button>}
                        </div>
                        <span className="errors">{error.title}</span>
                        <span className="errors">{error.description}</span>
                        <span className="errors">{error.limit}</span>
                        <span className="errors">{error.status}</span>
                        <span className="errors">{error.duration}</span>
                    </form>
                </div>
            </WrapperSign>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.events.error,
    singleEvent: state.events.singleEvent,
});
const mapDispatchToProps = {
    addEventRequest,
    updateEventRequest,
    singleEventRequest,
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddEvent);

export default Container;
