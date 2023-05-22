import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { venuesUrl } from '../api/endpoints';

const schema = yup.object({
    name: yup
        .string(),
    description: yup
        .string(),
    media: yup.string().url(),
    price: yup
        .number(),
    maxGuests: yup
        .number()
        .min(1),
    meta: yup
        .object().shape({
            wifi: yup.boolean().default(false),
            parking: yup.boolean().default(false),
            breakfast: yup.boolean().default(false),
            pets: yup.boolean().default(false),
        }),
    location: yup.object().shape({
        address: yup.string().default('Unkown'),
        city: yup.string().default('Unkown'),
        zip: yup.string().default('Unkown'),
        country: yup.string().default('Unkown'),
        continent: yup.string().default('Unkown'),
    }),
});

export function UpdateVenue() {
    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm({
        resolver: yupResolver(schema),
    });

    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;

    function onSubmit(input) {
        console.log(input)
        const body = {
            name: input.name,
            description: input.description,
            media: [input.media],
            price: input.price,
            maxGuests: input.maxGuests,
            meta: {
                wifi: input.wifi,
                parking: input.parking,
                breakfast: input.breakfast,
                pets: input.pets,
            },
            location: {
                address: input.address,
                city: input.city,
                zip: input.zip,
                country: input.country,
                continent: input.continent,
            },
        }
        console.log(body);

        fetch(`${venuesUrl}`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} placeholder='Name of the location'/>
                <input {...register('description')} placeholder='Describe the location'/>
                <input {...register('media')} placeholder='Images of the location'/>
                <input {...register('price')} placeholder='Price of the location per night'/>
                <input {...register('maxGuests')} placeholder='Maximum number of guests'/>
                <fieldset>
                    <select {...register('meta.wifi')}>
                        <option value={true}>Wifi</option>
                        <option value={false}>No wifi</option>
                    </select>
                    <select {...register('meta.parking')}>
                        <option value={true}>Parking</option>
                        <option value={false}>No parking</option>
                    </select>
                    <select {...register('meta.breakfast')}>
                        <option value={true}>Breakfast</option>
                        <option value={false}>No breakfast</option>
                    </select>
                    <select {...register('meta.pets')}>
                        <option value={true}>Pets</option>
                        <option value={false}>No pets</option>
                    </select>
                </fieldset>
                <fieldset>
                    <input {...register('location.address')} placeholder='Address of the venue'/>
                    <input {...register('location.city')} placeholder='City of the venue'/>
                    <input {...register('location.zip')} placeholder='Zip code of the venue'/>
                    <input {...register('location.country')} placeholder='Country of the venue'/>
                    <input {...register('location.continent')} placeholder='Continent of the venue'/>
                </fieldset>
                <input type='submit' value='Create new venue' />
            </form>
    )
}