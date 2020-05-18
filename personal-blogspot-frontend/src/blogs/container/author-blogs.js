import React, { Component } from 'react'
import BlogList from '../../users-blogs/container/BlogList';
import Axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';

class AuthorBlogs extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.userInfo.userId,
            blogs: []
        }
    }
    componentDidMount(){
        trackPromise(
        Axios.get(`http://localhost:5000/api/posts/user/${this.props.match.params.userId}`)
        .then((res)=>{
            this.setState({
                blogs: res.data.posts
            })
        })
        .catch((err)=> toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT}))
        )
    }

    render() {
        return (<BlogList blogs={this.state.blogs}/>)
    }
}

const mapStateToProps = state => {
    return {
        userInfo : state.user.userInfo
    }
}
export default connect(mapStateToProps, null)(AuthorBlogs);