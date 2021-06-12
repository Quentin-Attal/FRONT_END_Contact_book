import React, { useEffect, useState } from 'react';
import { userDetailsType } from '../type/userDetailsType';
import { useAppContext } from './App';
import './Drawer.css'


type RightPanelType = {
    close: (() => void)
    widthSideNav: "0px" | "33vw"
    isNew: boolean
}


const RightPanel = ({ close, widthSideNav, isNew }: RightPanelType) => {

    const AppContextValue = useAppContext()

    const [data, setData] = useState<userDetailsType>({ birthdDate: "", email: "", firstName: '', id: AppContextValue.state.userDetails.length, lastName: '', moreInformation: "" })
    const [updateData, setUpdateData] = useState<"can" | "delete" | "add">("can")

    useEffect(() => {
        console.log(AppContextValue.state.id)
        if (AppContextValue.state.userDetails.length > 0 && AppContextValue.state.id !== undefined) {
            const nData = AppContextValue.state.userDetails.filter(res => res.id === AppContextValue.state.id)
            setData({ ...nData[0] })
        } else {
            setData({ birthdDate: "", email: "", firstName: '', id: AppContextValue.state.userDetails.length + 1, lastName: '', moreInformation: "" })
        }
        // eslint-disable-next-line
    }, [AppContextValue.state.id])

    useEffect(() => {
        if (updateData === "add") {
            if (isNew) {
                console.log(AppContextValue.state.userDetails.length)
                // close()
                setData({ birthdDate: "", email: "", firstName: '', id: AppContextValue.state.userDetails.length + 1, lastName: '', moreInformation: "" })
                AppContextValue.dispatch({ type: "new", payload: data })
            } else {
                AppContextValue.dispatch({ type: "edit", payload: data })
            }
        } else if (updateData === "delete") {
            if (isNew) {
                close()
                setData({ birthdDate: "", email: "", firstName: '', id: AppContextValue.state.userDetails.length + 1, lastName: '', moreInformation: "" })
            } else {
                AppContextValue.dispatch({ type: "delete", payload: data })
            }
        }
        setUpdateData("can")
        // eslint-disable-next-line
    }, [updateData])

    return (
        <div>
            <div id="mySidenav" className="sidenav" style={{ width: widthSideNav }}>
                <button className="closebtn" onClick={close}>&times;</button>
                <div className="parentFields">
                    <input onChange={(e) => setData({ ...data, firstName: e.target.value })}
                        value={data.firstName}
                        id="addUserFirstName"
                        className="fields"
                        type="text"
                        alt="firstName"
                        placeholder="FirstName" />
                    <input onChange={(e) => setData({ ...data, lastName: e.target.value })}
                        value={data.lastName}
                        id="addUserLastName"
                        className="fields"
                        type="text"
                        alt="lastName"
                        placeholder="LastName" />
                </div>
                <div className="parentFields">
                    <input onChange={(e) => setData({ ...data, email: e.target.value })}
                        value={data.email}
                        id="addUserMail"
                        className="fields"
                        type="email"
                        alt="mail"
                        placeholder="email@gmail.com" />
                </div>
                <div className="parentFields">
                    <input onChange={(e) => setData({ ...data, birthdDate: e.target.value })}
                        value={data.birthdDate}
                        id="addUserBirth"
                        className="fields"
                        type="date"
                        alt="birthDate" />
                </div>
                <div className="parentFields">
                    <textarea onChange={(e) => setData({ ...data, moreInformation: e.target.value })}
                        value={data.moreInformation}
                        className="fields"
                        placeholder="Add additional Information"
                        id="UserAdditionalInformation"></textarea>
                </div>
                <div id="SubmitButton">
                    <button onClick={() => {
                        setUpdateData('add')
                    }} className="SubmitButton" style={{ backgroundColor: "green" }}>
                        {!isNew ? "Save" : "Add"}
                    </button>
                    <button onClick={() => {
                        setUpdateData('delete')
                    }} className="SubmitButton" style={{ backgroundColor: "red" }}>
                        {!isNew ? "Delete" : "Cancel"}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default RightPanel