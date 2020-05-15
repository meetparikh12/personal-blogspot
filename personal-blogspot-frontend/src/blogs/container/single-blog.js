import React from 'react'
import {Link} from 'react-router-dom';

import './single-blog.css';
const BLOGS = [{
        id: 'b1',
        creator: {
            id: 'u1',
            name: 'Meet Parikh',
        },
        title: 'Food blog',
        description: 'Ipsum fugiat duis proident anim proident ipsum tempor eu Lorem Lorem non minim irure. Ad minim commodo nisi consequat officia deserunt ullamco quis. Do officia ipsum non ullamco dolore qui anim ut cupidatat quis ullamco culpa consectetur. Aute velit excepteur eiusmod quis ipsum aliqua consequat laboris ex eiusmod et eiusmod sunt. Nostrud reprehenderit ea cillum adipisicing laborum cillum Lorem magna. Aliquip consectetur elit qui ipsum magna consequat commodo id irure exercitation commodo Lorem Lorem Lorem Velit non veniam ex aliqua quis et dolor. Ea ipsum reprehenderit id est. Tempor officia eu cupidatat id cillum non elit est sunt nostrud Lorem dolor est do.',
        image: "https://blog.feedspot.com/wp-content/uploads/2016/10/Food-Blogs-1.jpg",
        date: new Date().toLocaleDateString('en-US')
    },
    {
        id: 'b2',
        creator: {
            id: 'u2',
            name: 'Mansi Parikh'
        },
        title: 'Fashion Blog',
        description: 'Ipsum fugiat duis proident anim proident ipsum tempor eu Lorem Lorem non minim irure. Ad minim commodo nisi consequat officia deserunt ullamco quis. Do officia ipsum non ullamco dolore qui anim ut cupidatat quis ullamco culpa consectetur. Aute velit excepteur eiusmod quis ipsum aliqua consequat laboris ex eiusmod et eiusmod sunt. Nostrud reprehenderit ea cillum adipisicing laborum cillum Lorem magna. Aliquip consectetur elit qui ipsum magna consequat commodo id irure exercitation commodo Lorem Lorem Lorem Velit non veniam ex aliqua quis et dolor. Ea ipsum reprehenderit id est. Tempor officia eu cupidatat id cillum non elit est sunt nostrud Lorem dolor est do.',
        image: "https://i.pinimg.com/originals/67/5b/f3/675bf3201ed1b6c2c0276a1186ef5f63.jpg",
        date: new Date().toLocaleDateString('en-US')
    },
    {
        id: 'b3',
        creator: {
            id: 'u1',
            name: 'Udit Pandya'
        },
        title: 'Travel Blog',
        description: 'Ipsum fugiat duis proident anim proident ipsum tempor eu Lorem Lorem non minim irure. Ad minim commodo nisi consequat officia deserunt ullamco quis. Do officia ipsum non ullamco dolore qui anim ut cupidatat quis ullamco culpa consectetur. Aute velit excepteur eiusmod quis ipsum aliqua consequat laboris ex eiusmod et eiusmod sunt. Nostrud reprehenderit ea cillum adipisicing laborum cillum Lorem magna. Aliquip consectetur elit qui ipsum magna consequat commodo id irure exercitation commodo Lorem Lorem Lorem Velit non veniam ex aliqua quis et dolor. Ea ipsum reprehenderit id est. Tempor officia eu cupidatat id cillum non elit est sunt nostrud Lorem dolor est do.',
        image: "https://www.ithaka.travel/blog/wp-content/uploads/2017/10/Featured-Image-15-740x493.jpg",
        date: new Date().toLocaleDateString('en-US')
    }
]

class SingleBlog extends React.Component {

    deleteBlogHandler(){
        if(window.confirm('Do you want to delete this blog? Please note that it cannot be undone.')) {
            console.log('Your blog is deleted.')
            this.props.history.push("/all-blogs");
        }
     
    }
    render(){
        const {blogId} = this.props.match.params;
        const currentBlog = BLOGS.find((blog)=> blog.id === blogId);
        return (
            <div className="container blog-post">
                <div className="card mb-5">
                    <div className="blog-post__image">
                        <img className="card-img-top" src={currentBlog.image} alt="Blog post"/>
                    </div>
                    <div className="card-body blog-post__info">
                        <h2 className="card-title"><b>{currentBlog.title}</b></h2>
                        <p className="card-text text-justify">{currentBlog.description}</p>
                        <Link to={`/blog/${this.props.match.params.blogId}`}><button className="btn btn-outline-info mr-3">EDIT BLOG</button></Link>
                        <button className="btn btn-outline-danger" onClick={this.deleteBlogHandler.bind(this)}>DELETE </button>
                        <hr/>
                        <p className="card-text"><small className="text-muted text-left"><i>Posted by <b>{currentBlog.creator.name}</b> on {currentBlog.date}</i></small></p>
                    </div>
                </div>
           </div>       
    )}
}
export default SingleBlog;