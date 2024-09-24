import React from "react";

import Link from "next/link";

const Button = ({ text, url, btnClass }) => {
  return (
    //Equipe FrontEnd
    
    <Link href={url}>
      <button className={btnClass}>{text}</button>
    </Link>
  );
};

export default Button;