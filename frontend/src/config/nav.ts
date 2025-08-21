import { NavItem } from '@/types/nav';
import {
  BarChart2,
  Image,
  Layers,
  LayoutDashboard,
  Settings,
  StickyNote,
} from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: '今月のPoC',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'PoCs(test中..)',
    href: '/dashboard/pocs',
    icon: BarChart2,
  },
  {
    title: 'News',
    href: '/dashboard/note',
    icon: StickyNote,
  },
  {
    title: 'Information',
    href: '/dashboard/money',
    icon: Image,
  },
  {
    title: 'Load to MVP',
    href: '/dashboard/mvp',
    icon: Layers,
  },
  // {
  //   title: 'PoC Showcase(preview)',
  //   href: '/dashboard/poc-showcase',
  //   icon: ThumbsUpIcon,
  // },
  {
    title: '設定',
    href: '/dashboard/settings',
    icon: Settings,
  },
];
