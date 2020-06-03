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
            blogId : this.props.match.params.blogId,
            likes: 0
        }

        this.likePostHandler = this.likePostHandler.bind(this);
        this.unlikePostHandler = this.unlikePostHandler.bind(this);

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
                image: res.data.post.image,
                likes: res.data.post.likes
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

    likePostHandler(){
        if(!this.props.userInfo.userId){
            toast.error('Please Login to like the post', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }else {
            axios.patch(`http://localhost:5000/api/posts/${this.state.id}/${this.props.userInfo.userId}/like`)
            .then((res)=> {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                })
                this.setState({
                    likes: res.data.likes
                })
            })
            .catch((err)=> {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                })
            })
        }
    }

    unlikePostHandler(){
        if(!this.props.userInfo.userId){
            toast.error('Please Login to like the post', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }else {
            axios.patch(`http://localhost:5000/api/posts/${this.state.id}/${this.props.userInfo.userId}/unlike`)
            .then((res)=> {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                })
                this.setState({
                    likes: res.data.likes
                })
            })
            .catch((err)=> {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                })
            })
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
                        {this.state.likes}
                        <i className="fa fa-thumbs-up ml-2 mr-3 text-secondary" style={{cursor: "pointer"}} onClick={this.likePostHandler} aria-hidden="true"></i>   
                        <i className="fa fa-thumbs-down text-secondary" style={{cursor: "pointer"}} onClick={this.unlikePostHandler} aria-hidden="true"></i> 
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