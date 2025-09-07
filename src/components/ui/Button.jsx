

function Button({
    text,
    children,
    type = 'button',
    onClick,
    className = '',
    disabled = false,
    active = false,
    ...props
}) {

    const activeClass = active
        ? 'bg-primary dark:bg-primary-dark text-white'
        : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`py-1 px-4 md:px-8 lg:py-4 lg:px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300 ${activeClass} ${className}`}
            {...props}
        >
            { text || children}
        </button>
    );
}

export default Button;
