import { profilesUrl } from "../api/endpoints";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

const schema = yup.object({
    avatar: yup
        .string()
        .url()
})

export function UpdateAvatar() {

    const localData = JSON.parse(localStorage.getItem('userBody'))
    const name = localData.name
    const token = localData.accessToken;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(input) {
        const body = {
            avatar: input.avatar
        }

        fetch(`${profilesUrl}/${name}/media`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('avatar')} placeholder="Please provie image url"/>
                <input type="submit" value="Update avatar"/>
            </form>
        </div>
    )
}