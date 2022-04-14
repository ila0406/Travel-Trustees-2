const btn = document.querySelector('#searchButton')
const app = require('express')();

// Event Listener to trigger Search functionality
btn.addEventListener('click', search)

const PORT = process.env.PORT || 3001;
const searchUrl = `https://localhost:3001/profile`;
const LiveURL = location.origin + '/profile';

function search () {
}