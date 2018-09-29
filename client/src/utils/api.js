const axios = require("axios");

const apiKey = process.env.nytKey;

export default {
    getArticles: (userQuery) => {    
        const { topic, startYear, endYear } = userQuery;
        return (axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${topic}&begin_date=${startYear}0101&end_date=${endYear}0101`));
    },

    saveArticle: (data) => {
        const articleData = {
            headline: data.headline.main,
            url: data.web_url,
            date: data.date
        };
        return (axios.post("/api/article", articleData));
    },

  
    getSavedArticles: () => {
        return (axios.get("/api/articles"));

    },
 
    deleteArticle: (data) => {
        return (axios.delete(`api/article/${data._id}`));
    }
}

