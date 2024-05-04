import { useAuth } from "../../../authContext/AuthContext";



const MobileWidgets = () => {
  const { user, logout } = useAuth();
  return (
    <div className="offcanvas-widget-area">
      <div className="off-canvas-contact-widget d-flex justify-content-center">
        <button className="btn btn-danger" onClick={() => logout()}>Logout</button>
        {/* <div className="header-contact-info">
          <ul className="header-contact-info__list">
            <li>
              <i className="fa fa-phone"></i>{" "}
              <a href="tel://9738567302">(+91) 9738 567 302 </a>
            </li>
            <li>
              <i className="fa fa-envelope"></i>{" "}
              <a href="mailto:uvistix@gmail.com">uvistix@gmail.com</a>
            </li>
          </ul>
        </div> */}
      </div>
      {/*Off Canvas Widget Social Start*/}
      {/* <div className="off-canvas-widget-social">
       
        <a href="//instagram.com" title="Instagram">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="//facebook.com" title="Facebook">
          <i className="fa fa-facebook"></i>
        </a>
       
      </div> */}
      {/*Off Canvas Widget Social End*/}
    </div>
  );
};

export default MobileWidgets;
