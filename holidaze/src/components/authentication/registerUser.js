import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUrl } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';

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
            console.log(response)
            if(response.ok) {
                return navigation("/login")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <h1>Register an account</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <div>
                        <p>Please select role</p>
                        <select {...register('venueManager')}>
                            <option>Select role</option>
                            <option value={false}>Guest</option>
                            <option value={true}>Venue manager</option>
                        </select>
                    </div>
                    <div>
                        <p>Please register a name</p>
                        <input {...register('name')} placeholder="Name"/>
                        <p>{errors.name?.message}</p>
                    </div>
                    <div>
                        <p>Please register an email</p>
                        <input {...register('email')} placeholder="email"/>
                        <p>{errors.email?.message}</p>
                    </div>
                    <div>
                        <p>Please register a password</p>
                        <input {...register('password')} placeholder="password" type="password"/>
                        <p>{errors.password?.message}</p>
                    </div>
                    <div>
                        <p>Please submit an avatar image</p>
                        <input {...register('avatar')} placeholder="avatar"/>
                    </div>
                    <input type="submit" value='Register'/>
                </fieldset>
            </form>
        </div>
    )
}