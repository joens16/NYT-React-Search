import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Panel from "./components/Panel/Panel";
import api from "./utils/api"
import SearchSection from "./components/SearchSection";
import List from "./components/List";
import Items from "./components/Items";
import ListContainer from "./components/ListContainer";
import Buttons from "./components/Buttons";
import Messages from "./components/Messages";
import "./App.css";


class App extends Component {
  state = {
    topic: "",
    startYear: 1990,
    endYear: 2018, //Setting the state
    articles: [],
    saved: [],
  };

   //When page loads, makes a request to get any articles saved in database.
   componentDidMount() {
    this.getSaved();
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const {name, value} = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    document.querySelector("form").reset();
    //Call method on API that will pass in state as parameter to be used to interact with NYT API

    api.getArticles(this.state).then(res => {
      if (res.data.status === "error") {
        throw new Error(res.data.message);
      };
      this.resultsTop.scrollIntoView({ behavior: "smooth", block: "start" }); //Scolls down to the resultsTop reference inthe results panel

      this.setState({ results: res.data.response.docs.slice(0, 5), error: "" }); //Saves first 5 search results into state as an array of objects
    }).catch(err => this.setState({ error: err.message }))
  };

    //Opens article in new window
    viewArticle = event => {
      window.open(event.target.value);
    };

    getSaved = () => {
      console.log("getSaved method")
      api.getSavedArticles().then(response => {
        this.setState({
          savedArticles: response.data
        });
      })
    };

    handleArticleSave = event => {
      event.preventDefault();
      const clickedArticle = (this.state.results.filter(element => element._id === event.target.id)[0]);
      api.saveArticle(clickedArticle).then(res => {
        this.getSaved();
      })
    };

    handleArticleDelete = (event) => {
      event.preventDefault();
      const clickedArticle = this.state.savedArticles.filter(element => element._id = event.target.id)[0];
      api.deleteArticle(clickedArticle).then(response => {
        this.getSaved();
      })
    };
  

  render() {
    return (
      <Wrapper>
        <NavBar/>
        <Panel heading="Search">
            < SearchSection
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </Panel>
          <Panel heading="Results">
            <div
              ref={(el) => { this.resultsTop = el; }}>
            </div>
            {this.state.results.length ? (
              <List>
                {this.state.results.map(result => (
                  <Items key={result._id}>
                    <ListContainer
                      headline={result.headline.main}
                      date={result.pub_date}
                      url={result.web_url} />
                    <Buttons className="btn viewArticle" value={result.web_url} onClick={this.viewArticle}>
                      View Article </ Buttons>
                    <Buttons id={result._id} className="btn saveBtn" onClick={this.handleArticleSave}>
                      Save Article</ Buttons>
                  </Items>
                ))}
              </List>
            ) : (<Messages message="Search for an Article Above and View Results Here" />)}

          </Panel>
          <Panel heading="Saved Articles">
            <div
              ref={(el) => { this.savedTop = el; }}>
            </div>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.slice(0).reverse().map(article => (
                  <Items key={article._id}>
                    <ListContainer headline={article.headline} 
                    date={article.date} url={article.url} />

                    <Buttons className="btn viewArticle" value={article.web_url} onClick={this.viewArticle}>
                      View Article
                    </ Buttons>
                    <Buttons id={article._id} className="btn deleteBtn" onClick={this.handleArticleDelete}>
                      Delete Article
                   </ Buttons>
                  </Items>
                ))}
              </List>
            ) : <Messages message="Save an article from the search results above and view the list of saved articles here." />}
          </Panel>

      </Wrapper>
    );
  };
}

export default App;
