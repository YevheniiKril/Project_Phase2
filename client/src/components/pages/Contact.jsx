import React from 'react';
import {Container} from 'react-bootstrap';

function Contact () {
    return (
        <Container className ="my-5">
          <header className="jumbotron">
           <h1>Contact Information</h1>
          </header>

          <div>
           <p>Phone number: 8(800) - 555 -35 -35</p>
           <p>Email: yourhorrorstory@info.com</p>
         </div>
        </Container>
    );

}

export default Contact;