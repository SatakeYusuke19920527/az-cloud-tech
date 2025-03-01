'use client';

import { msalConfig } from '@/lib/msalConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import React from 'react';

const msalInstance = new PublicClientApplication(msalConfig);

export function Providers({ children }: { children: React.ReactNode }) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
