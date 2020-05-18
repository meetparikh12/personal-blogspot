import React from "react";
import { Link} from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email: "",
            password: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }
    formChangeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formSubmitHandler(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:5000/api/users/register', newUser)
        .then((res)=> {
            toast.success(res.data.message, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000});
            this.props.history.push('/login');
        })
        .catch((err)=> toast.error(err.response.data.message[0].msg || err.response.data.message, 
            {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000}));
    }
    render() {
        return (
                <div className="container">
                    <Card className="register">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" onChange={this.formChangeHandler} value={this.state.name} placeholder="Name" name="name"
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg" required onChange={this.formChangeHandler} value={this.state.email} placeholder="Email Address" name="email" />

                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" required onChange={this.formChangeHandler} value={this.state.password} placeholder="Password" name="password" />
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