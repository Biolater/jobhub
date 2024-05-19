const DeleteIcon = () => {
  return (
    <svg
      className="fill-primary transition-colors duration-300 group-hover/deleteIcon:fill-red-500 deleteIcon"
      
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="DeleteIcon"
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
    </svg>
  );
};

export default DeleteIcon;
