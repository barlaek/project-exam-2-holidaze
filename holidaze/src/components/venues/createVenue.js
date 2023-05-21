import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { venuesUrl } from '../api/endpoints';

const schema = yup.object({
    name: yup
        .string()
        .required('Please enter the name of your venue'),
    description: yup
        .string()
        .required('Please provide description of the venue'),
    media: yup.mixed()
        .when('isArray', {
            is: Array.isArray,
            then: yup.array().of(yup.string().url()),
            otherwise: yup.string().url(),
            }),
    price: yup
        .number()
        .required(),
    maxGuests: yup
        .number()
        .required(),
    rating: yup
        .number()
        .default(0),
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
        lat: yup.number().default(0),
        lng: yup.number().default(0),
    }),
}).required();

export function CreateVenue() {
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
            rating: input.rating,
            meta: {
                wifi: input.wifi,
                parking: input.parking,
                breakfast: input.breakfast,
                pets: input.pets
            },
            location: {
                address: input.address,
                city: input.city,
                zip: input.zip,
                country: input.country,
                continent: input.continent,
                lat: input.lat,
                lng: input.lng,
            },
        }
        console.log(body);

        fetch(`${venuesUrl}`, {
            method: 'post',
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} placeholder='Name of the location'/>
                <p>{errors.name?.message}</p>
                <input {...register('description')} placeholder='Describe the location'/>
                <input {...register('media')} placeholder='Images of the location'/>
                <input {...register('price')} placeholder='Price of the location per night'/>
                <input {...register('maxGuests')} placeholder='Maximum number of guests'/>
                <input {...register('rating')} placeholder='Rating of the location'/>
                <div  {...register('meta')}>
                    <select {...register('wifi')}>
                        <option value={true}>Wifi</option>
                        <option value={false}>No wifi</option>
                    </select>
                    <select {...register('parking')}>
                        <option value={true}>Parking</option>
                        <option value={false}>No parking</option>
                    </select>
                    <select {...register('breakfast')}>
                        <option value={true}>Breakfast</option>
                        <option value={false}>No breakfast</option>
                    </select>
                    <select {...register('pets')}>
                        <option value={true}>Pets</option>
                        <option value={false}>No pets</option>
                    </select>
                </div>
                <div {...register('location')}>
                    <input {...register('address')} placeholder='Address of the venue'/>
                    <input {...register('city')} placeholder='City of the venue'/>
                    <input {...register('zip')} placeholder='Zip code of the venue'/>
                    <input {...register('country')} placeholder='Country of the venue'/>
                    <input {...register('continent')} placeholder='Continent of the venue'/>
                    <input {...register('lat')} placeholder='Latitude of the location'/>
                    <input {...register('lng')} placeholder='Longditude of the location'/>
                </div>
                <input type='submit' value='Create new venue' />
            </form>
        </div>
    )
}