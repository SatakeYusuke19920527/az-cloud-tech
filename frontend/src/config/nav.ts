import { NavItem } from '@/types/nav';
import {
  Image,
  ImageDown,
  Layers,
  LayoutDashboard,
  Settings,
  ThumbsUpIcon,
} from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: '今月のPoC',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'ゼニの話',
    href: '/dashboard/money',
    icon: Image,
  },
  {
    title: 'Load to MVP',
    href: '/dashboard/mvp',
    icon: Layers,
  },
  {
    title: 'News',
    href: '/dashboard/news',
    icon: ImageDown,
  },
  {
    title: 'PoC Showcase',
    href: '/dashboard/poc-showcase',
    icon: ThumbsUpIcon,
  },
  {
    title: '設定',
    href: '/dashboard/settings',
    icon: Settings,
  },
];
