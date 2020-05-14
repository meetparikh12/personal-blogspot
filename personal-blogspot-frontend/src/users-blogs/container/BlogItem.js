import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogItem.css';

export default class BlogItem extends Component {
    render() {
        return (
                <li className="blog-item">
                    <div className="container">
                        <div className="card border-danger mb-3" style={{width: '100%'}}>
                            <div className="blog-item__image">
                                <img className="card-img-top" src={this.props.image} alt="Food blog"/>
                            </div>
                            <div className="card-body blog-item__info">
                                <h4 className="card-title">{this.props.title}</h4>
                                <p className="card-text"><small className="text-muted">Posted by {this.props.creator} on {this.props.createdAt} </small></p>
                                <p className="card-text">{this.props.description}</p>
                                <a href=" " className="btn btn-outline-danger">Read more</a>
                            </div>
                        </div>
                    </div>
                </li>
        )
    }
}
