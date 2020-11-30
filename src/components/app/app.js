import React, { Component } from 'react'
import crudService from '../../services/crudServices'
import {Col, Row, Container, Button} from 'reactstrap';
import Modal from '../modal/modal'
import Item from '../item/item'
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  crudService = new crudService(); 
  state = {
    data: [],
    error: false,
    showModal: false,
  }

  componentDidMount() {
    this.updataData();
  }

  onDataLoaded = (data) => {
      this.setState({
          data:data,
          error: false
      })
  }

  onError = (err) => {
      this.setState({
          error: true
      })
  }

  updataData = () => {
      this.crudService.getAllItem()
      .then(this.onDataLoaded)
      .catch(this.onError);
  }
  handleModal = () => {
    this.setState({showModal: !this.state.showModal});
  }



// render function

  renderBlock(arr) {
    return arr.map(item => {
      const {id, name, title, description, image} = item;
      return(
          <div key={id}>
              <Item 
                id = {id}
                name = {name}
                title = {title}
                description = {description}
                image = {image}
                updataData = {this.updataData}
              ></Item>
          </div>
      )
    })
  }


  render() {
      const data = this.state.data;
      console.log(data);
      const items = this.renderBlock(data);
   
    return (
      <div >
          <Button
          color="info"
          className = 'mb-20'
          onClick = {this.handleModal}
          >Add Elements</Button>

          <div className='items'>
            {items}
          </div>

          <Modal 
          showModal = {this.state.showModal}
          onToggleModal = {this.handleModal}
          updataData = {this.updataData}
          ></Modal>
      </div>
    )
  }
}
