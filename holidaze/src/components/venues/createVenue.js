import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    created: yup.object().shape({
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
            })
    }),
    location: yup.object().shape({
        address: yup.string().default('Unkown'),
        city: yup.string().default('Unkown'),
        zip: yup.string().default('Unkown'),
        country: yup.string().default('Unkown'),
        continent: yup.string().default('Unkown'),
        lat: yup.number().default(0),
        lng: yup.number().default(0),
    })
}).required();

export function CreateVenue() {
    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(input) {
        const body = {
            created: {
                name: input.created.name,
                description: input.created.description,
                media: [input.created.media],
                price: input.created.price,
                maxGuests: input.created.maxGuests,
                rating: input.created.rating,
                meta: {
                    wifi: input.created.meta.wifi,
                    parking: input.created.meta.parking,
                    breakfast: input.created.meta.breakfast,
                    pets: input.created.meta.pets
                },
            },
            location: {
                address: input.location.address,
                city: input.location.city,
                zip: input.location.zip,
                country: input.location.country,
                continent: input.location.continent,
                lat: input.location.lat,
                lng: input.location.lng,
            },
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div {...register('created')}>
                    <input {...register('name')} placeholder='Name of the location'/>
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

            </form>
        </div>
    )
}