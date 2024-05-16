import React, { CSSProperties } from "react";
import { Label, Input, Textarea, Error } from "../atoms/Index";

type FormGroupProps = {
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  error?: string | undefined; 
  as?: "input" | "textarea";
  accept?: string;
  style?: CSSProperties;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  className,
  error,
  as = "input",
  accept,
  style
}) => {
  
  return (
    <div className="">
      <Label className="">
        {label}
      </Label>
      {as === "input" ? (
        <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        accept={accept}
        style={style}
      />
      ) : (
        <Textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={className}
          style={style}
        />
      )}
      {error &&
        <Error>
        {error}
      </Error>
      }
    </div>
  );
};

export default FormGroup;

