import { profilesUrl } from "../api/endpoints";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import styles from "./UpdateAvatar.module.css"

/**
 * Schema object that updates the user avatar
 */
const schema = yup.object({
    avatar: yup
        .string()
        .url()
})

/**
 * Component that updates the user avatar and
 * @returns an submission form with validation
 */
export function UpdateAvatar() {
    /**
     * Variables for authorization
     */
    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;

    /**
     * Function that handles the validation of the schema object
     */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    /**
     * Function that handles validation at endpoint.
     * Takes one @param {url} input 
     */
    function onSubmit(input) {
        /**
         * Variable that converts schema object to a body object
         */
        const body = {
            avatar: input.avatar
        }

        /**
         * API function call that PUTs the user avatar
         */
        fetch(`${profilesUrl}/${name}/media`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }).then(response => {
            console.log(response)
            if(response.ok) {
                window.location.reload();
            }
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input {...register('avatar')} placeholder="Please provie image url" className={styles.input}/>
                <input type="submit" value="Update avatar" className={styles.button} />
            </form>
        </div>
    )
}