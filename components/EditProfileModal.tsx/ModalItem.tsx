import { FC } from "react";

const ModalItem: FC<{
  text: string;
  value: string;
  title: string;
  placeholder: string;
  onInputChange: (key: string, value: string) => void;
}> = ({ text, value, title, placeholder, onInputChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(title, event.target.value);
  };
  return (
    <div className="profileEdit__modal-item grid items-center grid-cols-4 gap-4">
      <label htmlFor="" className="text-sm text-end font-semibold text-whitish">
        {text}
      </label>
      <input
        placeholder={placeholder}
        onChange={handleChange}
        type="text"
        value={value}
        className="modalItem__input text-sm transition-all duration-300  w-full col-span-3 bg-primary text-whitish border-2 focus-visible:outline-none focus-visible:border-whitish border-zephyr py-2 px-3 rounded-lg"
      />
    </div>
  );
};

export default ModalItem;
