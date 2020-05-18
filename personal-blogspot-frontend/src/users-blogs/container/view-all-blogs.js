import React  from 'react'
import BlogList from './BlogList';
import {connect} from 'react-redux';
import axios from 'axios';
import {getAllPosts} from '../../actions/actions';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';

class AllBlogs extends React.Component {
    componentDidMount(){
        trackPromise(
        axios.get('http://localhost:5000/api/posts')
        .then((res)=> {
            this.props.setPosts(res.data.posts);
        })
        .catch((err)=> toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT})))
    }
    render() {
        const  {posts} = this.props;
        return <BlogList blogs={posts}/> 
    }
}
const mapStateToProps = state => {
    return {
        posts: state.blogs.posts
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        setPosts: (posts)=> {dispatchEvent(getAllPosts(posts));}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllBlogs);
