import React from 'react'
import BlogItem from './BlogItem';
import Card from '../../shared/components/UIElements/Card';
import './BlogList.css'
export default function BlogList(props) {
    
    if(props.blogs.length === 0) {
        return (
            <div className="blog-list center">  
                <Card>
                    <h2>No blogs found.</h2>
                </Card>  
            </div> 
    )} else {
        return (
            <ul className="blog-list">
                {props.blogs.map((blog) => 
                    <BlogItem key={blog._id}
                        id={blog._id}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        creator={blog.creator}
                        date = {(new Date(blog.createdAt).toDateString('en-US')).substr(4)}
                    />
            )}
            </ul>
        )}
}
