'use client';
import React, { useEffect } from 'react';
import { 
  ChevronDown, ChevronRight, Home,
  Info, 
  BookOpen, 
  HelpCircle, 
  PhoneIncoming, 
  LogIn, 
  Settings, 
  User,
  Building,
  Briefcase,
  ListTodo,
  ClipboardList,
  Users,
  BadgePercent,
  Landmark,
  UserCheck,
  UserMinus,
  UserPlus,
  Building2,
  GraduationCap,
  Shield,
  FileText,
  Heart,
  DollarSign,
  Truck
} from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Enhanced icon mapping with more specific icons
const iconMap = {
  "Home": <Home className="w-5 h-5 mr-2 text-blue-600" />,
  "About Us": <Info className="w-5 h-5 mr-2 text-green-600" />,
  "All About ODR": <BookOpen className="w-5 h-5 mr-2 text-purple-600" />,
  "Help/FAQs": <HelpCircle className="w-5 h-5 mr-2 text-red-600" />,
  "Get In Touch": <PhoneIncoming className="w-5 h-5 mr-2 text-teal-600" />,
  "ODR Login": <LogIn className="w-5 h-5 mr-2 text-indigo-600" />,
  "Masters": <Settings className="w-5 h-5 mr-2 text-gray-700" />,
  "User Groups": <Users className="w-5 h-5 mr-2 text-blue-500" />,
  "Users": <User className="w-5 h-5 mr-2 text-blue-500" />,
  "Branch/Venue": <Building className="w-5 h-5 mr-2 text-amber-600" />,
  "Department/Cost Centres": <Briefcase className="w-5 h-5 mr-2 text-orange-600" />,
  "Case Types": <FileText className="w-5 h-5 mr-2 text-indigo-500" />,
  "Task Types": <ListTodo className="w-5 h-5 mr-2 text-cyan-600" />,
  "Task Status": <ClipboardList className="w-5 h-5 mr-2 text-pink-600" />,
  "Contacts/Entities": <Users className="w-5 h-5 mr-2 text-emerald-600" />,
  "Employees": <UserCheck className="w-5 h-5 mr-2 text-blue-500" />,
  "Law Firms": <Briefcase className="w-5 h-5 mr-2 text-gray-700" />,
  "Advocates": <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />,
  "Arbitrators": <Shield className="w-5 h-5 mr-2 text-purple-600" />,
  "Business Associates": <UserPlus className="w-5 h-5 mr-2 text-green-600" />,
  "Banks": <Landmark className="w-5 h-5 mr-2 text-blue-600" />,
  "Borrowers": <UserMinus className="w-5 h-5 mr-2 text-red-600" />,
  "CO Borrowers": <Users className="w-5 h-5 mr-2 text-red-500" />,
  "Contact Person": <User className="w-5 h-5 mr-2 text-teal-600" />,
  "Financial Institutions": <Landmark className="w-5 h-5 mr-2 text-blue-700" />,
  "Govt Agency": <Building2 className="w-5 h-5 mr-2 text-red-700" />,
  "Guarantor": <Shield className="w-5 h-5 mr-2 text-amber-600" />,
  "Insurance Company": <Heart className="w-5 h-5 mr-2 text-pink-600" />,
  "NBFC": <DollarSign className="w-5 h-5 mr-2 text-green-700" />,
  "NGO": <Heart className="w-5 h-5 mr-2 text-purple-600" />,
  "Vendors/Service Providers": <Truck className="w-5 h-5 mr-2 text-slate-600" />,
  "Other Contact": <BadgePercent className="w-5 h-5 mr-2 text-gray-600" />,
};

// Updated menu data without the parameter string in the URL
const menuData = [
  { id: 1, name: "Home", url: "../Global/Default.aspx", level: 0, parentId: 0 },
  { id: 2, name: "About Us", url: "../Global/Aboutus.aspx", level: 0, parentId: 0 },
  { id: 3, name: "All About ODR", url: null, level: 0, parentId: 0 },
  { id: 4, name: "Help/FAQs", url: null, level: 0, parentId: 0 },
  { id: 5, name: "Get In Touch", url: "../Global/ContactUs.aspx", level: 0, parentId: 0 },
  { id: 6, name: "Introduction", url: "../Global/OdrIntro.aspx", level: 0, parentId: 3 },
  { id: 7, name: "Clause", url: "../Global/OdrClause.aspx", level: 0, parentId: 3 },
  { id: 8, name: "Rules & Regulations", url: "../Global/Rules.aspx", level: 0, parentId: 3 },
  { id: 9, name: "Standard Operating Procedure", url: "../Global/Sop.aspx", level: 0, parentId: 3 },
  { id: 10, name: "Registration Process", url: "../Global/RegProcess.aspx", level: 0, parentId: 4 },
  { id: 11, name: "Terms Of Usage Of ODR Portal", url: "../Global/Terms.aspx", level: 0, parentId: 4 },
  { id: 12, name: "FAQs", url: "../Global/FAQ.aspx", level: 0, parentId: 4 },
  { id: 13, name: "ODR Login", url: null, level: 0, parentId: 0 },
  { id: 14, name: "Registered Users", url: "../Global/Login.aspx", level: 0, parentId: 13 },
  { id: 15, name: "New Users (Sign Up)", url: "../Global/SignUp.aspx", level: 0, parentId: 13 },
  { id: 16, name: "Masters", url: null, level: 0, parentId: 0 },
  { id: 17, name: "User Groups", url: "../Masters/UserGroup.aspx", level: 1, parentId: 16 },
  { id: 18, name: "Users", url: "../Masters/Users.aspx", level: 1, parentId: 16 },
  { id: 19, name: "Branch/Venue", url: "../Masters/Branch.aspx", level: 1, parentId: 16 },
  { id: 20, name: "Department/Cost Centres", url: "../Masters/Department.aspx", level: 1, parentId: 16 },
  { id: 21, name: "Case Types", url: "../Masters/CaseTypes.aspx", level: 1, parentId: 16 },
  { id: 22, name: "Task Types", url: "../Masters/TaskTypes.aspx", level: 1, parentId: 16 },
  { id: 23, name: "Task Status", url: "../Masters/TaskStatus.aspx", level: 1, parentId: 16 },
  { id: 24, name: "Contacts/Entities", url: null, level: 1, parentId: 16 },
  { id: 25, name: "Employees", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 26, name: "Law Firms", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 27, name: "Advocates", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 28, name: "Arbitrators", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 29, name: "Business Associates", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 30, name: "Banks", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 31, name: "Borrowers", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 32, name: "CO Borrowers", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 33, name: "Contact Person", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 34, name: "Financial Institutions", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 35, name: "Govt Agency", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 36, name: "Guarantor", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 37, name: "Insurance Company", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 38, name: "NBFC", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 39, name: "NGO", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 40, name: "Vendors/Service Providers", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 },
  { id: 41, name: "Other Contact", url: "../Masters/Contacts.aspx", level: 2, parentId: 24 }
];

// Helper functions to add contact type context to URLs without showing it in the UI
const getContactTypeUrl = (url, itemName) => {
  if (!url || !url.includes('Contacts.aspx')) return url;
  
  const contactTypeMap = {
    "Employees": "EM",
    "Law Firms": "LW",
    "Advocates": "AD",
    "Arbitrators": "AR",
    "Business Associates": "BA",
    "Banks": "BN",
    "Borrowers": "BR",
    "CO Borrowers": "CB",
    "Contact Person": "CP",
    "Financial Institutions": "FI",
    "Govt Agency": "GO",
    "Guarantor": "GR",
    "Insurance Company": "IC",
    "NBFC": "NB",
    "NGO": "NG",
    "Vendors/Service Providers": "VR",
    "Other Contact": "OC"
  };
  
  const code = contactTypeMap[itemName];
  return code ? `${url}?='${code}'` : url;
};

// Recursively build the menu tree
const buildMenuTree = (items, parentId = 0) =>
  items
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      children: buildMenuTree(items, item.id)
    }));

// Component to render a single menu item and its children
const MenuItem = ({ item, level = 0, activePath, isFirstRender }) => {
  // Auto-expand parent of active item
  const shouldBeOpen = () => {
    // Check if this menu item is a parent of the active path
    if (item.children && item.children.some(child => 
      child.url === activePath || 
      (child.children && child.children.some(grandchild => grandchild.url === activePath))
    )) {
      return true;
    }
    return false;
  };
  
  const [isOpen, setIsOpen] = React.useState(shouldBeOpen());
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activePath === item.url;
  
  // Update open state when activePath changes
  React.useEffect(() => {
    if (isFirstRender && shouldBeOpen()) {
      setIsOpen(true);
    }
  }, [activePath, isFirstRender]);

  const indentStyle = { marginLeft: `${level * 12}px` };
  const url = getContactTypeUrl(item.url, item.name);

  return (
    <div className="menu-item group">
      <div
        style={indentStyle}
        className={`flex items-center justify-between py-2 px-3 my-1 cursor-pointer rounded-md transition-all duration-200 hover:translate-x-1 ${
          isActive 
            ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm" 
            : "text-gray-700 hover:bg-gray-50"
        } ${hasChildren ? "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100" : ""}`}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center w-full">
          {hasChildren ? (
            isOpen ? (
              <ChevronDown className={`w-4 h-4 mr-2 transition-transform duration-200 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
            ) : (
              <ChevronRight className={`w-4 h-4 mr-2 transition-transform duration-200 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
            )
          ) : (
            <div className="w-4 h-4 mr-2" />
          )}
          
          {/* Render icon if defined */}
          {iconMap[item.name] && 
            <div className="transition-transform duration-200 group-hover:scale-110">
              {iconMap[item.name]}
            </div>
          }
          
          {url ? (
            <Link 
              href={url} 
              className={`block transition-colors duration-200 ${isActive ? "font-medium" : "hover:text-blue-600"}`}
            >
              {item.name}
            </Link>
          ) : (
            <span className={`${hasChildren ? "font-medium" : ""}`}>{item.name}</span>
          )}
        </div>
      </div>
      
      {hasChildren && (
        <div 
          className={`menu-children overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {item.children.map(child => (
            <MenuItem 
              key={child.id} 
              item={child} 
              level={level + 1} 
              activePath={activePath} 
              isFirstRender={isFirstRender}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Add custom styles to the global stylesheet
const addCustomStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Custom scrollbar styles */
    .scrollbar-thin::-webkit-scrollbar {
      width: 6px;
    }
    
    .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
      background-color: #d1d5db;
      border-radius: 3px;
    }
    
    .scrollbar-track-gray-100::-webkit-scrollbar-track {
      background-color: #f3f4f6;
      border-radius: 3px;
    }
    
    /* Smooth animation for expanding/collapsing */
    .menu-children {
      will-change: max-height;
    }
    
    /* Hover effects */
    .menu-item:hover > div {
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
  `;
  document.head.appendChild(style);
};

const Sidebar = () => {
  const [isFirstRender, setIsFirstRender] = React.useState(true);
  const menuTree = buildMenuTree(menuData);
  const pathname = usePathname();
  
  React.useEffect(() => {
    setIsFirstRender(false);
    addCustomStyles();
  }, []);
  
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 flex-shrink-0">
        <div className="relative font-bold text-lg text-gray-900 border-b border-gray-200 pb-3 mb-4 flex items-center">
          <span>Navigation Menu</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pt-0">
        <div className="space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {menuTree.map(item => (
            <MenuItem 
              key={item.id} 
              item={item} 
              activePath={pathname} 
              isFirstRender={isFirstRender}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;