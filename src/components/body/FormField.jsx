import { Field } from "formik"

const FormField = (props) => {
  return (
    <div className={props.style}>
      <label htmlFor={props.name} className="w-full">
        {props.label}
      </label>
      <Field
        className={`border-2 rounded py-1 px-2 w-full ${
          props.touchedType && props.errorType && "border-red-600"
        }`}
        rows={props.rows}
        id={props.id}
        name={props.name}
        as={props.type}
        placeholder={props.placeholder}
      ></Field>
      {props.touchedType && props.errorType && (
        <div className="errorField mt-1 text-red-600">{props.errorType}</div>
      )}
    </div>
  )
}

export default FormField
