import React, { Component } from "react";
import axios from "axios";
import { Table, InputGroup, FormControl } from "react-bootstrap";

export default class ShoppingList extends Component {
  state = {
    shoppingListList: [],
    newShoppingListName: "",
    picture_url: "",
    price: "",
    checkboxlist: []
  };

  componentDidMount() {
    console.log("ShoppingList component mouned");
    this.updateShoppingListPage();
  }

  updateShoppingListPage = () => {
    axios.get('/api/recipes/').then(res => {
      console.log('/api/recipes/', res.data.results);
      this.setState({ shoppingListList: res.data.results });
    });
  };
  checkItem = value => {
    let ingredientsList = this.state.checkboxlist;
    if (!ingredientsList.includes(value)) {
      ingredientsList.push(value);
    } else {
      const index = ingredientsList.indexOf(value);
      ingredientsList.splice(index, 1);
    }

    this.setState({ checkboxlist: ingredientsList });
  };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ [event.target.name]: inputValue });
  };

  render() {
    console.log("Checkboxlist", this.state.checkboxlist);

    const shoppingListList =
      this.state.shoppingListList &&
      this.state.shoppingListList.map((shoppingList, i) => {
        let checked;

        return (
          <div key={i}>
            <li style={{ listStyleType: "none" }}>
              <input
                onChange={() => this.checkItem(shoppingList.name)}
                type="checkbox"
                checked={this.state.checkboxlist.includes(shoppingList.name)}
                value={shoppingList.name}
              />
              <label
                style={{
                  paddingLeft: "1%",
                  textDecoration: this.state.checkboxlist.includes(
                    shoppingList.name
                  )
                    ? "line-through"
                    : null
                }}
              >
                {shoppingList.name}
              </label>
            </li>
          </div>
        );
      });
    return (
      <div>
        <div>
          <div
            className="form-row align-items-center"
            style={{
              paddingLeft: "30%",
              paddingTop: "2%"
            }}
          >
            <div className="col-sm-3 my-1">
              <label className="sr-only">Name</label>
            </div>
            <div className="col-sm-3 my-1">
              <label className="sr-only">Username</label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
              </div>
            </div>
            <div className="col-auto my-1"></div>
            <div className="col-auto my-1"></div>
          </div>
        </div>
        <div className="shoppingList-container">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th></th>
                <th>Shopping List</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{shoppingListList}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
