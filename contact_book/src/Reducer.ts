import { userDetailsActionType, ReducerStateType } from '../type/userDetailsType'

const initialState: ReducerStateType = {
    userDetails: []
}
const reducer = (state: ReducerStateType, action: userDetailsActionType): ReducerStateType => {
    console.log("new", action)
    switch (action.type) {
        case "edit":
            const nUserDetailsAfterEdit = state.userDetails.map(userDetails => {
                if (userDetails.id === action.payload.id) {
                    userDetails = action.payload
                }
                return userDetails;
            })
            return {
                ...state, userDetails: nUserDetailsAfterEdit
            }
        case ('new'):
            const nUserDetailsAfterAdd = state.userDetails.map(res => res)
            nUserDetailsAfterAdd.push(action.payload)
            return { ...state, userDetails: nUserDetailsAfterAdd }
        case ('delete'):
            const nUserDetailsAfterDelete = state.userDetails.filter(res => res.id !== action.payload.id)
            return { ...state, userDetails: nUserDetailsAfterDelete }

        default:
            return { ...state }
    }
}

export { initialState, reducer }