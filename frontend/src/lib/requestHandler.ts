import axios from 'axios';

// Function to get CSRF token from cookie
function getCookie(name:string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: false, // Include cookies in requests
    headers: {
		'Authorization': localStorage.getItem('access') ? `Bearer ${localStorage.getItem('access')}` : '', //Add authorization credentials here to 
        'X-CSRFToken': getCookie('csrftoken'), // Add CSRF token to request headers
    }
});

export { api };	