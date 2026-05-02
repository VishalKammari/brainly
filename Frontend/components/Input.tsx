interface InputProps {
  ref?: any;
  placeholder: string;
}

function Input({
  ref,
  placeholder
}: InputProps) {
  return (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      className='border border-gray-300 rounded-md px-4 py-2 w-full'
    />
  )
}
export default Input