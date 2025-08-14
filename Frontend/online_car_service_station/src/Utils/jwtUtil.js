import { jwtDecode } from "jwt-decode"

const getRole = () => {

  const token = localStorage.getItem("token")
  if (token) {
    try {
      const decoded = jwtDecode(token)
      const role = decoded.role
      return role
    } catch (e) {
      console.log("Invalid Token: ", e)
    }
  } else {
    return null
    // return 'customer'
  }
}

export { getRole }