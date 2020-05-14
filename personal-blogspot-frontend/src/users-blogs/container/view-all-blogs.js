import React  from 'react'
import BlogList from './BlogList';

const BLOGS = [
    {
        id: 'b1',
        creator: {
            id: 'u1',
            name: 'Meet Parikh',
        },
        title: 'Food blog',
        description:'Ad velit sit mollit sunt id dolor reprehenderit.',
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
    }
]
export default function AllBlogs() {
        
    return <BlogList blogs={BLOGS}/>
    
}
