import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ApiHook } from '../api/api';
import { registerUrl } from '../api/endpoints';

const schema = yup.object({
    userName: yup
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
        .url(),
    venueManager: yup
        .boolean()
        .default(false),
}).required();

// Takes two strings and a boolean, and sends to an endpoint

export function Registration() {
    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const { data } = ApiHook(`${registerUrl}`, {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json', 
    //     },
    //     body: JSON.stringify(data),
    // })

    function onSubmit(input) {
        console.log(input)
        const body = {
            userName: input.userName,
            email: input.email,
            password: input.password,
            avatar: input.avatar,
            venueManager: input.venueManager,
        };

        const response = fetch(`${registerUrl}`, {
            method: 'post',
            body: JSON.stringify(body),
        });
        console.log(response);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('userName')} placeholder="Username"/>
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