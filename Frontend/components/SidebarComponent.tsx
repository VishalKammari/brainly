import { type ReactElement, type JSX } from 'react'

interface SidebarComponentProps {
  text?: string
  icon?: JSX.Element | ReactElement
}

const SidebarComponent = ({ text, icon }: SidebarComponentProps): JSX.Element => {
  return (
    <div className='flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100'>
        <div>
            {icon}
        </div>
        <div className='font-medium'>
            {text}
        </div>
    </div>
  )
}

export default SidebarComponent