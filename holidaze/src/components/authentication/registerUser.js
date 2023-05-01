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
        .password()
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

    function onSubmit(input) {
        const { data } = ApiHook(`${registerUrl}`, {
            method: post,
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(input),
        })
        return { data }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('userName')}/>
            <p>{errors.userName?.message}</p>
            <input {...register('email')}/>
            <p>{errors.email?.message}</p>
            <input {...register('password')}/>
            <p>{errors.password?.message}</p>
            <input {...register('avatar')}/>
        </form>
    )
}