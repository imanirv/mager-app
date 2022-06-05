import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import { getJwt, getUser } from "../../../helpers/auth";

const initialState = {
    listNotification : [],
    loading : false,
}


const slices = createSlice({
        initialState,
        name: "notification",
        reducers: {
            setListNotification(state, action) {
                Object.assign(state, {
                    ...state,
                    listNotification: action.payload
                })
            },
            setLoading(state, action) {
                Object.assign(state, {
                    ...state,
                    loading: action.payload
                })
            }
        }
})

const {setListNotification, setLoading} = slices.actions

export const useNotificationDispatcher = () => {
    const {notification} = useSelector((state) => state);
    const dispatch = useDispatch();

    const getListNotification = async () => {
        dispatch(setLoading(true))
        const token = getJwt();
        const {id} = getUser()
        try {
            const response = await callAPI({
                url: `/notification/${id}?size=100&page=0`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(response.data.data.content)
            dispatch(setListNotification(response.data.data.content))
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error)
        }
    }

    return{
        notification,
        getListNotification
    }

}

export default slices.reducer