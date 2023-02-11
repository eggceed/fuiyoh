import React, { Component, Fragment, useState }from 'react'
import '../styles/AddMenu.css'
import menu from '../assets/menu.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


const AddMenu = () => {
    const [imgstate, setImg] = useState();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);
        console.log(formData);
    
        const formJson = Object.fromEntries(formData.entries());
        formJson.ingredient = formJson.ingredient.split(",")
        if (formJson.menu_url == "") {
            formJson.menu_url = "https://i.imgflip.com/4kdqxk.jpg"
        }
        console.log(formJson);

        await axios.post('http://group3.exceed19.online/menu/add', formJson)
        
        navigate("/");
      }

    return (
    <Fragment>
      <div className="add-menu">
          <h1>เพิ่มเมนู.</h1>
      </div>

        <form method="post" onSubmit={handleSubmit}>
        <div className="top">

            <div className="add-first-info">
                <li>
                    ชื่อ:
                    <input className="menu-name" name="menu_name"/>
                </li>
                <li>
                    รูป:
                    <textarea className="menu-img" name="menu_url" onChange={(e) => {setImg(e.target.value)}}/>
                </li>
                วัตถุดิบ:
                <li>
                    ชื่อ (คั่นวัตถุดิบด้วย ,):
                </li>
                <textarea className="ingrediants" name="ingredient"/>
            </div>
        
            <div className="img-section">
                <img className="default-menu-image" src={imgstate || menu}/>
            </div>

            <div className="seasoning">
                เครื่องปรุง:
                <div className="seasoning-name">
                    ชื่อ  
                    <li>
                        <input className="seasoning-input" value="เกลือ"/>
                    </li>
                    <li>
                        <input className="seasoning-input" value="MSG"/>
                    </li>

                </div>

                <div className="seasoning-amount">
                    ปริมาตร
                    <li>
                        <input className="seasoning-input" name="salt_gram"/> g
                    </li>
                    <li>
                        <input className="seasoning-input" name="msg_gram"/> g
                    </li>
                </div>
            </div>
            
        </div>

        <button name="add menu"> Add menu </button>
        </form>

        

      </Fragment>
    )
  }
  
  export default AddMenu