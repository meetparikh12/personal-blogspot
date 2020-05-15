import React, { Component } from 'react'

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
        const blogPost = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image
        }

        console.log(blogPost);
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
                                    <input type="file" accept='.jpg,.png,.jpeg' placeholder = "Upload Photos" onChange={this.fileChangeHandler} className="form-control form-control-lg" name="image" />
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
