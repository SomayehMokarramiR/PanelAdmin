// ** Icons Import
import { Heart } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
      تمام حقوق مادی و معنوی این سایت متعلق به © 
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          آکادمی بحر
        </a>
        <span className="d-none d-sm-inline-block">, میباشد  </span>
      </span>
      <span className="float-md-end d-none d-md-block ">
      <Heart size={14} />
       با آکادمی بحر 
      </span>
    </p>
  );
};

export default Footer;
