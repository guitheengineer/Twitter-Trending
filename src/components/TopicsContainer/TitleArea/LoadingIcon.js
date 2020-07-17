import React, { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { globalData } from "../../../Context";
function LoadingIcon() {
  const { isLoading } = useContext(globalData);
  return <ClipLoader css={style} size={14} loading={isLoading} />;
}

const style = `
            margin-left: 6px;
            border-radius: 100%;
            border: 1px solid;
            border-color: #000000;
            border-bottom-color: transparent;
            -webkit-animation: animation-s8tf20 0.75s 0s infinite linear;
            animation: animation-s8tf20 0.75s 0s infinite linear;
            animation-fill-mode: none;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          `;

export default LoadingIcon;
