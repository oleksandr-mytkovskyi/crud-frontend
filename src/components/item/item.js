import React, { Component } from 'react'
import crudService from '../../services/crudServices'
import './item.css'

export default class Item extends Component {
    crudService = new crudService();
    state = {
        id: this.props.id,
        showForm: false,
        name: this.props.name,
        title: this.props.title,
        description: this.props.description,
        image: this.props.image,
      }

    onShowForm = () => {
    this.setState({showForm: !this.state.showForm})
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    //   delete item from DB
    handleDelete = () => {
        this.crudService.deleteItem(this.state.id)
        .then(res => {
            if(res.status === 200){
                this.props.updataData();
            }
        })
        .catch(() => console.log('Some error where delete data'))
        .finally()
    }
    // updata item data
    editData = () => {
        const {id, name, title, description, image} = this.state;
        const data = {
            id: id,
            name: name,
            title: title,
            description: description,
            image: image,
        }
        const json = JSON.stringify(data);
        this.crudService.updataItem(id, json)
        .then(res => {
            console.log(res.status)
            if(res.status === 200){
            this.props.updataData();
          }
        })
        .catch(this.onError)
        .finally(() => {
            this.onShowForm();
        })
      }
      
      onSubmitForm = (e) => {
        e.preventDefault();
        this.editData();
      }

    renderItem = () => {
        const {id, name, title, description, image} = this.props;
        return (
            <div key={id} className='block' id={id}>
                <div className='photo'>
                <img src={`${image}`} alt=""></img>
                </div>
                <h2>{name}</h2>
                <p>{title}</p>
                <p>{description}</p>
                <div className='mb-20 btn btn-info edit-btn' onClick={this.onShowForm}>Edit</div>
                <div className='mb-20 btn btn-info edit-btn' onClick={this.handleDelete}>Delete</div>
         </div>
        )
    }
    renderEditForm = () => {
        const {id, name, title, description, image} = this.state;
        return (
            <>
                <form key={id} className='block' id={id} onSubmit={this.onSubmitForm}>
                    <div className='photo'>
                    <img src={`${image}`} alt=""></img>
                    </div>
                    <input placeholder='image link' name='image' value={image}  onChange={this.handleInputChange}/>
                    <input placeholder='name' name='name' value={name}  onChange={this.handleInputChange}/>
                    <input placeholder='title' name='title' value={title}  onChange={this.handleInputChange}/>
                    <input placeholder='description' name='description' value={description}  onChange={this.handleInputChange}/>
                    <div className='mod-btn'>
                        <button type='button' onClick={this.onShowForm}>Close</button>
                        <button type='submit' >Update</button>
                    </div>
                </form>
            </>
        )
    }

    render() {
            let content = this.state.showForm ? this.renderEditForm() : this.renderItem();
           return(
            <>
                {content}
            </>
           )
    }
}
