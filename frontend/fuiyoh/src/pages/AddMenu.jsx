import React, { Component, Fragment }from 'react'
import '../styles/AddMenu.css'
import menu from '../assets/menu.png'

const AddMenu = () => {

    return (
        <Fragment>
      <div className="add-menu">
          <h1>เพิ่มเมนู.</h1>
      </div>

        <div className="top">

            <div className="add-first-info">
                <li>
                    ชื่อ:
                    <input className="menu-name"/>
                </li>
                <li>
                    รูป:
                    <input className="menu-img"/>
                </li>
                วัตถุดิบ:
                <li>
                    ชื่อ (คั่นวัตถุดิบด้วย ,):
                </li>
                <textarea className="ingrediants"/>
            </div>
        
            <div className="img-section">
                <img className="default-menu-image" src={menu} />
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
                        <input className="seasoning-input"/> g
                    </li>
                    <li>
                        <input className="seasoning-input"/> g
                    </li>
                </div>
            </div>
            
        </div>

        <button className="button" type="button">
            Add Menu
        </button>

      </Fragment>
    )
  }
  
  export default AddMenu