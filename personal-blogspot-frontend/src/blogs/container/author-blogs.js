import React, { Component } from 'react'
import BlogList from '../../users-blogs/container/BlogList';
const BLOGS = [{
        id: 'b1',
        creator: {
            id: 'u1',
            name: 'Meet Parikh',
        },
        title: 'Food blog',
        description: 'Ad velit sit mollit sunt id dolor reprehenderit.',
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
        description: 'Velit non veniam ex aliqua quis et dolor. Ea ipsum reprehenderit id est. Tempor officia eu cupidatat id cillum non elit est sunt nostrud Lorem dolor est do.',
        image: "https://i.pinimg.com/originals/67/5b/f3/675bf3201ed1b6c2c0276a1186ef5f63.jpg",
        date: new Date().toLocaleDateString('en-US')
    },
    {
        id: 'b3',
        creator: {
            id: 'u1',
            name: 'Meet Parikh'
        },
        title: 'Travel Blog',
        description: 'Velit non veniam ex aliqua quis et dolor. Ea ipsum reprehenderit id est. Tempor officia eu cupidatat id cillum non elit est sunt nostrud Lorem dolor est do.',
        image: "https://www.ithaka.travel/blog/wp-content/uploads/2017/10/Featured-Image-15-740x493.jpg",
        date: new Date().toLocaleDateString('en-US')
    }
]

export default class AuthorBlogs extends Component {
    render() {
        const { userId } = this.props.match.params;
        const USER_BLOGS = BLOGS.filter(blog=> userId === blog.creator.id);
        console.log(USER_BLOGS);
        return (<BlogList blogs={USER_BLOGS}/>)
    }
}
