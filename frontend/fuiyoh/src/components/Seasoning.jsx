import React, { useEffect, useRef, useState, useContext} from 'react'
import Button from './Button'
import axios from 'axios'
import '../styles/Seasoning.css'
import { createSwal } from '../assets/services/createSwat'
import { statusContext } from '../contexts/context'


const URL = "http://group3.exceed19.online/menu/order"
const URLFinish = "http://group3.exceed19.online/menu/current/status"
let timer = ""

const Seasoning = ({ menuPass }) => {
    // const seasoning = ["Salt", "MSG"]
    const [menuID, setMenuID] = useState()
    const saltEl = useRef()
    const MSGEl = useRef()
    const [btnDisable, setBtnDisable] = useContext(statusContext)
    // console.log(btnDisable, setBtnDisable)
    // console.log(menuPass)

    // useEffect(() => {
    //     console.log("hello world")
    // },[menuID])


    const getSeasoning = seasoning => {
        if (seasoning == "Salt") {
            return menuPass.salt_gram
        } else if (seasoning == "MSG") {
            return menuPass.msg_gram
        }
    }

    function clearTimer() {
        clearInterval(timer)
        setBtnDisable(false)
    }

    function setTimer(menuID, btnDisable) {
        timer = setInterval(async () => {
            try {
                const result = await axios.get(`${URLFinish}/${menuID}`)
                // console.log(result.data)
                if (result.data.order_status === "complete") {
                    clearTimer()
                    createSwal("success", "เครื่องปรุงพร้อมแล้ว","#2e9900")
                }
            }catch(err){
                console.log(err)
            }
        },1000)
    }

    async function onclick (menuID, btnDisable) {
        // console.log(saltEl.current.value)
        // console.log(MSGEl.current.value)

        if (saltEl.current.value < 0 || MSGEl.current.value < 0) {
            createSwal("warning","ใส่ปริมาณเครื่องปรุงให้ถูกต้อง","#ffc038")
            return
        }

        const body = {
            order_id: menuPass.menu_id,
            menu_name: menuPass.menu_name,
            msg_gram: parseInt(MSGEl.current.value),
            salt_gram: parseInt(saltEl.current.value)
        }
        console.log(body)
        try {
            const result = await axios.post(URL, body)
            // console.log(result)
            setMenuID(result.data.order_id)
            menuID = result.data.order_id
            setBtnDisable(true)
            btnDisable = true
            setTimer(menuID, btnDisable)
        }catch(err){
            console.log(err.response.data.detail)
            createSwal("warning",err.response.data.detail,"#ffc038")

        }
    }

    return (
        <div className='seasoning-info'>
            <h1 className='seasoning-title'>เครื่องปรุง</h1>
            <table className='seasoning-table'>
                <tr>
                    <td><h3>เกลือ: </h3></td>
                    <td><input type="number" min="0" defaultValue={getSeasoning("Salt")} ref={saltEl} /></td>
                    <td><h3>g</h3></td>
                </tr>
                <tr>
                    <td><h3>MSG: </h3></td>
                    <td><input type="number" min="0" defaultValue={getSeasoning("MSG")} ref={MSGEl}/></td>
                    <td><h3>g</h3></td>
                </tr> 
            </table>
            <div className='seasoning-btn'>
                <Button name="สั่งเครื่องปรุง" type="button" onClick={() => onclick(menuID, btnDisable)} disabled={btnDisable}/>
            </div>
        </div>
  )
}

export default Seasoning