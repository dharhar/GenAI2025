import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Layout, 
  MessageSquare, 
  User, 
  Settings 
} from 'react-feather';

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Layout,
    href: "/dashboard",
    exact: true,
  },
  {
    title: "Chat",
    icon: MessageSquare,
    href: "/dashboard/chat",
  },
  {
    title: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar h-[90vh] border-r border-gray-200">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {sidebarItems.map((item, index) => {
              const isActive = item.exact 
                ? location.pathname === item.href
                : location.pathname.includes(item.href.split("?")[0]);
                
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`flex items-center gap-3 rounded px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
