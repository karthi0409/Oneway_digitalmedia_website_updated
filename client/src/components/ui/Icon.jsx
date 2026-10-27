import React from 'react';
import {
  FiCheck,
  FiArrowRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiYoutube,
  FiTrendingUp,
  FiTarget,
  FiMonitor,
  FiVideo,
  FiShield,
  FiUsers,
  FiAward,
  FiLayers,
  FiDollarSign,
  FiSearch,
  FiCode,
  FiShoppingBag,
  FiGlobe,
  FiBriefcase,
  FiMenu,
  FiX,
  FiExternalLink,
  FiChevronUp,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import { BiMessageDetail, BiSupport } from 'react-icons/bi';
import { MdOutlineRocketLaunch, MdOutlineCampaign } from 'react-icons/md';

const iconMap = {
  // Feather icons
  FiCheck,
  FiArrowRight,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiYoutube,
  FiTrendingUp,
  FiTarget,
  FiMonitor,
  FiVideo,
  FiShield,
  FiUsers,
  FiAward,
  FiLayers,
  FiDollarSign,
  FiSearch,
  FiCode,
  FiShoppingBag,
  FiGlobe,
  FiBriefcase,
  FiMenu,
  FiX,
  FiExternalLink,
  FiChevronUp,
  FiAlertCircle,
  FiCheckCircle,
  // Business / Material icons
  BiMessageDetail,
  BiSupport,
  MdOutlineRocketLaunch,
  MdOutlineCampaign,
};

/**
 * Dynamic Icon Component
 * @param {{ name: string, size?: number|string, className?: string, style?: React.CSSProperties }} props
 */
export default function Icon({ name, size, className = '', style, ...rest }) {
  if (!name) return null;
  const Component = iconMap[name];
  if (!Component) {
    // Default fallback check
    return <FiCheck size={size} className={className} style={style} {...rest} />;
  }
  return <Component size={size} className={className} style={style} {...rest} />;
}
