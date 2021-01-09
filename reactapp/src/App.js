import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";
import "./App.css";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const App = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);
  const [moviesCount, setMoviesCount] = useState(0);
  const [moviesWishList, setMoviesWishList] = useState([]);
  const [apiMovieList, setApiMovieList] = useState([]);

  useEffect(() => {
    const recentMovie = async () => {
      let rawResponse = await fetch("/new-movies");
      let response = await rawResponse.json();
      // console.log(response);
      setApiMovieList(response.movie.results);
    };

    const loadWishList = async () => {
      let rawResponse = await fetch("/wishlist-movie");
      let response = await rawResponse.json();
      console.log(response);
      setMoviesWishList(response.listMovie);
      setMoviesCount(response.listMovie.length);
    };
    recentMovie();
    loadWishList();
  }, []);

  useEffect(() => {
    // console.log(apiMovieList);
  }, [apiMovieList, moviesWishList]);

  const handleClickAddMovie = (name, image) => {
    setMoviesCount(moviesCount + 1);
    setMoviesWishList([...moviesWishList, { movieName: name, image: image }]);

    const addingDB = async () => {
      var rawResponse = await fetch("/wishlist-movie", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${name}&image=${image}`,
      });
      var response = await rawResponse.json();
      console.log(response);
    };
    addingDB();
  };
  // console.log(moviesCount, moviesWishList);

  const handleClickDeleteMovie = (name) => {
    setMoviesCount(moviesCount - 1);
    setMoviesWishList(
      moviesWishList.filter((movie) => movie.movieName !== name)
    );
    const deleteDB = async () => {
      var rawResponse = await fetch(`/wishlist-movie/${name}`, {
        method: "DELETE",
      });
      var response = await rawResponse.json();
      console.log(response);
    };
    deleteDB();
  };

  var movieList = apiMovieList.map((movie) => {
    let inWishList = moviesWishList.find((element) => {
      return element.movieName === movie.title;
    });

    if (inWishList) {
      inWishList = true;
    } else {
      inWishList = false;
    }

    return (
      <Movie
        movieName={movie.title}
        movieDesc={movie.overview}
        movieImg={"http://image.tmdb.org/t/p/w500/" + movie.backdrop_path}
        globalRating={movie.vote_average}
        countRating={movie.vote_count}
        handleClickAddParent={handleClickAddMovie}
        handleClickDeleteParent={handleClickDeleteMovie}
        existWishList={inWishList}
      />
    );
  });

  var moviesWish = moviesWishList.map((wishMovie) => {
    console.log("hello", wishMovie);
    return (
      <ListGroupItem
        className="d-flex align-items-center"
        onClick={() => handleClickDeleteMovie(wishMovie.movieName)}
      >
        <img
          width="50%"
          className="mr-2"
          src={wishMovie.image}
          alt={wishMovie.movieName}
        />
        <div className="text-center font-weight-bold pt-1">
          {wishMovie.movieName}
        </div>
      </ListGroupItem>
    );
  });

  return (
    <Container>
      <Row>
        <Col>
          <header>
            <Nav className="mt-3">
              <NavItem>
                <img src="./logoMyMoviz.png" />
              </NavItem>
              <NavItem>
                <NavLink>Last releases</NavLink>
              </NavItem>

              <NavItem>
                <div>
                  <Button id="Popover1" type="button">
                    {moviesCount} films
                  </Button>
                  <Popover
                    placement="bottom"
                    isOpen={popoverOpen}
                    target="Popover1"
                    toggle={toggle}
                  >
                    <PopoverHeader>Wishlist</PopoverHeader>
                    <PopoverBody>
                      <ListGroup>{moviesWish}</ListGroup>
                    </PopoverBody>
                  </Popover>
                </div>
              </NavItem>
            </Nav>
          </header>
        </Col>
      </Row>

      <Row className="mt-4"> {movieList}</Row>
    </Container>
  );
};

export default App;
