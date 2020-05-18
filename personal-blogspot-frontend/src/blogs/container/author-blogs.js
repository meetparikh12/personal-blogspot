import React, { Component } from 'react'
import BlogList from '../../users-blogs/container/BlogList';
import Axios from 'axios';
import { connect } from 'react-redux';

class AuthorBlogs extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.userInfo.userId,
            blogs: []
        }
    }
    componentDidMount(){
        Axios.get(`http://localhost:5000/api/posts/user/${this.props.match.params.userId}`)
        .then((res)=>{
            this.setState({
                blogs: res.data.posts
            })
        })
        .catch((err)=> console.log(err.response.data));
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