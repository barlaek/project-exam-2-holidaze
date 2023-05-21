import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({}).required();

export function CreateVenue() {
    return (
        <div>
            <p>Hello from the venue</p>
        </div>
    )
}