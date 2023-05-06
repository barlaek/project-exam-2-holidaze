import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUrl } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';

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

export function Registration() {
    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(input) {
        console.log(input)
        const body = {
            name: input.name,
            email: input.email,
            password: input.password,
            avatar: input.avatar,
            venueManager: input.venueManager,
        };

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register('venueManager')}>
                <option value={false}>Guest</option>
                <option value={true}>Venue manager</option>
            </select>
            <input {...register('name')} placeholder="Name"/>
            <p>{errors.name?.message}</p>
            <input {...register('email')} placeholder="email"/>
            <p>{errors.email?.message}</p>
            <input {...register('password')} placeholder="password" type="password"/>
            <p>{errors.password?.message}</p>
            <input {...register('avatar')} placeholder="avatar"/>
            <input type="submit" value='Register'/>
        </form>
    )
}