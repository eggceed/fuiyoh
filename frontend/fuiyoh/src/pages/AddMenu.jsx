import React, { Component, Fragment, useState }from 'react'
import '../styles/AddMenu.css'
import menu from '../assets/menu.png'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Button from '../components/Button'


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
          <h1>เพิ่มเมนู</h1>
      </div>

        <form method="post" onSubmit={handleSubmit}>
        <div className="all">

            <div className="left">
            <div className="add-first-info">
                <div className="name-img"> 
                <b>เมนู:</b>
                    <li>
                        ชื่อ:
                    </li>
                    <input className="menu-name" name="menu_name"/>
                    <li>
                        รูป (ใส่ url):
                    </li>
                    <textarea className="menu-img" name="menu_url" onChange={(e) => {setImg(e.target.value)}}/>
                </div>
                <div className="ingredients-section">
                    <b>วัตถุดิบ:</b>
                    <li>
                        ชื่อวัตถุดิบ (คั่นด้วย <b>,</b>):
                    </li>
                    <textarea className="ingrediants" name="ingredient"/>
                </div>

            
            </div>

            <div className="seasoning">
             <div className="seasoning-name">     
                <b>เครื่องปรุง:</b>
                <li>
                    <label className="salt">เกลือ <input className="seasoning-input" name="salt_gram"/> g </label>
                </li>
                <li>
                    <label className="msg">MSG <input className="seasoning-input" name="msg_gram"/> g </label>
                </li>
            </div>

                <div className="seasoning-amount">      
                </div>        
            </div>
            </div>
            <div className="right">  
                <img className="default-menu-image" src={imgstate || menu}/>
            </div>

            </div>
            <div className="add-button">
                <Button name="Add Menu" > Add Menu </Button>
            </div>
            
        </form>

        

      </Fragment>
    )
  }
  
  export default AddMenu