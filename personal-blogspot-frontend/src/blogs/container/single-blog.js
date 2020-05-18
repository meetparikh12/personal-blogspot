import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {deletePost} from '../../actions/actions';
import './single-blog.css';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';
import PropTypes from 'prop-types';

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
        trackPromise(
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
        .catch((err)=> toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT})))
    }
    deleteBlogHandler(){
        if(window.confirm('Do you want to delete this blog? Please note that it cannot be undone.')) {
            trackPromise(
            axios.delete(`http://localhost:5000/api/posts/${this.state.id}`)
            .then((res)=> {
                toast.success(res.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000})
                this.props.deletePost(this.state.id, this.props.history);
            }).catch((err)=> {
                toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000})
            }))
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
                        {(this.props.userInfo.userId === this.state.creator.id) && <Link to={`/blog/update/${this.state.blogId}`}><button className="btn btn-outline-info mr-3">EDIT BLOG</button></Link>}
                        {(this.props.userInfo.userId === this.state.creator.id) && <button className="btn btn-outline-danger" onClick={this.deleteBlogHandler.bind(this)}>DELETE </button>}
                        <hr/>
                        <p className="card-text"><small className="text-muted text-left"><i>Posted by <b>{this.state.creator.name}</b> on {this.state.createdAt}</i></small></p>
                    </div>
                </div>
           </div>       
    )}
}

SingleBlog.propTypes = {
    userInfo: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        deletePost : (postId, history) => {
            dispatchEvent(deletePost(postId));
            history.push('/');
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleBlog);