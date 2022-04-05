const btn = document.querySelector('#searchButton')
const app = require('express')();

btn.addEventListener('click', search)

const PORT = process.env.PORT || 3001;

const searchUrl = `https://localhost:3001/profile`;

function search () {
}

