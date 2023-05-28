import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { venuesUrl } from '../api/endpoints';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./CreateVenue.module.css"
import container from "./CreateVenuePage.module.css"

/**
 * Schema object for form validation
 */
const schema = yup.object({
    name: yup
        .string()
        .required('Please enter the name of your venue'),
    description: yup
        .string()
        .required('Please provide description of the venue'),
    media: yup
        .string()
        .url("Please provide a valid image url")
        .default(''),
    price: yup
        .number()
        .required('Please provide a price quote'),
    maxGuests: yup
        .number()
        .min(1)
        .required('Please provide a maximum number of guests'),
    meta: yup
        .object().shape({
            wifi: yup.boolean(),
            parking: yup.boolean(),
            breakfast: yup.boolean(),
            pets: yup.boolean(),
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
 * Updated venue component that
 * @returns a form that updates a listed venue by a registered venue manager
 */
export function UpdateVenue() {

    /**
     * Validation function that handles the schema object
     */
    const {
        register,
        handleSubmit,
        formState: { errors }, 
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * Variables for authenticating the schema object and navigating the DOM
     */
    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name;
    const token = localData.accessToken;
    const navigate = useNavigate();
    let { id } = useParams();

    /**
     * Function that handles the submission and PUTs the schema object to the endpoint.
     * Takes a @param {form} input and converts it to object compatible with endpoint
     */
    function onSubmit(input) {
        /**
         * Body object that converts the schema object input to a readable object
         * at endpoint.
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

        /**
         * API function call that PUTs and updates object
         */
        fetch(`${venuesUrl}/${id}`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        }).then(response => {
            if(response.ok) {
                navigate(`/profiles/${name}`)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={container.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1>Update venue</h1>
                <fieldset className={styles.fieldset}>
                    <h2>Update essential information</h2>
                    <div className={styles.object}>
                        <p>Update venue name</p>
                        <input {...register('name')} placeholder='Name of the location' className={styles.input}/>
                        <p>{errors.name?.message}</p>
                    </div>
                    <div className={styles.object}>
                        <p>Update venue description</p>
                        <input {...register('description')} placeholder='Describe the location' className={styles.input}/>
                        <p>{errors.description?.message}</p>
                    </div>
                    <div className={styles.object}>
                        <p>Update venue images</p>
                        <input {...register('media')} placeholder='Images of the location' className={styles.input}/>
                        <p>{errors.media?.message}</p>
                    </div>
                    <div className={styles.object}>
                        <p>Update price</p>
                        <input {...register('price')} placeholder='Price of the location per night' className={styles.input}/>
                        <p>{errors.price?.message}</p>
                    </div>
                    <div className={styles.object}>
                        <p>Update maximum number of guests</p>
                        <input {...register('maxGuests')} placeholder='Maximum number of guests' className={styles.input}/>
                        <p>{errors.maxGuests?.message}</p>
                    </div>
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <h2>Update additional information</h2>
                    <div>
                        <p>Update wifi options</p>
                        <select {...register('meta.wifi')}>
                            <option>Select wifi option</option>
                            <option value={true}>Wifi</option>
                            <option value={false}>No wifi</option>
                        </select>
                    </div>
                    <div>
                        <p>Update parking option</p>
                        <select {...register('meta.parking')}>
                            <option>Select parking option</option>
                            <option value={true}>Parking</option>
                            <option value={false}>No parking</option>
                        </select>
                    </div>
                    <div>
                        <p>Update breakfast option</p>
                        <select {...register('meta.breakfast')}>
                            <option>Select breakfast option</option>
                            <option value={true}>Breakfast</option>
                            <option value={false}>No breakfast</option>
                        </select>
                    </div>
                    <div>
                        <p>Update pets option</p>
                        <select {...register('meta.pets')}>
                            <option>Select pets option</option>
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
                <input type='submit' value='Update venue' className={styles.button}/>
            </form>
        </div>
    )
}