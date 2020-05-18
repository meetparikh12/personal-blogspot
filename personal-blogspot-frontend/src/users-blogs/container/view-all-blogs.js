import React  from 'react'
import BlogList from './BlogList';
import {connect} from 'react-redux';
import axios from 'axios';
import {getAllPosts} from '../../actions/actions';

class AllBlogs extends React.Component {
    componentDidMount(){
        axios.get('http://localhost:5000/api/posts')
        .then((res)=> {
            console.log(res.data);
            this.props.setPosts(res.data.posts);
        })
        .catch((err)=> console.log(err.response.data));
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
