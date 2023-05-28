import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUrl } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css";
import style from "./RegisterUser.module.css"

/**
 * Schema object that handles registration validation
 */
const schema = yup.object({
    name: yup
        .string()
        .min(3, 'Your user name should be at least 3 characters.')
        .max(20, 'Your user name cannot be longer than 20 characters.')
        .required('Please enter your user name.'),
    email: yup
        .string()
        .email()
        .required('You must provide a valid email address. Example: jigglypuff@stud.noroff.no'),
    password: yup
        .string()
        .required('Please provide a password'),
    avatar: yup
        .string()
        .url()
        .default(null),
    venueManager: yup
        .boolean()
        .default(false),
}).required();

/**
 * Registration component that
 * @returns a registration form and posts the data to the endpoint
 */
export function Registration() {
    /**
     * Variable that handles navigation at successful registration
     */
    const navigation = useNavigate();

    /**
     * Function that validates the schema object
     */
    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * Function that handles the schema object.
     * Takes one of @param {schema object} input 
     */
    function onSubmit(input) {
        console.log(input)
        /**
         * Body object that converts the schema object to validate at endpoint
         */
        const body = {
            name: input.name,
            email: input.email,
            password: input.password,
            avatar: input.avatar,
            venueManager: input.venueManager,
        };

        /**
         * Api function that posts the body opbject to endpoint
         */
        fetch(`${registerUrl}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body),
        }).then(response => {
            if(response.ok) {
                return navigation("/login")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className={styles.fieldset}>
                    <h1>Register an account</h1>
                    <div>
                        <p className={styles.label}>Please select role</p>
                        <select {...register('venueManager')}>
                            <option>Select role</option>
                            <option value={false}>Guest</option>
                            <option value={true}>Venue manager</option>
                        </select>
                    </div>
                    <div>
                        <p className={styles.label}>Please register a name</p>
                        <input {...register('name')} placeholder="Name" className={styles.input}/>
                        <p>{errors.name?.message}</p>
                    </div>
                    <div>
                        <p className={styles.label}>Please register an email</p>
                        <input {...register('email')} placeholder="email" className={styles.input}/>
                        <p>{errors.email?.message}</p>
                    </div>
                    <div>
                        <p className={styles.label}>Please register a password</p>
                        <input {...register('password')} placeholder="password" type="password" className={styles.input}/>
                        <p>{errors.password?.message}</p>
                    </div>
                    <div>
                        <p className={styles.label}>Please submit an avatar image</p>
                        <input {...register('avatar')} placeholder="avatar" className={styles.input}/>
                    </div>
                    <div className={style.buttonCont}>
                        <input type="submit" value='Register' className={styles.button}/>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}