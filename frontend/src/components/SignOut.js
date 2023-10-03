import React from "react";

export default function SignOut(props) {
  React.useEffect(() => {
    props.onSignOut();
  }, []);
 }