const URL = `${process.env.BACKEND_URL}`;

const HEADERS = {
  "Content-Type": "application/json",
};

export const registerFarmer = async (newUser) => {
  console.log("From service --> ", newUser)
  try {
    const resp = await fetch(`${URL}/api/user/signup/farmer/`, {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      body: newUser,
      redirect: "follow",
    });
    const data = await resp.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    return data;
  } catch (err) {
    console.log("Error al crear nuevo User_Farmer", err);
  }
};

export const addFarm = async (newFarm) => {
  try {
    const token = localStorage.getItem("token");
    const resp = await fetch(`${URL}/api/crop/addFarm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newFarm),
    });
    return await resp.json();
  } catch (err) {
    console.log("Error al crear el nuevo campo", err);
  }
};

export const modifyFarm = async (body) => {
  try{
    const token = localStorage.getItem("token");
    const resp = await fetch(`${URL}/api/crop/${body['id']}`,{
      method:'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS 
      },
      body: JSON.stringify(body)
    });
    return await resp.json();
  }catch(err){
    console.log("Error el modificar el campo", err)
    return err
  }
}

export const deleteFarm = async (crop_id) => {
  try{
    const token = localStorage.getItem("token");
    const resp = await fetch(`${URL}/api/crop/${crop_id}`,{
      method:'DELETE',
      headers:{
        Authorization: `Bearer ${token}`,
        ...HEADERS
      },
    });
    if(resp.ok){
      console.log("Campo eliminado con exito!")
      return "campo eliminado", resp
    }else{
      console.log("Tenemos un error")
    }
  }catch(err){
    console.log("Error al eliminar", err);
  }
}

export const loginUser = async (user) => {
  try {
    const res = await fetch(`${URL}/api/user/login`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    const data = await res.json();

    localStorage.setItem("token", data.token);

    localStorage.setItem("role", data.role);
    return data.role;
  } catch (err) {
    console.log("ERROR LOGIN USER", err);
  }
};

export const getInfoUser = async (token) => {
  try {
    const res = await fetch(`${URL}/api/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERROR GET USER", err);
  }
};

export const getInfoFarmer = async (id_user, token) => {
  try {
    const res = await fetch(`${URL}/api/farmer/${id_user}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERROR GET FARMER", err);
  }
};

export const getInfoTech = async (id_user, token) => {
  try {
    const res = await fetch(`${URL}/api/tech/${id_user}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("ERROR Get technician", err);
  }
};

export const registerTech = async (newUser) => {
  try {
    const resp = await fetch(`${URL}/api/user/signup/tech/`, {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      body: newUser,
      redirect: "follow",
    });
    const data = await resp.json();
    console.log("From service -->", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    return data;
  } catch (err) {
    console.log("Error al crear nuevo User_Tech", err);
  }
};

export const getInfoCrop = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  try {
    const res = await fetch(`${URL}/api/crop`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en getInfoCrop", error);
  }
};

export const getAllTech = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${URL}/api/tech/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error al fetch de All Tech", err);
  }
};

export const getMessages = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${URL}/api/message/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error en getMessages", error);
    return [""];
  }
};

export const getServicesFromHiring = async (tech_id) => {
  try{
    const token = localStorage.getItem("token");
    const serviceData = await fetch(`${URL}/api/serv/${tech_id}`,{
      method:'GET',
      headers : {
        Authorization: `Bearer ${token}`,
        ...HEADERS
      },
    })
    if(!serviceData.ok){
      return "Un Fallo en el Fetch!"
    }
    const response = await serviceData.json();
    return response;
  }catch(error){
    console.log("Uops Error", error)
  }
}

export const getServices = async () => {
  try {
    const token = localStorage.getItem("token");
    const user = await getInfoUser(token);
    const tech = await getInfoTech(user["id"], token);
    const serviceData = await fetch(`${URL}/api/serv/${tech.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const servicesJson = await serviceData.json();
    return servicesJson;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendMessage = async (newMessage) => {
  const token = localStorage.getItem("token");
  const raw = JSON.stringify(newMessage);

  try {
    const res = await fetch(`${URL}/api/message/`, {
      method: "POST",

      body: raw,
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      redirect: "follow",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};
export const filterTechByField = async (body) => {
  const token = localStorage.getItem("token");
  const raw = JSON.stringify(body);
  try {
    const res = await fetch(`${URL}/api/farmer/`, {
      method: "POST",
      body: raw,
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("No pudimos filtrar tu tecnico -->", err);
  }
};

export const modifyTech = async (technicianId, body, token) => {
  try {
    const resp = await fetch(`${URL}/api/tech/${technicianId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    if (resp) {
      const data = await resp.json();
      return data;
    } else {
      throw new Error("Error al modificar el técnico");
    }
  } catch (err) {
    console.log("Error al modificar el técnico", err);
    throw err;
  }
};

export const modifyFarmer = async (farmerId, body, token) => {
  try {
    const resp = await fetch(`${URL}/api/farmer/${farmerId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    if (resp) {
      const data = await resp.json();
      return data;
    } else {
      throw new Error("Error al modificar el técnico");
    }
  } catch (err) {
    console.log("Error al modificar el técnico", err);
    throw err;
  }
};
export const postHiring = async (body) => {
  const token = localStorage.getItem("token");
  const raw = JSON.stringify(body);
  console.log("From service --> ", raw)
  try {
    const req = await fetch(`${URL}/api/hiring/`, {
      method: 'POST',
      body: raw,
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await req.json();
    console.log("Hiring de cookies");
    return data;
  } catch (err) {
    console.log("UUUUUPS ALGO PASO")
    return err;
  }
};

export const getHiring = async () => {
  try{
    const token = localStorage.getItem("token");
    const resp = await fetch(`${URL}/api/hiring/`,{
      method:'GET',
      headers:{
        Authorization: `Bearer ${token}`,
        ...HEADERS
      },
    });
    const data = await resp.json();
    
    return data;
  }catch(err){
    console.log("Error en el get hiring")
    return err;
  }
}

export const getTechHiring = async () => {
  try{
    const token = localStorage.getItem("token");
    const resp = await fetch(`${URL}/api/hiring/tech`,{
      method: 'GET',
      headers:{
        Authorization: `Bearer ${token}`,
        ...HEADERS
      },
    });
    const data = await resp.json();
    return data;
  }catch(err){
    console.log("Error on get tech hiring!!!")
    return err;
  }
}

export const putHiring = async (body, hiring_id) => {
  const token = localStorage.getItem("token");
  try{  
    const resp = await fetch(`${URL}/api/hiring/${hiring_id}`, {
      method:'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS
      },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    const data = await resp.json()
    return data;
  }catch(err){
    console.log("Error en el put hiring")
    return err
  }
}