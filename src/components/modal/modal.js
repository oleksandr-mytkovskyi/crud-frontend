import React, { Component } from 'react'
import crudService from '../../services/crudServices'
import './modal.css'

export default class Modal extends Component {
    crudService = new crudService();
    state = {
        name: '',
        title: '',
        description: '',
        image: '',
      }

    //Post metods

sendPostData = () => {
    const {name, title, description, image} = this.state;
    const data = {
        name: name,
        title: title,
        description: description,
        image: image,
    }
    const json = JSON.stringify(data);
    this.crudService.createItem(json)
    .then(res => {
        console.log(res.status)
        if(res.status === 200){
        this.props.updataData();
      }
    })
    .catch((err) => console.log(`some err ${err}`))
    .finally(() => {
        this.props.onToggleModal();
        this.setState({
            name: '',
            title: '',
            description: '',
            image: '',
        })
    })
  }
  
  
  onSubmitForm = (e) => {
    e.preventDefault();
    this.sendPostData();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

    render() {
        const activeClass = this.props.showModal ? 'show' : 'hide';
        return (
            <div className={activeClass}>
                    <div className='mod-form'>
                        <div className='mod-close' onClick={this.props.onToggleModal}>х</div>
                        <form onSubmit={this.onSubmitForm} action='#' className='row-form'>
                            <input placeholder='name' name='name' onChange={this.handleInputChange} value={this.state.name}/>
                            <input placeholder='title' name='title' onChange={this.handleInputChange} value={this.state.title}/>
                            <input placeholder='description' name='description' onChange={this.handleInputChange} value={this.state.description}/>
                            <input placeholder='image link' name='image' onChange={this.handleInputChange} value={this.state.image}/>
                            <div className='mod-btn'>
                                <button type='button' onClick={this.props.onToggleModal}>Close</button>
                                <button type='submit' >Add</button>
                            </div>
                        </form>
                    </div>
                    <div className='overlay'> </div>
            </div>
        )
    }
}
