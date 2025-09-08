

function Button({
    children,
    type = 'button',
    text,
    onClick,
    className = '',
    disabled = false,
    active = false,
    size = 'md', // 'sm', 'md', 'lg'
    ...props
}) {
    // Size classes
    let sizeClass = '';
    switch (size) {
        case 'sm':
            sizeClass = 'py-1 px-4 text-sm';
            break;
        case 'lg':
            sizeClass = 'py-3 px-16 text-lg';
            break;
        case 'md':
        default:
            sizeClass = 'py-2 px-8 text-base';
            break;
    }

    const activeClass = active
        ? 'bg-primary dark:bg-primary-dark text-white'
        : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${sizeClass} border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300 ${activeClass} ${className}`}
            {...props}
        >
            {text || children}
        </button>
    );
}

export default Button;
