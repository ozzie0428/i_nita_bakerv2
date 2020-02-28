import React, { Component } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import SingleRecipes from "./SingleRecipes";

export default class Recipes extends Component {
  state = {
    recipesList: [],
    ingredients: "",
    singleRecipe: null,
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.updateRecipesPage();
  }

  updateRecipesPage = () => {
    const APP_ID = process.env.REACT_APP_SECRET_ID;
    const APP_KEY = process.env.REACT_APP_SECRET_KEY;

    const search_term = this.props.match.params.search_term;
    console.log("TCL: Recipes -> updateRecipesPage -> this.props", this.props);

    axios
      .get(
        `https://api.edamam.com/search?q=${search_term}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(res => {
        this.setState({ recipesList: res.data.hits, loading: false });
      });
  };

  toggle = () => {
    console.log("TOGGLED");
    this.setState({ singleRecipe: null });
  };
  
  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      );
    }
    console.log("this.state.singleRecipe", this.state.singleRecipe);
    const recipesList =
      this.state.recipesList &&
      this.state.recipesList.map((recipes, i) => {
        console.log("recipesXXXXX", recipes);
        return (
          <div className="recipes-container" key={i}>
            <Card>
              <Card.Title>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h3>{recipes.recipe.label}</h3>
                </div>
              </Card.Title>
              <Card.Img
                src={recipes.recipe.image}
                alt="recipe img"
                width="350px"
              />
              <Card.Body>
                <Card.Text>
                  Want to cook this delious dish? Click button below to find out
                  the ingrediants on how to!
                </Card.Text>
                <Button
                  variant="primary"
                  size="lg"
                  block
                  onClick={() => this.setState({ singleRecipe: recipes })}
                >
                  View Ingredients
                </Button>
                {/* </Link> */}
              </Card.Body>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h3>{`Calories: ${recipes.recipe.calories.toFixed()}`}</h3>
              </div>
            </Card>
          </div>
        );
      });
    return (
      <div>
        <br />

        {this.state.singleRecipe ? (
          <SingleRecipes
            toggle={this.toggle}
            singleRecipe={this.state.singleRecipe}
          />
        ) : (
          <div
            className="recipeParent"
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            {recipesList}
          </div>
        )}
      </div>
    );
  }
}
