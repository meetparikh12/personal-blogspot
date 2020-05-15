import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogItem.css';

const MAX_LENGTH = 150;
export default class BlogItem extends Component {
    render() { 
        return (
            <li className="blog-item">
                <div className="container">
                    <div className="card border-dark mb-5">
                        <div className="card-header"><i>Posted by <b>{this.props.creator.name}</b> on {this.props.createdAt}</i></div>
                        <div className="card-body blog-item__info">
                            <h2 className="card-title"><b>{this.props.title}</b></h2>
                            {this.props.description.length> MAX_LENGTH ? 
                            <p className="card-text">{this.props.description.substring(0,MAX_LENGTH)+'[...]'}</p> :
                            <p className="card-text">{this.props.description}</p>                             
                            }
                            <Link to={`/blog/${this.props.id}/${this.props.creator.id}`} className="btn btn-outline-danger">Read More</Link>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
