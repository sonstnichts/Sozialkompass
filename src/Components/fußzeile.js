 
import React from 'react';
import { MDBFooter,
         MDBContainer,
         MDBCol,
         MDBRow 
        } from 'mdb-react-ui-kit';

function Footers() {
  return (
    <MDBFooter bgColor='light' className='text-center'>
      <MDBContainer className='p-3'>
        <MDBRow>
          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-4">
              <li>
                <a href="#!" className="text-dark">
                  Link 1
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark">
                  Link 2
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark">
                  Link 3
                </a>
              </li>
              <li>
                <a href="#!" className="text-dark">
                  Link 4
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'light' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://www.prof-becker.de'>
          sozialkompass.de 
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footers;

