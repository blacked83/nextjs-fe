const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getTasks() {
    try{
        let res = await fetch(API_URL + 'tasks', { method: 'GET' })
        let json = await res.json();
        if(res.status != 200) throw new Error(json)
        return json.data
    }catch(e){
        console.error(e)
        return false
    }
}

export async function getTaskById(id) {
    try{
        let res = await fetch(API_URL + `tasks/${id}`, { method: 'GET' })
        let json = await res.json();
        if(res.status != 200) throw new Error(json)
        return json.data
    }catch(e){
        console.error(e)
        return null
    }
}



export async function deleteTask(id) {
    try{
        let res = await fetch(API_URL + `tasks/${ id }`, { method: 'DELETE' })
        let json = await res.json();
        if(res.status != 200) throw new Error(json);
    }catch(e){
        console.error(e)
        return false
    }
    return true
}

export async function completeTask(id) {
    try{
        let data = { isComplete: true }
        let res = await fetch(API_URL + `tasks/${ id }`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        let json = await res.json();
        if(res.status != 200) throw new Error(json);
    }catch(e){
        console.error(e)
        return false
    }
    return true
}

export async function addTask(data) {
    try{
        let res = await fetch(API_URL + `tasks`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        let json = await res.json();
        if(res.status != 201) throw new Error(json);
    }catch(e){
        console.error(e)
        return false
    }
    return true
}

export async function putTask(id, data) {
    try{
        let res = await fetch(API_URL + `tasks/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
        let json = await res.json();
        if(res.status != 200) throw new Error(json);
    }catch(e){
        console.error(e)
        return false
    }
    return true
}