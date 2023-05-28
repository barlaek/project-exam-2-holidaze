import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { venuesUrl } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';
import styles from "./CreateVenue.module.css"

/**
 * Schema object that handles form input for validation
 */
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

/**
 * Component that handles the creation of a venue at end point and
 * @returns a form with validation
 */
export function CreateVenue() {
    /**
     * Function that handles the schema object
     */
    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * Variables for authorization and navigation
     */
    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;
    const navigate = useNavigate();

    /**
     * Function that handles creating a venue at endpoint.
     * Function takes one @param {form} input and converts it to a body object 
     */
    function onSubmit(input) {
        console.log(input)
        /**
         * Body object that converts the input of the schema object
         */
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
        /**
         * API function call that creates the venue post
         */
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
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1>Create a new venue</h1>
                <fieldset className={styles.fieldset}>
                    <h2>Essential information</h2>
                    <div className={styles.object}>
                        <p>Enter name of the location</p>
                        <input {...register('name')} placeholder='Name of the location' className={styles.input}/>
                        <p>{errors.name?.message}</p>
                    </div>
                    <div className={styles.object}>
                        <p>Please describe the location</p>
                        <input {...register('description')} placeholder='Describe the location'className={styles.input}/>
                        <p>{errors.description?.message}</p>
                    </div>
                    <div className={styles.object}>
                        <p>Images</p>
                        <input {...register('media')} placeholder='Images of the location'className={styles.input}/>
                        <p>{errors.media?.message}</p>
                    </div>
                    <div className={styles.object}>
                        <p>Please register a price</p>
                        <input {...register('price')} placeholder='Price of the location per night'className={styles.input}/>
                        <p>{errors.price?.message}</p>
                    </div>
                    <div className={styles.object}>
                        <p>Maximum number of guests</p>
                        <input {...register('maxGuests')} placeholder='Maximum number of guests'className={styles.input}/>
                        <p>{errors.maxGuests?.message}</p>
                    </div>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <h2>Additional information</h2>
                    <div className={styles.object}>
                        <p>Wifi options</p>
                        <select {...register('meta.wifi')}>
                            <option>Select wifi</option>
                            <option value={true}>Wifi</option>
                            <option value={false}>No wifi</option>
                        </select>
                    </div>
                    <div className={styles.object}>
                        <p>Parking options</p>
                        <select {...register('meta.parking')}>
                            <option>Select parking</option>
                            <option value={true}>Parking</option>
                            <option value={false}>No parking</option>
                        </select>
                    </div>
                    <div className={styles.object}>
                        <p>Breakfast options</p>
                        <select {...register('meta.breakfast')}>
                            <option>Select breakfast</option>
                            <option value={true}>Breakfast</option>
                            <option value={false}>No breakfast</option>
                        </select>
                    </div>
                    <div className={styles.object}>
                        <p>Pet options</p>
                        <select {...register('meta.pets')}>
                            <option>Select pets</option>
                            <option value={true}>Pets</option>
                            <option value={false}>No pets</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <h2>Location information</h2>
                    <div className={styles.object}>
                        <p>Address</p>
                        <input {...register('location.address')} placeholder='Address of the venue' className={styles.input}/>
                    </div>
                    <div className={styles.object}>
                        <p>City</p>
                        <input {...register('location.city')} placeholder='City of the venue' className={styles.input}/>
                    </div>
                    <div className={styles.object}>
                        <p>Zip code</p>
                        <input {...register('location.zip')} placeholder='Zip code of the venue' className={styles.input}/>
                    </div>
                    <div className={styles.object}>
                        <p>Country</p>
                        <input {...register('location.country')} placeholder='Country of the venue' className={styles.input}/>
                    </div>
                    <div className={styles.object}>
                        <p>Continent</p>
                        <input {...register('location.continent')} placeholder='Continent of the venue' className={styles.input}/>
                    </div>
                </fieldset>
                <input type='submit' value='Create new venue' className={styles.button}/>
            </form>
    )
}