const styles = {
  primary: `
    bg-white/10 text-white border border-white/20
    hover:bg-white/20
    backdrop-blur-md
  `,
  secondary: `
    bg-white text-gray-700 border border-gray-200
    hover:bg-gray-100
  `,
};

const defaultStyles = `
  px-5 py-2.5 rounded-xl 
  text-sm font-medium
  flex items-center justify-center gap-2
  transition-all duration-200 ease-in-out
  shadow-sm hover:shadow-md
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const Button = ({
  variant,
  text,
  StartIcon,
  onClick,
  loading,
}: ButtonProps) => {
  return (
    <button
      className={`${styles[variant]} ${defaultStyles}`}
      onClick={onClick}
      disabled={loading}
    >
      {StartIcon && <span className="opacity-80">{StartIcon}</span>}
      {text}
    </button>
  );
};

export default Button;

























// import { type ReactElement } from 'react'

// interface ButtonProps {
//   variant: 'primary' | 'secondary';
//   text:string;
//   StartIcon?:ReactElement;
//   onClick?: () => void;
//   loading?:boolean;
// }
// const styles = {
//   primary: 'bg-purple-600 text-white',
//   secondary: 'bg-purple-200 text-purple-600',
// };

// const defaultStyles = 'px-4 py-2 rounded-lg font-medium flex items-center gap-2 cursor-pointer';

// const Button = ({variant, text, StartIcon, onClick,loading}:ButtonProps & { onClick?: () => void }) => {
//   return (
//     <button className={styles[variant]+" "+defaultStyles+" "+(loading ? 'opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed' : '')} onClick={onClick} disabled={loading}>
//         {StartIcon}
//         {text}
//     </button>
//   )
// }

// export default Button