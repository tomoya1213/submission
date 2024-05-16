import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: React.FC<TextareaProps> = (props) => (
  <textarea {...props} className="border-2 w-full" />
);

export default Textarea;
