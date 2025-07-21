import { NavItem } from '@/types/nav';
import {
  Image,
  Layers,
  LayoutDashboard,
  Settings,
  StickyNote,
  ThumbsUpIcon,
  BarChart2, // 追加
} from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: '今月のPoC',
    href: '/dashboard',
    icon: LayoutDashboard,
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
  {
    title: 'PoC Showcase(preview)',
    href: '/dashboard/poc-showcase',
    icon: ThumbsUpIcon,
  },
  {
    title: '設定',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    title: 'Analysis',
    href: '/dashboard/analysis',
    icon: BarChart2,
  },
];
