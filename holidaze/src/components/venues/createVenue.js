import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { venuesUrl } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    name: yup
        .string()
        .required('Please enter the name of your venue'),
    description: yup
        .string()
        .required('Please provide description of the venue'),
    media: yup.string().url('Please provide a valid url'),
    price: yup
        .number()
        .required('Please provide a price quote'),
    maxGuests: yup
        .number()
        .min(1)
        .required('Please provide a maximum number of guests'),
    meta: yup
        .object().shape({
            wifi: yup.boolean().default(false),
            parking: yup.boolean().default(false),
            breakfast: yup.boolean().default(false),
            pets: yup.boolean().default(false),
        }).default(null),
    location: yup.object().shape({
        address: yup.string().default('Unkown'),
        city: yup.string().default('Unkown'),
        zip: yup.string().default('Unkown'),
        country: yup.string().default('Unkown'),
        continent: yup.string().default('Unkown'),
    }).default(null),
});

export function CreateVenue() {
    const navigate = useNavigate();

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
                wifi: input.meta.wifi,
                parking: input.meta.parking,
                breakfast: input.meta.breakfast,
                pets: input.meta.pets,
            },
            location: {
                address: input.location.address,
                city: input.location.city,
                zip: input.location.zip,
                country: input.location.country,
                continent: input.location.continent,
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
            if(response.ok) {
                navigate(`/profiles/${name}`)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Create a new venue</h1>
                <fieldset>
                    <h2>Essential information</h2>
                    <div>
                        <p>Enter name of the location</p>
                        <input {...register('name')} placeholder='Name of the location'/>
                        <p>{errors.name?.message}</p>
                    </div>
                    <div>
                        <p>Please describe the location</p>
                        <input {...register('description')} placeholder='Describe the location'/>
                        <p>{errors.description?.message}</p>
                    </div>
                    <div>
                        <p>Images</p>
                        <input {...register('media')} placeholder='Images of the location'/>
                        <p>{errors.media?.message}</p>
                    </div>
                    <div>
                        <p>Please register a price</p>
                        <input {...register('price')} placeholder='Price of the location per night'/>
                        <p>{errors.price?.message}</p>
                    </div>
                    <div>
                        <p>Please enter the maximum number of guests</p>
                        <input {...register('maxGuests')} placeholder='Maximum number of guests'/>
                        <p>{errors.maxGuests?.message}</p>
                    </div>
                </fieldset>
                <fieldset>
                    <h2>Additional information</h2>
                    <div>
                        <p>Wifi options</p>
                        <select {...register('meta.wifi')}>
                            <option>Select wifi</option>
                            <option value={true}>Wifi</option>
                            <option value={false}>No wifi</option>
                        </select>
                    </div>
                    <div>
                        <p>Parking options</p>
                        <select {...register('meta.parking')}>
                            <option>Select parking</option>
                            <option value={true}>Parking</option>
                            <option value={false}>No parking</option>
                        </select>
                    </div>
                    <div>
                        <p>Breakfast options</p>
                        <select {...register('meta.breakfast')}>
                            <option>Select breakfast</option>
                            <option value={true}>Breakfast</option>
                            <option value={false}>No breakfast</option>
                        </select>
                    </div>
                    <div>
                        <p>Pet options</p>
                        <select {...register('meta.pets')}>
                            <option>Select pets</option>
                            <option value={true}>Pets</option>
                            <option value={false}>No pets</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <h2>Location information</h2>
                    <div>
                        <p>Address</p>
                        <input {...register('location.address')} placeholder='Address of the venue'/>
                    </div>
                    <div>
                        <p>City</p>
                        <input {...register('location.city')} placeholder='City of the venue'/>
                    </div>
                    <div>
                        <p>Zip code</p>
                        <input {...register('location.zip')} placeholder='Zip code of the venue'/>
                    </div>
                    <div>
                        <p>Country</p>
                        <input {...register('location.country')} placeholder='Country of the venue'/>
                    </div>
                    <div>
                        <p>Continent</p>
                        <input {...register('location.continent')} placeholder='Continent of the venue'/>
                    </div>
                </fieldset>
                <input type='submit' value='Create new venue' />
            </form>
    )
}