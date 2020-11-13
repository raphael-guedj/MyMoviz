import React, { useState, useEffect } from "react";

import "../App.css";
import {
  Col,
  Button,
  Badge,
  ButtonGroup,
  Card,
  CardImg,
  CardText,
  CardBody,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faVideo, faStar } from "@fortawesome/free-solid-svg-icons";

const Movie = (props) => {
  // const [likeMovie, setLikeMovie] = useState(false);
  const [watchMovie, setWatchMovie] = useState({
    count: 0,
    click: false,
  });
  const [myRatingMovie, setMyRatingMovie] = useState(0);
  const [isRatingMovie, setIsRatingMovie] = useState(false);
  const [rating, setAverage] = useState(props.globalRating);
  const [count, setCount] = useState(props.countRating);

  const handleClickLike = () => {
    // setIsExisting(!isExisting);
    if (!props.existWishList) {
      props.handleClickAddParent(props.movieName, props.movieImg);
    } else {
      props.handleClickDeleteParent(props.movieName);
    }
  };

  const handleClickCamera = () => {
    setWatchMovie((prev) => {
      return { count: prev.count + 1, click: true };
    });
  };

  let colorLike;
  if (props.existWishList) {
    colorLike = { color: "#e74c3c" };
  }

  let cameraClick;
  if (watchMovie.click) {
    cameraClick = { color: "#e74c3c" };
  }

  const setMyRating = (rating) => {
    if (rating < 0) {
      rating = 0;
    }

    if (rating > 10) {
      rating = 10;
    }

    setMyRatingMovie(rating);
    setIsRatingMovie(true);
  };

  let tabRating = [];
  for (var i = 0; i < 10; i++) {
    let yellow = {};
    if (i < myRatingMovie) {
      yellow = { color: "#ffba08" };
    }

    let count = i + 1;
    tabRating.push(
      <FontAwesomeIcon
        key={i}
        style={yellow}
        icon={faStar}
        onClick={() => setMyRating(count)}
      />
    );
  }

  var nbTotalNote = rating * count;
  var nbTotalVote = count;

  if (isRatingMovie) {
    nbTotalVote += 1;
    nbTotalNote += myRatingMovie;
  }

  var avgTotal = Math.floor(nbTotalNote / nbTotalVote);

  var iconStars = [];
  for (var i = 0; i < 10; i++) {
    var yellow = {};
    if (i < avgTotal) {
      yellow = { color: "#ffba08" };
    }
    iconStars.push(<FontAwesomeIcon key={i} style={yellow} icon={faStar} />);
  }

  let reduceDesc = props.movieDesc;

  if (reduceDesc.length > 80) {
    reduceDesc = reduceDesc.substring(0, 79) + "...";
  }

  let imageBack = props.movieImg;

  if (imageBack == null) {
    imageBack = "img/generique.jpg";
  }

  return (
    <Col xs="12" lg="6" xl="4" className="card-movie">
      <Card>
        <CardImg top width="100%" src={imageBack} alt="Card image cap" />
        <CardBody>
          <CardText>
            Like{" "}
            <FontAwesomeIcon
              icon={faHeart}
              style={colorLike}
              className="icon"
              onClick={() => handleClickLike()}
            />{" "}
          </CardText>
          <CardText>
            Nombre de vues{" "}
            <FontAwesomeIcon
              icon={faVideo}
              style={cameraClick}
              onClick={() => handleClickCamera()}
            />
            <Badge className="ml-1" color="secondary">
              {watchMovie.count}
            </Badge>
          </CardText>
          <CardText>
            Mon avis {tabRating}
            <ButtonGroup>
              <Button
                color="secondary"
                className="padding-button"
                onClick={() => setMyRating(myRatingMovie - 1)}
              >
                -1
              </Button>
              <Button
                className="padding-button"
                color="secondary"
                onClick={() => setMyRating(myRatingMovie + 1)}
              >
                +1
              </Button>
            </ButtonGroup>
          </CardText>
          <CardText>
            Moyenne {iconStars}
            <span> {nbTotalVote}</span>
          </CardText>
          <CardText>{props.movieName} </CardText>
          <CardText>{reduceDesc} </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Movie;
