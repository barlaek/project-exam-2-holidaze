import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUrl } from "../api/endpoints";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../App";

const schema = yup.object({
    email: yup
        .string()
        .email()
        .required('Please use a valid email'),
    password: yup
        .string()
        .required('Please enter your password'),
}).required();

// Sends post request to the endpoint and store JWT to localstorage and updates state
export function Login() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    function onSubmit(input) {
        const body = {
            email: input.email,
            password: input.password,
        }

        fetch(`${loginUrl}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body),
        }).then(response => response.json())
        .then(data => {

            const userBody = {
                name: data.name,
                email: data.email,
                accessToken: data.accessToken,
                avatar: data.avatar,
                venueManager: data.venueManager,
            };

            localStorage.setItem('userBody', JSON.stringify(userBody));

            const localData = JSON.parse(localStorage.getItem('userBody'));
            
            setCurrentUser(localData);

            if(localData.accessToken === localData.accessToken) {
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        })
        .catch(errors => {
            console.log(errors)
       })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email')} placeholder='Email'/>
                <p>{errors.email?.message}</p>
                <input type='password' {...register('password')} placeholder='Password'/>
                <p>{errors.password?.message}</p>
                <input type='submit' value='Log in'/>
            </form>
            <Link to="/register"><p>Register an account</p></Link>
        </div>
    )
}

// email: bjarnebetjent@stud.noroff.no
// password: 12345678