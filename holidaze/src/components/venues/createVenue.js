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
        ratings: yup
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
    return (
        <div>
            <p>Hello from the venue</p>
        </div>
    )
}