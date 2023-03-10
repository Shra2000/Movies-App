import React from "react";
import Filter from "./Filter";
import Navbar from "./Navbar";
import Search from "./Search";
import Table from "./Table";

class App extends React.Component {
  state = {
    movies: [],
    genre: [],
    selectedFilter: "All Genre",
    search: "",
  };

  updateSearch = (searchString) => {
    this.setState({search: searchString})

  };

  setFilter = (filter) => {
    this.setState({ selectedFilter: filter });
  };
  toggleLike = (id) => {
    let index = this.state.movies.findIndex((el) => {
      return el._id == id;
    });
    let currMoviesArr = this.state.movies.map((el) => el);
    if (currMoviesArr[index].liked) {
      currMoviesArr[index].liked = false;
    } else {
      currMoviesArr[index].liked = true;
    }
    this.setState({ movies: currMoviesArr });
  };
  deleteMovies = (id) => {
    let filteredArr = this.state.movies.filter((el) =>{
    return el._id!= id;
    })
    this.setState({movies : filteredArr});
  };

  componentDidMount() {

    let f = async () => {
      let responseGenre = await fetch("/genre");
      let responseMovies = await fetch("/movies");
      let moviesJson = await responseMovies.json();
      let genreJson = await responseGenre.json();
      this.setState({
        movies: moviesJson,
        genre: genreJson,
        selectedFilter: "All Genre"
      });
    };
     
    f();
  }
  render() {
    return (
     <div>
      <Navbar />

       <div className="row">
        <Filter 
         handleFilter= {this.setFilter} 
         selectedFilter= {this.state.selectedFilter}
         genreData = {this.state.genre}
         />

        <div class = "col-9 p-4">
        <Search search = {this.state.search}
        updateSearch = {this.updateSearch}
        total = {this.state.movies.length}/>
        <Table 
        search = {this.state.search}
        deleteMovies = {this.deleteMovies}
        toggleLike={this.toggleLike}
        selectedFilter={this.state.selectedFilter}
        moviesData= {this.state.movies}
        />
        </div>
       </div>
      </div>
    );
  }
}

export default App;

