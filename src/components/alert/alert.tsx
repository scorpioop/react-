import React from "react";
import Transition from "../transition/transition";
import classNames from "classnames";
export type AlertType = "success" | "default" | "danger" | "warning";
interface BaseAlertProps {
  type?: AlertType;
  title?: string;
  content?: string;
  closeIcon?: boolean;
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
}

export const Alert: React.FC<BaseAlertProps> = (props) => {
  const { type, title, content, closeIcon, children, open, onClose } = props;
  
  const classes = classNames("alert", {
    [`alert-${type}`]: type,
  });
  return (
    <Transition
      in={open}
      timeout={500}

    >
      <div className={classes}>
        <div>
          {title && <div className="title">{title}</div>}
          <div className="content">{children ? children : content}</div>
        </div>
        {closeIcon && (
          <div className="close" onClick={onClose}>
            X
          </div>
        )}
      </div>
    </Transition>
  );
};
Alert.defaultProps = {
  type: "default",
  closeIcon: true,
};
export default Alert;
