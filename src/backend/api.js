export const BASE_API_URL = "http://stress-testers.ru:8001";

// fetch(`${BASE_API_URL}/books/list`)

export async function post(path, body) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_API_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined
        },
        body: JSON.stringify(body)
    });

    console.log("Initial data from API:", res)
    const data = JSON.parse(await res.text());
    console.log("Data from API:", data)

    if (res.status === 200) {
        console.log("Received post:", data);

        return {ok: true, data: data};
    } else {
        console.log("Error during post:", data.message);

        return {ok: false, data: data};
    }
}

export async function get(path){
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_API_URL}${path}`, {
        method: "GET",
        headers: {
            "Authorization": token ? `Bearer ${token}` : undefined
        }
    });

    console.log("Data from API:", res)
    const data = await res.json();

    if (res.status === 200) {
        console.log("Received get:", data);

        return {ok: true, data: data};
    } else {
        console.log("Error during get:", data.message);

        return {ok: false, data: data};
    }
}

export async function del(path) {
    const token = localStorage.getItem('token');

    const res = await fetch(`${BASE_API_URL}${path}`, {
        method: "DELETE",
        headers: {
            "Authorization": token ? `Bearer ${token}` : undefined
        }
    });

    console.log("Response from DELETE API:", res);
    const data = await res.json();

    if (res.status === 200) {
        console.log("Successfully deleted:", data);

        return { ok: true, data: data };
    } else {
        console.log("Error during delete:", data.message);

        return { ok: false, data: data };
    }
}