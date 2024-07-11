import React from "react";
import styles from "./errorMessage.module.css";
import { ErrorMessageProps } from "./errorMessage.type";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
  return <div className={styles.errorText}>{text}</div>;
};

export default ErrorMessage;
