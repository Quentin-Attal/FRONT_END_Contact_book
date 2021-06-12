import React from 'react';
import { userDetailsType } from '../type/userDetailsType';
import { useAppContext } from './App';

type CardUserType = {
    item: userDetailsType,
    event: ((id: number) => void)
}

const CardUser = ({ item, event }: CardUserType) => (
    <div style={{ height: "10vh", width: "20vw", backgroundColor: "red" }} onClick={() => event(item.id)}>

    </div>
)

const CardUserList = () => {
    const AppContextValue = useAppContext()


    return (
        <div>
            {AppContextValue.state.userDetails.map((item) => <CardUser item={item}
                event={(id) => {
                    console.log(id)
                    AppContextValue.dispatch({ type: "changeId", payload: id })
                }} />)}
        </div>
    )
}

export default CardUserList