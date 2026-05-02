import SidebarComponent from './SidebarComponent'
import Xicon from '../components/icons/Xicon'
import YoutubeIcon from '../components/icons/YoutubeIcon'

interface SidebarProps {
  activeFilter?: string | null
  onFilterSelect?: (filter: string | null) => void
}

const Sidebar = ({ activeFilter, onFilterSelect }: SidebarProps) => {
  const filters = [
    { label: "Twitter", type: "twitter", icon: <Xicon /> },
    { label: "Youtube", type: "youtube", icon: <YoutubeIcon /> },
  ]

  return (
    <div className='h-full bg-white border-r w-60 fixed left-0 top-0'>
      <div className='font-instrument text-4xl p-4 pl-6 font-weight-bold'>
        Brainly
      </div>
      
      {/* Show all button */}
      <div 
        onClick={() => onFilterSelect?.(null)}
        className={`flex items-center gap-3 p-4 cursor-pointer transition ${
          activeFilter === null ? 'bg-purple-100 border-r-4 border-purple-600' : 'hover:bg-gray-100'
        }`}
      >
        <div className='font-medium text-slate-700'>All</div>
      </div>

      {/* Filter buttons */}
      {filters.map((filter) => (
        <div 
          key={filter.type}
          onClick={() => onFilterSelect?.(filter.type)}
          className={`flex items-center gap-3 p-4 cursor-pointer transition ${
            activeFilter === filter.type ? 'bg-purple-100 border-r-4 border-purple-600' : 'hover:bg-gray-100'
          }`}
        >
          <SidebarComponent text={filter.label} icon={filter.icon} />
        </div>
      ))}
    </div>
  )
}

export default Sidebar