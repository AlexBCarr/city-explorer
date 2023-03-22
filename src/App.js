import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  getCityData = async (event) => {
    event.preventDefault();

    try {
     
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);

      console.log(cityDataFromAxios.data[0])

      
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });
      
    } catch (error) {

      
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }




  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url =`${process.env.REACT_APP_SERVER}/pet?species=${this.state.species}`

      let weatherData = await axios.get(url);

      console.log(weatherData.data);

    } catch (error) {
      console.log(error.message);
    }
  }

  

  render() {
    return (
      <>
        <h1>City Heights</h1>

        <form onSubmit={this.getCityData}>
          <label > Enter in a City :      
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {/*  TERNARY - WTF  */}
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p> 
            : Object.keys(this.state.cityData).length > 0 &&
            <ul>
              <p id="title">{this.state.cityData.display_name}</p>
              <img class="img-cl" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='Map of Selected Location' />
              {/* <p>{this.state.cityData.lat}</p>
              <p>{this.state.cityData.lon}</p> */}
            </ul>  
        }
        
      </>
    ) 
  }
}











export default App;


