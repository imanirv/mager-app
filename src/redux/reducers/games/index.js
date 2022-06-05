import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "../../../helpers/network";
import { getJwt } from "../../../helpers/auth";

const initialState = {
    listGame : [],
    loading : false,
}


const slices = createSlice({
        initialState,
        name: "games",
        reducers: {
            setListGames(state, action) {
                Object.assign(state, {
                    ...state,
                    listGame: action.payload
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

const {setListGames, setLoading} = slices.actions

export const useGameDispatcher = () => {
    const {games} = useSelector((state) => state);
    const dispatch = useDispatch();

    const getListGame = async () => {
        dispatch(setLoading(true))
        const token = getJwt();
        try {
            const response = await callAPI({
                url: '/game/list?size=100&page=0',
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(response.data.data)
            const data = response.data.data
            const newData = []
            for (let i = 0; i < data.length; i++) {
                // const element = array[i];
                newData.push({id:data[i].id, name: data[i].namaGame})
            }
            dispatch(setListGames(newData))
        } catch (error) {
            console.log(error)
        }
    }

    return{
        games,
        getListGame
    }

}

export default slices.reducer