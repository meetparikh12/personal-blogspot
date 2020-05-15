import React  from 'react'
import BlogList from './BlogList';

const BLOGS = [{
        id: 'b1',
        creator: {
            id: 'u1',
            name: 'Meet Parikh',
        },
        title: 'Food blog',
        description: 'Enim esse exercitation occaecat excepteur culpa voluptate occaecat do adipisicing irure do incididunt.',
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

export default function AllBlogs() {
        
    return <BlogList blogs={BLOGS}/>
    
}
