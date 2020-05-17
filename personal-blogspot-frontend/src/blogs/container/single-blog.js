import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import './single-blog.css';

class SingleBlog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            creator: {
                id: '',
                name: ''
            },
            createdAt: '',
            title: '',
            description: '',
            image: '',
            blogId : this.props.match.params.blogId
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:5000/api/posts/${this.state.blogId}`)
        .then((res)=> {
            this.setState({
                id: res.data.post._id,
                creator: {
                    id: res.data.post.creator.id,
                    name: res.data.post.creator.name,
                },
                createdAt: res.data.post.createdAt,
                title: res.data.post.title,
                description: res.data.post.description,
                image: res.data.post.image
               
            })
        })
        .catch((err)=> console.log(err.response.data));
    }
    deleteBlogHandler(){
        if(window.confirm('Do you want to delete this blog? Please note that it cannot be undone.')) {
            console.log('Your blog is deleted.')
            this.props.history.push("/all-blogs");
        }
     
    }
    render(){
        
        return (
            <div className="container blog-post">
                <div className="card mb-5">
                    <div className="blog-post__image">
                        <img className="card-img-top" src={`http://localhost:5000/${this.state.image}`} alt="Blog post"/>
                    </div>
                    <div className="card-body blog-post__info">
                        <h2 className="card-title"><b>{this.state.title}</b></h2>
                        <p className="card-text text-justify">{this.state.description}</p>
                        {(this.props.userInfo.userId === this.state.creator.id) && <Link to={`/blog/${this.state.blogId}`}><button className="btn btn-outline-info mr-3">EDIT BLOG</button></Link>}
                        {(this.props.userInfo.userId === this.state.creator.id) && <button className="btn btn-outline-danger" onClick={this.deleteBlogHandler.bind(this)}>DELETE </button>}
                        <hr/>
                        <p className="card-text"><small className="text-muted text-left"><i>Posted by <b>{this.state.creator.name}</b> on {this.state.createdAt}</i></small></p>
                    </div>
                </div>
           </div>       
    )}
}
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    }
}
export default connect(mapStateToProps,null)(SingleBlog);