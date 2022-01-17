import React from 'react'

const SidebarLink = ({text, Icon, active}) => {
    return (
        <div className="text-white flex items-center justify-center xl:justify-start text-lg space-x-3 hoverAnimation">
            <Icon className="h-6 w-6"/>
            <span className="hidden xl:inline">{text}</span>
        </div>
    )
}

export default SidebarLink
