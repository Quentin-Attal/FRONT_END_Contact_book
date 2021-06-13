import React from 'react';
import { userDetailsType } from '../type/userDetailsType';
import { useAppContext } from './App';

type CardUserType = {
    item: userDetailsType,
    event: ((id: number) => void)
}

const CardUser = ({ item, event }: CardUserType) => (
    <div className="cardUser" >
        <div className="containCardUser" onClick={() => event(item.id)}>
            <div>
                <span>
                    {item.firstName}
                </span>
                <span>
                    {item.lastName}
                </span>
            </div>
            <p>
                {item.email}
            </p>
            <p>
                {item.birthdDate}
            </p>
        </div>
    </div>
)

type CardUserListType = {
    open: (() => void)
}

const CardUserList = ({ open }: CardUserListType) => {
    const AppContextValue = useAppContext()


    return (
        <div>
            {AppContextValue.state.userDetails.map((item) => <CardUser
                key={item.id}
                item={item}
                event={(id) => { AppContextValue.dispatch({ type: "changeId", payload: id }); open() }}
            />)}
        </div>
    )
}

export default CardUserList