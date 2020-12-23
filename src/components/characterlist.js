import React, { Component } from "react";
import Details from "./details";


class Characterlist extends Component {
  state = {
    loading: true,
    character: null,
    numberOfchar: 0,
    nextPage: false,
    charnumber:0
  };

  constructor()
  {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const url = "https://www.breakingbadapi.com/api/characters";
    const response = await fetch(url);
    const data = await response.json();
    const size = Object.keys(data).length;

    await this.setState({
      loading: true,
      character: data,
      numberOfchar: size,
      nextPage: false,
    });
  }

  getOccupation = (occNumber) =>{
    let occupations=[];
    for(let i=0;i<this.state.character[occNumber - 1].occupation.length;i++){
      if(i!==this.state.character[occNumber - 1].occupation.length-1) 
        occupations.push( <span>{this.state.character[occNumber - 1].occupation[i]} {',  '}</span> )
      else occupations.push( <span>{this.state.character[occNumber - 1].occupation[i]} {'  '}</span> )
    }
    console.log(occupations)
    return occupations;
  }

  handleClick(i) {
    this.setState({ nextPage: true , charnumber:i }); 
  }

  getCharacter=()=>{
    let charactersListElements = [];
    for (let i = 1; i <= this.state.numberOfchar; i++) {
      charactersListElements.push(
          <tr key={i}>
            <td><b>{this.state.character[i - 1].name}</b></td>
            <td> {this.getOccupation(i)}</td> 
            <td>{this.state.character[i - 1].birthday}</td>
            <td>{this.state.character[i - 1].status}</td> 
            <td>
                <button
                className="detailPageButton"
                onClick={(e) => this.handleClick(this.state.character[i-1].char_id)}
                >
                  <a>See Details </a>
                </button>
            </td>
          </tr>
      );
    }
    return charactersListElements;
  }

  render() {
    console.log(this.state.character);
    let x;
    if (this.state.loading === false || this.state.character === null) {
      x = "LOADING...";
    } else {
      x = this.getCharacter();
    }


    if (this.state.nextPage === false) {
      return (
        <div>
          <h1>
            <u>BREAKING BAD CHARACTERS</u>
          </h1>
          <h3>Following is the list of Breaking Bad Characters: </h3>
          <table width="1200" cellSpacing="10" >
            <tr>
              <th>Name</th>
              <th>Occupation</th>
              <th>Date of Birth</th>
              <th>Status</th>
            </tr>
            {x}
          </table> 
        </div>

      );
    }
    else {
      return (<Details charid={this.state.charnumber}/>)
    }
  }
}

export default Characterlist;
