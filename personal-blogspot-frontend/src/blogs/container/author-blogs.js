import React, { Component } from 'react'
import BlogList from '../../users-blogs/container/BlogList';
import Axios from 'axios';
import { connect } from 'react-redux';
// const BLOGS = [{
//         id: 'b1',
//         creator: {
//             id: 'u1',
//             name: 'Meet Parikh',
//         },
//         title: 'Food blog',
//         description: 'Ad velit sit mollit sunt id dolor reprehenderit.',
//         image: "https://blog.feedspot.com/wp-content/uploads/2016/10/Food-Blogs-1.jpg",
//         date: new Date().toLocaleDateString('en-US')
//     },
//     {
//         id: 'b2',
//         creator: {
//             id: 'u2',
//             name: 'Mansi Parikh'
//         },
//         title: 'Fashion Blog',
//         description: 'Velit non veniam ex aliqua quis et dolor. Ea ipsum reprehenderit id est. Tempor officia eu cupidatat id cillum non elit est sunt nostrud Lorem dolor est do.',
//         image: "https://i.pinimg.com/originals/67/5b/f3/675bf3201ed1b6c2c0276a1186ef5f63.jpg",
//         date: new Date().toLocaleDateString('en-US')
//     },
//     {
//         id: 'b3',
//         creator: {
//             id: 'u1',
//             name: 'Meet Parikh'
//         },
//         title: 'Travel Blog',
//         description: 'Velit non veniam ex aliqua quis et dolor. Ea ipsum reprehenderit id est. Tempor officia eu cupidatat id cillum non elit est sunt nostrud Lorem dolor est do.',
//         image: "https://www.ithaka.travel/blog/wp-content/uploads/2017/10/Featured-Image-15-740x493.jpg",
//         date: new Date().toLocaleDateString('en-US')
//     }
// ]

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