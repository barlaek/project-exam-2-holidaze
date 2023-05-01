import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUrl } from '../api/endpoints';

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
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Name"/>
            <p>{errors.userName?.message}</p>
            <input {...register('email')} placeholder="email"/>
            <p>{errors.email?.message}</p>
            <input {...register('password')} placeholder="password" type="password"/>
            <p>{errors.password?.message}</p>
            <input {...register('avatar')} placeholder="avatar"/>
            <input type="submit" placeholder='submit'/>
        </form>
    )
}