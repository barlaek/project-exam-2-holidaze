import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUrl } from "../api/endpoints";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "../../App";
import styles from "./Login.module.css"

/**
 * Schema object that handles log in validation
 */
const schema = yup.object({
    email: yup
        .string()
        .email()
        .required('Please use a valid email'),
    password: yup
        .string()
        .required('Please enter your password'),
}).required();

/**
 * Login component that handles user login.
 * @returns the login form and navigates user to homepage at success.
 */
export function Login() {
    /**
     * Navigation variable
     */
    const navigate = useNavigate();

    /**
     * Context function that sets the user context of the application
     */
    const { currentUser, setCurrentUser } = useContext(UserContext);

    /**
     * Function that validates the schema object
     */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    /**
     * Function that converts the
     * @param {schema object} input to a body object
     * and posts the body object to the endpoint
     */
    function onSubmit(input) {
        /**
         * Converts the schema object to body object
         */
        const body = {
            email: input.email,
            password: input.password,
        }

        /**
         * Posts body object to endpoint for validation
         */
        fetch(`${loginUrl}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body),
        }).then(response => response.json())
        .then(data => {
            /**
             * Stores the response data into an object
             */
            const userBody = {
                name: data.name,
                email: data.email,
                accessToken: data.accessToken,
                avatar: data.avatar,
                venueManager: data.venueManager,
            };

            /**
             * Sets the userBody object to the local storage
             */
            localStorage.setItem('userBody', JSON.stringify(userBody));
            /**
             * Parses the JSON userBody object in local storage
             */
            const localData = JSON.parse(localStorage.getItem('userBody'));
            /**
             * Sets the user context to the userBody object
             */
            setCurrentUser(localData);
            /**
             * Checks for accessToken and navigates user to homepage
             */
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
        <div className={styles.login}>
            <fieldset className={styles.fieldset}>
                <h1 className={styles.title}>Log in</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <label for="email" className={styles.label}>Email</label>
                    <input {...register('email')} placeholder='Email' className={styles.input}/>
                    <p>{errors.email?.message}</p>
                    <label for="password" className={styles.label}>Password</label>
                    <input type='password' {...register('password')} placeholder='Password' className={styles.input}/>
                    <p>{errors.password?.message}</p>
                    <div className={styles.container}>
                        <input type='submit' value='Log in'className={styles.button}/>
                    </div>
                </form>
            </fieldset>
            <Link to="/register"><p>Register an account</p></Link>
        </div>
    )
}

// email: bjarnebetjent@stud.noroff.no
// password: 12345678