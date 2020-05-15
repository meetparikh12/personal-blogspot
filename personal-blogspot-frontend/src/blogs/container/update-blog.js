import React, { Component } from 'react'

export default class UpdateBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            description: ''
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);  
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }
    
    formChangeHandler(event){
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    formSubmitHandler(event) {
        event.preventDefault();
        const updatedBlogPost = {
            title: this.state.title,
            description: this.state.description,
        }
        console.log(updatedBlogPost);
    }
    render() {
        return (
            <div className="update-blog">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            {/* <a href="#" className="btn btn-light">
                                Back to Project Board
                            </a> */}
                            <h4 className="display-4 text-center">Update Your Blog</h4>
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="form-group">
                                    <input required type="text" className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.title} name="title" placeholder="Blog Title" />
                                </div>
                                <div className="form-group">
                                    <textarea required className="form-control form-control-lg"  onChange = {this.formChangeHandler} value={this.state.description} placeholder="Blog Description" name="description"></textarea>
                                </div>
                                <input type="submit" value="Update Blog" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
