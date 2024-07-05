import React from "react";
import { BsEnvelopeHeart } from "react-icons/bs";
import '@/components/header/header.css'

const header = () => {
  return (
    <div className="container">
      <BsEnvelopeHeart className="logo" />
      <div className="login">login</div>
    </div>
  );
};

export default header;
