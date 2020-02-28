import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import axios from 'axios'

import Home from "./components/Home";
import Recipes from "./components/Recipes";
import ShoppingList from "./components/ShoppingList";


class App extends Component {
  state = {
    recipesList: [],
    newRecipeName: "",
    ingredients: "",
    instructions: "",
    time: "",
    picture_url: "",
    reviews: [],
    ingredientSearch: ""
  };

  componentDidMount(){
    this.fetch()
  }
  fetch = async () =>{
    try {
    const response = await axios.get('/api/recipes/')
    console.log("TCL: App -> fetch -> response", response.data)
    
    } catch (error) {
      console.log(error)
    }
  }
  addToShoppingList = async () =>{
    try {
    const response = await axios.post('/api/recipes/', {
      "name": "Daphzilla" 
    })
    console.log("RESPOSE ADDED SHOPPINGLIST",response)
    } catch(error) {
      console.log("shoppinglist error", error.message)
    }
  }
  handleChange = event => {
    const inputValue = event.target.value;

    this.setState({ ingredientSearch: inputValue });
  };
  render() {
    console.log("TESTING ENV VAR", process.env.REACT_APP_SECRET_ID)

    return (
      <div>
         <Navbar bg="primary" variant="dark">
          <Navbar.Brand>i_Nita_Baker_App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/recipes/chicken">Recipes</Nav.Link>
              <Nav.Link href="/shoppinglist">Shopping List</Nav.Link>
            </Nav>
            <Form
              inline
              onSubmit={event => {
                event.preventDefault();
                // console.log("TCL: App -> render -> event", event);
              }}
            >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.handleChange}
              />
              <a href={`/recipes/${this.state.ingredientSearch}`}>
                <Button variant="outline-light">Search</Button>
              </a>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes/:search_term" component={Recipes} />
            {/* <Route exact path="/recipes/:recipesId" component={SingleRecipes} /> */}
            {/* <Route path="/reviews/:recipesId" component={Reviews} /> */}
            <Route exact path="/shoppinglist" component={ShoppingList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
