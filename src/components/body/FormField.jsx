import { Field } from "formik";
import React from "react";
import styles from "/styles/components/body/FormField.module.css";

const FormField = (props) => {
  return (
    <div className={props.style}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={props.errorPosition}>
        <Field as={props.type} id={props.id} name={props.name}></Field>
        {props.touchedType && props.errorType && (
          <div className={styles.errorField}>{props.errorType}</div>
        )}
      </div>
    </div>
  );
};

export default FormField;
