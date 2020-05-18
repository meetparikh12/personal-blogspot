import React, { Component } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';

export default class AddBlog extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            image: ''
            
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
    }

    fileChangeHandler(e){
        this.setState({
            image: e.target.files[0]
        })
    }

    formChangeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    formSubmitHandler(e){
        e.preventDefault();
        const blogPost = new FormData();
        blogPost.set('title', this.state.title);
        blogPost.set('description', this.state.description);
        blogPost.append('image', this.state.image);
        trackPromise(
        axios.post('http://localhost:5000/api/posts', blogPost)
        .then((res)=> {
            toast.success(res.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
            this.props.history.push('/');
        })
        .catch((err)=> toast.error(err.response.data.message[0].msg || err.response.data.message, 
            {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000}))
        )
    }
    
    render() {
        return (
            <div className="add-blog">
                <div className="container">
                  <div className="row">
                        <div className="col-md-8 m-auto">
                            {/* <a href="#" className="btn btn-light">
                                Back to Project Board
                            </a> */}
                            <h4 className="display-4 text-center">Add New Blog</h4>
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" required className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.title} name="title" placeholder="Blog Title" />
                                </div>
                                <div className="form-group">
                                    <textarea required className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.description} placeholder="Blog Description" name="description"></textarea>
                                </div>
                                <h6>Upload Photo:</h6>
                                <div className="form-group">
                                    <input type="file" requireed accept='.jpg,.png,.jpeg' placeholder = "Upload Photos" onChange={this.fileChangeHandler} className="form-control form-control-lg" name="image" />
                                </div>
                                {/* <div>
                                    <img src="data:image/jpeg;base64,"
                                </div> */}
                                <input type="submit" value="Add New Blog" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}
