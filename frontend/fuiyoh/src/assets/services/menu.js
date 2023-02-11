import axios from "axios"

export async function getMenu() {
    const res = await axios.get("http://group3.exceed19.online/menu/")
    return res.data
}

export async function getBigMenu(menu_id) {
    const res = await axios.get(`http://group3.exceed19.online/menu/num/${menu_id}`)
    return res.data
}
