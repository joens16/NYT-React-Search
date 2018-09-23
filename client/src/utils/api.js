const axios = require("axios");

const apiKey = process.env.nytKey;

export default {
    getArticles: (userQuery) => {    
        const { topic, startYear, endYear } = userQuery;
        return (axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nytKey}&q=${topic}&begin_date=${startYear}&end_date=${endYear}`));
    
    },
}