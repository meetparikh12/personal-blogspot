import React, { Component } from 'react'
import { Link} from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import axios from 'axios';
import { toast } from 'react-toastify';
import setJwtToken from '../../shared/securityUtils/setJwtToken';
import jwt_decode from 'jwt-decode';
import { setUserInfo } from '../../actions/actions';
import { connect} from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

toast.configure();

class login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }
    formChangeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    formSubmitHandler(e) {
        e.preventDefault();
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }
        trackPromise(
        axios.post('http://localhost:5000/api/users/login', loginUser)
        .then((res)=> {
            const {token} = res.data;
            localStorage.setItem('jwt-token', token);
            setJwtToken(token);
            const decode_token = jwt_decode(token);
            this.props.setUserInfo(decode_token, this.props.history);
            toast.success("Hi, Welcome Back!", {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
        })
        .catch((err)=> toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000})))
    }
    render() {
        return (
            <div className="container">
                <Card className="login">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="form-group">
                                    <input type="email" required className="form-control form-control-lg" onChange={this.formChangeHandler} value={this.state.email} placeholder="Email Address" name="email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" required className="form-control form-control-lg" onChange={this.formChangeHandler} value={this.state.password}  placeholder="Password" name="password" />
                                </div>
                                <input type="submit" value="Login" className="btn btn-info btn-block mt-4" />
                                <Link to="/register" style={{"textDecoration": "none"}}><button type="button" className="btn btn-outline-info btn-block mt-4">Sign up</button></Link>
                                <br/>
                            </form>
                        </div>
                    </div>
                </Card>       
             </div> 
        )
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        setUserInfo: (userInfo, history) => {
            dispatchEvent(setUserInfo(userInfo))
            history.push('/');
        }
    }
}
export default connect(null, mapDispatchToProps)(login);