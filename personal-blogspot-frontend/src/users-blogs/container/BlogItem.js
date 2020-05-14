import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogItem.css';

export default class BlogItem extends Component {
    render() {
        return (
            <li className="blog-item">
                <div className="container">
                    <div className="card border-dark mb-5">
                        <div className="card-header"><i>Posted by <b>{this.props.creator.name}</b> on {this.props.createdAt}</i></div>
                        <div className="card-body blog-item__info">
                            <h2 className="card-title"><b>{this.props.title}</b></h2>
                            <p className="card-text">{this.props.description}</p>
                            <Link to={`/blog/${this.props.creator.id}`} className="btn btn-outline-danger">Read More</Link>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
