import React from 'react';
import { userDetailsType } from '../type/userDetailsType';

type CardUSerType = {
    item: userDetailsType,
    event: ((id: number) => void)
}

const CardUser = ({ item, event }: CardUSerType) => (
    <div style={{height: "10vh", width: "20vw"}} onClick={() => event(item.id)}>

    </div>
)

export default CardUser