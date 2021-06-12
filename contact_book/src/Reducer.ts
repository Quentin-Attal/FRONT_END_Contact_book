import { userDetailsActionType, ReducerStateType, userDetailsType } from '../type/userDetailsType'

const initialState: ReducerStateType = {
    userDetails: [],
    id: 0
}
const reducer = (state: ReducerStateType, action: userDetailsActionType): ReducerStateType => {
    switch (action.type) {
        case "edit":
            const payloadEdit = action.payload as userDetailsType
            const nUserDetailsAfterEdit = state.userDetails.map(userDetails => {
                if (userDetails.id === payloadEdit.id) {
                    userDetails = payloadEdit
                }
                return userDetails;
            })
            return {
                ...state, userDetails: nUserDetailsAfterEdit
            }
        case ('new'):
            const payloadNew = action.payload as userDetailsType
            const nUserDetailsAfterAdd = state.userDetails.map(res => res)
            nUserDetailsAfterAdd.push(payloadNew)
            return { ...state, userDetails: nUserDetailsAfterAdd }
        case ('delete'):
            const payloadDelete = action.payload as userDetailsType
            const nUserDetailsAfterDelete = state.userDetails.filter(res => res.id !== payloadDelete.id)
            return { ...state, userDetails: nUserDetailsAfterDelete }
        case 'changeId':
            const payloadChangeID = action.payload as number
            return { ...state, id: payloadChangeID }
        default:
            return { ...state }
    }
}

export { initialState, reducer }