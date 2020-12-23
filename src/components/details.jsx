import React, { Component } from "react";
import Characterlist from "./characterlist";

class Details extends Component {
  constructor(props) {
    super(props);
    console.log(props.charid);
    this.state = {
      charid: props.charid,
      details: null,
      quote: null,
      prevPage: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getSeries = this.getSeries.bind(this);
  }

  handleClick() {
    this.setState({ prevPage: true });
  }

  getSeries() {
    let Series = [];
    for (let i = 0; i < this.state.details[0].appearance.length; i++) {
      Series.push(<li>{this.state.details[0].appearance[i]}</li>);
    }
    return Series;
  }

  getOccupation = () =>{
    let occupations=[];
    for(let i=0;i<this.state.details[0].occupation.length;i++){
      if(i!==this.state.details[0].occupation.length-1) 
        occupations.push( <span>{this.state.details[0].occupation[i]} {',  '}</span> )
      else occupations.push( <span>{this.state.details[0].occupation[i]} {'  '}</span> )
    }
    console.log(occupations)
    return occupations;
  }

  async componentDidMount() {
    let url =
      "https://www.breakingbadapi.com/api/characters/" + this.state.charid;
    let response = await fetch(url);
    let data = await response.json();

    let name = data[0].name;
    name = name.split(" ");
    let quoteurl = "https://www.breakingbadapi.com/api/quote?author=";
    for (let i = 0; i < name.length; i++) {
      if (i !== name.length - 1) quoteurl += name[i] + "+";
      else quoteurl += name[i];
    }

    response = await fetch(quoteurl);
    let quotedata = await response.json();
    const size = Object.keys(data).length;
    this.setState({
      details: data,
      quote: quotedata,
    });
  }

  render() {
    if (!this.state.details) {
      return <div>Loading...</div>;
    }
    if (!this.state.quote) {
      return <div> fuck</div>;
    }

    if (this.state.prevPage === true) {
      return <Characterlist />;
    }

    let quote = this.state.quote;
    const quotesize = Object.keys(quote).length;
    var quotelist = [];
    if (quotesize === 0) {
      quotelist.push(<h4>NO QUOTES </h4>);
    } else {
      for (let i = 0; i < quotesize; i++) {
        quotelist.push(<li>{this.state.quote[i].quote}</li>);
      }
    }

    return (
      <div className="details">
        <h1>
          <u>BREAKING BAD CHARACTERS</u>
          <button className="goback" onClick={(e) => this.handleClick()}>
            GO BACK
          </button>
        </h1>
        <img src={this.state.details[0].img} align="right" alt="No"></img>
        <h3>Following are the details of Character</h3>
        <p>
          Name is <strong>{this.state.details[0].name}</strong>
        </p>
        <p>
          Date of Birth is <strong>{this.state.details[0].birthday}</strong>{" "}
        </p>
        <p>
          Occupation(s): <strong>{this.getOccupation()}</strong>
        </p>
        <p>
          Status is <strong>{this.state.details[0].status}</strong>
        </p>
        <p>
          Nickname is <strong>{this.state.details[0].nickname}</strong>
        </p>
        <p>
          Actor/ Actoress is <strong>{this.state.details[0].portrayed}</strong>
        </p>
        <p>
          Seasons in which Character appeared is{" "}
          <strong>
            <ul>{this.getSeries()}</ul>
          </strong>
        </p>
        <p>Quotes:</p>
        <strong>
          <ol>{quotelist}</ol>
        </strong>
      </div>
    );
  }
}

export default Details;
