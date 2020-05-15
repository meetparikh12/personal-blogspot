import React from "react";
import { Link} from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
export default class Register extends React.Component {
    render() {
        return (
                <div className="container">
                    <Card className="register">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Name" name="name"
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg" required  placeholder="Email Address" name="email" />

                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" required placeholder="Password" name="password" />
                                </div>

                                <input type="submit" value="Sign up" className="btn btn-info btn-block mt-4" />
                                <Link to="/" style={{"textDecoration": "none"}}><button type="button"  className="btn btn-outline-info btn-block mt-4">Login</button></Link>
                                <br/>
                            </form>
                        </div>
                    </div>
                    </Card>
                </div>
       
        );
    };
}