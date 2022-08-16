import React, {useEffect, useState} from 'react'
import {Card, Button, Modal} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import AdForm from './AdForm';

const image = require("../img/adpic.png")
const API_URL = '/api/'


function AdCard(props) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setEditing(false)
  };
  const handleEdit = () => {
    setEditing(true);
  }

  const handleDelete = async () => {
    const token = JSON.parse(localStorage.getItem('seller')).token
    console.log(props.ad._id)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await axios.delete(API_URL+`ad/${props.ad._id}`, config)
        await toast.success(response.data.message)
        handleClose()
        setTimeout(()=> {
          navigate(0)

        }, 3000)
    } catch (err) {
        toast.error(err.response.data.message)

    }
  }

  useEffect(()=> {
    if (localStorage.getItem("seller")!==null) {
      const id = JSON.parse(localStorage.getItem('seller'))._id
      if (id && props.ad.seller._id==id) {
        setIsOwner(true);
      }
    }

  },[])
  return (
    <>
        <Card style={{ margin:'10px', height:'20rem', cursor:'pointer'}} className='shadow-sm bg-white rounded' onClick = {handleShow}>
          
          <Card.Img variant="top" src={props.ad.imageUrl} className='mx-auto' style={{maxHeight:'100%', maxWidth: '100%', objectFit:'contain', margin:'0', zIndex:'100'}} alt={props.ad.title + ' image'}/>
          <div className='mt-auto card-footer w-100 m-0 position-absolute bottom-0 bg-light' style={{zIndex:'100'}}>
            <Card.Title  style={{marginTop:'auto'}}>{props.ad.title}</Card.Title>
            <Card.Text className='text-success'>
                ${props.ad.price/100}
                </Card.Text>
          </div>
            
        </Card>

        <Modal show={show} onHide={handleClose} centered size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>
              {props.ad.title} 
              <h5 className='text-success my-0 inline'>${props.ad.price/100}</h5>
            
            </Modal.Title>
          </Modal.Header>
          {editing? (<>
            <Modal.Body>
              <h3>Edit Ad</h3>

              <AdForm operation='put' ad={props.ad}/>
            </Modal.Body>
          </>):(
            <>
              <Modal.Body>
              <div className='d-flex justify-content-between'>
                <div>
                  <img src={props.ad.imageUrl} className='rounded' style={{maxWidth:'100%', maxHeight:'500px', objectFit:'contain', margin:'0px'}} alt={props.ad.title + ' image'}/>
                </div>
                <div className='mx-3 bg-light p-3 rounded'>
                  <p>Description: {props.ad.description}</p>
                  <p>Location: {props.ad.location.coordinates[1]}, {props.ad.location.coordinates[0]}</p>
                  <p>Condition: {props.ad.condition}</p>



                  <p>Seller: {props.ad.seller.name}</p>
                  <p>Seller's email: {props.ad.seller.email}</p>
                  {props.ad.seller.phone!='false' ? (
                  <p>Seller's phone number: {props.ad.seller.phone}</p>)
                    : (<></>)
                  }
                </div>
              </div>
            </Modal.Body>
            </>
          )}
          
          <Modal.Footer>
            {isOwner ? (<>
              <Button variant="primary" onClick={handleEdit}>Edit</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            
            </>) : (<></>)}
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default AdCard