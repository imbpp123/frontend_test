"use client";

import { NextUIProvider } from "@nextui-org/react";
import { FirebaseProvider } from "@/providers/firebase-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <FirebaseProvider>{children}</FirebaseProvider>
        </NextUIProvider>
    );
}
