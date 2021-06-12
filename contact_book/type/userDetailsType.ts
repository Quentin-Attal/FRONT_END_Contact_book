export type userDetailsType = {
    firstName: string,
    lastName: string,
    birthdDate: string,
    email: string,
    moreInformation: string,
    id: number
}

export type userDetailsActionType = {
    type: "edit" | "new" | "delete",
    payload: userDetailsType
}

export type ReducerStateType = {
    userDetails: Array<userDetailsType>
}