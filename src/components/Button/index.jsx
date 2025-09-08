import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Button.module.scss";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  href,
  disabled = false,
  loading = false,
  className,
  onClick,
  ...rest
}) => {
  const Tag = href ? "a" : "button";
  const isDisabled = disabled || loading;

  const handleClick = (e) => {
    if (isDisabled) return;
    if (onClick) onClick(e);
  };

  return (
    <Tag
      href={href}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.disabled]: isDisabled,
          [styles.loading]: loading,
        },
        className
      )}
      onClick={handleClick}
      {...(href ? {} : { type: "button" })}
      {...rest}
    >
      <span className={clsx(styles.content, { [styles.hidden]: loading })}>
        {children}
      </span>
      {loading && (
        <span className={styles.loader}>
          <svg
            className={styles.spinner}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className={styles.path}
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="4"
            />
          </svg>
        </span>
      )}
    </Tag>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "bordered", "rounded"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  href: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
