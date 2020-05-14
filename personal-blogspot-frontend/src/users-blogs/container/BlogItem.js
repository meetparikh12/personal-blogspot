import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogItem.css';

export default class BlogItem extends Component {
    render() {
        return (
                <li className="blog-item">
                    <div className="container">
                        {/* <div className="card">
                            <div className="row ">
                                <div className="col-md-4">
                                    <img src={this.props.image} className="w-100"/>
                                </div>
                                <div className="col-md-8 px-3">
                                    <small className="text-muted"><i>Posted by <b>{this.props.creator}</b> on {this.props.createdAt}</i></small>
                                    <hr/>
                                    <div className="card-block px-3">
                                    <h4 className="card-title">{this.props.title}</h4>
                                    <p className="card-text">{this.props.description}</p>
                                    <a href="#" className="btn btn-outline-danger">Read More</a>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                        <div class="card border-dark mb-5">
                            <div class="card-header"><i>Posted by <b>{this.props.creator.name}</b> on {this.props.createdAt}</i></div>
                            <div class="card-body blog-item__info">
                                <h2 class="card-title"><b>{this.props.title}</b></h2>
                                <p class="card-text">{this.props.description}</p>
                                <Link to={`/blog/${this.props.creator.id}`} className="btn btn-outline-danger">Read More</Link>

                            </div>
                        </div>
                    </div>
                </li>
        )
    }
}
