import React, { useEffect, useRef, useState} from 'react'
import Button from './Button'
import axios from 'axios'
import '../styles/Seasoning.css'
import { createSwal } from '../assets/services/createSwat'


const URL = "http://group3.exceed19.online/menu/order"
const URLFinish = "http://group3.exceed19.online/menu/current/status"
let timer = ""

const Seasoning = ({ menuPass }) => {
    // const seasoning = ["Salt", "MSG"]
    const [menuID, setMenuID] = useState()
    const saltEl = useRef()
    const MSGEl = useRef()

    // console.log(menuPass)


    const getSeasoning = seasoning => {
        if (seasoning == "Salt") {
            return menuPass.salt_gram
        } else if (seasoning == "MSG") {
            return menuPass.msg_gram
        }
    }

    function clearTimer() {
        clearInterval(timer)
    }

    function setTimer(menuID) {
        timer = setInterval(async () => {
            try {
                const result = await axios.get(`${URLFinish}/${menuID}`)
                console.log(result.data)
                if (result.data.order_status === "complete") {
                    clearTimer()
                    createSwal("success", "เครื่องปรุงพร้อมแล้ว","#2e9900")
                }
            }catch(err){
                console.log(err)
            }
        },1000)
    }

    async function onclick (menuID) {
        console.log(saltEl.current.value)
        console.log(MSGEl.current.value)

        const body = {
            order_id: menuPass.menu_id,
            menu_name: menuPass.menu_name,
            msg_gram: parseInt(MSGEl.current.value),
            salt_gram: parseInt(saltEl.current.value)
        }
        console.log(body)
        try {
            const result = await axios.post(URL, body)
            console.log(result)
            setMenuID(result.data.order_id)
            menuID = result.data.order_id
            setTimer(menuID)

        }catch(err){
            console.log(err.response.data.detail)
            createSwal("warning","เครื่องปรุงหมดดดดด","#ffc038")

        }
    }

    return (
        <div className='seasoning-info'>
            <h1>เครื่องปรุง</h1>
            <table className='seasoning-table'>
                <tr>
                    <td><h3>Salt: </h3></td>
                    <td><input type="number" min="0" defaultValue={getSeasoning("Salt")} ref={saltEl} /></td>
                    <td><h3>g</h3></td>
                </tr>
                <tr>
                    <td><h3>MSG: </h3></td>
                    <td><input type="number" min="0" defaultValue={getSeasoning("MSG")} ref={MSGEl}/></td>
                    <td><h3>g</h3></td>
                </tr> 
            </table>
            <Button name="OK" type="button" onClick={() => onclick(menuID)}/>
        </div>
  )
}

export default Seasoning