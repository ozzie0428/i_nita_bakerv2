import React, { Component } from "react";
import axios from "axios";

export default class Reviews extends Component {
  state = {
    commentList: [],
    name: "",
    tastiness: "",
    difficulty: ""
  };
  componentDidMount() {
    this.updateReviewsPage();
  }

  updateReviewsPage = () => {
    const recipesId = this.props.match.params.recipesId;
    axios.get(`/api/v1/reviews/${recipesId}`).then(res => {
      console.log("TCL: Reviews -> updateReviewsPage -> res", res);

      const commentList = [...this.state.commentList];

      commentList.push(res.data);
      this.setState({ commentList: commentList, name: res.data.name });
      console.log("reviews data", res.data.name);
    });
  };

  resetState() {
    this.setState({
      difficulty: "",
      tastiness: ""
    });
  }

  handleChange = event => {
    const inputValue = event.target.value;

    this.setState({ [event.target.name]: inputValue });
  };

  commentClick = () => {};
  render() {
    const commentList =
      this.state.commentList &&
      this.state.commentList.map((reviews, i) => {
        return (
          <div key={i}>
            Review Comment: {reviews.name}
            <div>Tastiness: {reviews.tastiness}</div>
            <div>Difficulty: {reviews.difficulty}</div>
          </div>
        );
      });

    console.log("state", this.state.commentList);
    console.log("state name", this.state.commentList.name);
    return (
      <div className="reviewParent">
        <div className="reviews-submit">
          <h1> REVIEWS</h1>
        </div>
        <div className="container-container">
          <div className="comment-container">
            <h1>Comments:</h1>

            <div className="comment-list">{commentList}</div>
          </div>

          <div className="reviews-container">
            <div className="reviews-btn">
              <a href={`/recipes/${this.props.match.params.recipesId}`}>
                {`back to ${this.state.name}`}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
