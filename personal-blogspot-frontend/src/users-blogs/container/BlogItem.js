import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogItem.css';

const MAX_LENGTH = 150;
export default class BlogItem extends Component {
    render() { 
        return (
            <li className="blog-item">
            <div className="container py-3">
                <div className="card">
                <div className="row ">
                    <div className="col-md-4">
                        <img src={`http://localhost:5000/${this.props.image}`} alt="Blog post" className="w-100"/>
                    </div>
                    <div className="col-md-8 px-3">
                        <div className="card-block px-3">
                        <h2 className="card-title"><b>{this.props.title}</b></h2>
                        {this.props.description.length> MAX_LENGTH ? 
                        <p className="card-text">{this.props.description.substring(0,MAX_LENGTH)+'[...]'}</p> :
                        <p className="card-text">{this.props.description}</p>                             
                        }
                        <Link to={`/blog/user/${this.props.id}`} className="btn btn-outline-danger">Read More</Link>

                        <hr/>
                        <p className="card-text"><small className="text-muted text-left"><i>Posted by <b>{this.props.creator}</b> on {this.props.date}</i></small></p>

                        </div>
                    </div>

                    </div>
                </div>
                </div>
           
                {/* <div className="container">
                    <div className="card border-dark mb-5">
                        <div className="card-header"><i>Posted by <b>{this.props.creator}</b> on {this.props.date}</i></div>
                        <div className="card-body blog-item__info">
                            <h2 className="card-title"><b>{this.props.title}</b></h2>
                            {this.props.description.length> MAX_LENGTH ? 
                            <p className="card-text">{this.props.description.substring(0,MAX_LENGTH)+'[...]'}</p> :
                            <p className="card-text">{this.props.description}</p>                             
                            }
                            <Link to={`/blog/user/${this.props.id}`} className="btn btn-outline-danger">Read More</Link>
                        </div>
                    </div>
                </div> */}
            </li>
        )
    }
}
