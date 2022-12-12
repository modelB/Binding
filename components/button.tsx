import { FC } from "react";

export const Button: FC<{
  onClick?: () => void;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}> = ({ onClick, text, type, disabled }) => {
  return (
    <button
      className="border-2 rounded-sm border-solid border-current p-2 theme-red w-40 m-auto mt-2"
      onClick={onClick}
      type={type}
      disabled={!!disabled}
    >
      {text}
    </button>
  );
};
