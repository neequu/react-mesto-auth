const baseUrl = 'https://auth.nomoreparties.co'

const checkResponse = async (res) => {
  try {
    const r = await res.json()
    if (!res.ok) throw new Error(r.message)
    return r
  } catch (error) {
    console.log('not ok');
    return Promise.reject(`${error}`)
  }
}
  
const register = async (data) => {
  const url = `${baseUrl}/signup`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data)
  })

  return checkResponse(res)
}

const signin = async (data) => {
  const url = `${baseUrl}/signin`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(data)
  })

  return checkResponse(res)
}

const validate = async (token) => {
  const url = `${baseUrl}/users/me`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  }) 

  return checkResponse(res)
}




export {validate, signin, register}