import React from 'react';
import iconBack from '../../assets/images/back.svg'

function Navbar(props) {

    function handlePage(){
        window.location.href='/'
    }

    return (

        <>
        {       
            props.pathname === 'detalhes' 
              ?
              <div className="Navbar">
                    Pokemon API
                    <div><img src={iconBack} alt="Sair" onClick={handlePage}/></div>
                </div>
              :
    
               <div className="Navbar">
                    Pokemon API
                </div>
          }
          </>
       

       
    );
}

export default Navbar;
