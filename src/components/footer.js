import React from 'react';
import { Link } from 'react-router-dom';
import '../cssFiles/buttons.css'

const Footer = () => {
  return (
    <>
      <footer style={{ maxHeight: "400px", marginBottom: "0px",width:"100%" }} className="text-center bg-body-tertiary">
        <div className='contanier-fluid  '>
        <div className="container  d-flex flex-wrap " style={{justifyContent:'space-around'}}
        >
        <section style={{width:"50%",margin:"0px"}}>
        <div >
        קצת עלינו...
        <p>אתר זה נבנה כחלק מפרויקט גמר של קורס בסמח בעת הכשרה לעבודה בצה"ל
          מטעם עמותת עתידה  .
          מטרת האתר הינה ליצור את הקשרים הנכונים לבנות התוכנית בעיניין הנסיעות לבסיסים אירועי התוכנית וכדומה
          .אם נתקלתם בבעיות או רעיונות לשיפור האתר נשמח שתצרו איתנו קשר בפרטים המופיעים כאן </p></div>
        </section>
          <section className='justify-contant-start'>
            <h2>צרו קשר</h2>
            <a
              data-mdb-ripple-init
              className="btn btn-link btn-floating btn-lg text-body m-1"
              href="https://github.com/bMakover/final-project"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fa fa-github"></i>  gitHub
            </a>
            <br></br>
            <a data-mdb-ripple-init
              className="btn btn-link btn-floating btn-lg text-body m-1"
              href="https://google.com"
              role="button"
              data-mdb-ripple-color="dark">
              <i className="fa fa-envelope-o"></i>  herwaysite@gmail.com</a>
          </section>
       
      
        </div>

        <div className="container pt-4 d-flex flex-wrap justify-contant-center align-items-center">
      
        </div>
</div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2024 Copyright:
          <a className="text-body" target='_blank' href='https://github.com/CHANICHASIDA'> Chani Chsida, </a><a className="text-body" target='_blank' href='https://www.linkedin.com/in/hadar-ochana-317ab5247/'>  Hadar Ochana, </a><a target='_blank' href='https://github.com/bMakover'>BatSheva Makover.</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;