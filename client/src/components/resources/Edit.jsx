import React, {useState, useEffect} from 'react';
import {Form ,Container} from 'react-bootstrap';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

const Edit = function (props) {

    const id = props.location.state.id;

    const [inputs, setInputs] = useState({
        title: '',
        content: '',
        status: 'DRAFT'
    });

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () => {
          const resourcesResp = await Axios.get(`/api/resources/${id}`);
          if (resourcesResp.status === 200) setInputs(resourcesResp.data);
        })();
      }, []);

    const handleSubmit = async event => {
        event.preventDefault();
       try{
        const resp = await Axios.post('/api/resources/update', inputs);

        if (resp.status === 200) {
            toast("The story was updating successfully", {
                type: toast.TYPE.SUCCESS
            });
            setRedirect(true);
        } else {
            toast("There was an issue updating the story", {
                type: toast.TYPE.ERROR
            });
        }
       } catch (error) {
        toast("There was an issue updating the story", {
            type: toast.TYPE.ERROR
        });
       }
    };

    const handleInputChange = async event => {

     event.persist();

     const {name,value} = event.target;

     setInputs(inputs => ({
         ...inputs,
         [name]: value
     }));

    }; 

    if (redirect) return (<Redirect to='/resources'/>);
     return (
         <Container className="my-5">
             <header>
                 <h1>Edit Your Story</h1>
             </header>

            <hr/>

            <div>
               <Form onSubmit={handleSubmit}>
                   <Form.Group>
                     <Form.Label>Title</Form.Label>  
                     <Form.Control
                     name = "title"
                     onChange={handleInputChange}
                     value={inputs.title}
                     />
                   </Form.Group>
                   <Form.Group>
                     <Form.Label>Content</Form.Label>  
                     <Form.Control
                     as="textarea"
                     name = "content"
                     onChange={handleInputChange}
                     value={inputs.content}
                     />
                   </Form.Group>
                   

                   <Form.Group>
                       <button type="submit" className="btn btn-primary">Update</button>
                   </Form.Group>
                   </Form> 
            </div>
         </Container>

     );

};

export default Edit;