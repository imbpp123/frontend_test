import {
    initializeApp,
    cert,
    getApps,
    ServiceAccount,
} from "firebase-admin/app";
import {
    getFirestore,
} from "firebase-admin/firestore";
import { SERVICE_ACCOUNT } from "@/constants/firebase";
import { NextResponse } from "next/server";

export async function GET() {
    if (getApps().length === 0) {
        initializeApp({
            credential: cert(SERVICE_ACCOUNT as ServiceAccount),
        });
    }

    const db = getFirestore();
    let data = [];

    try {
        const snapshot = await db.collection("interviews").get();
        data = snapshot.docs.map((doc: { data: () => any }) => doc.data());
    } catch (error) {
        return NextResponse.json({ error }, { status: 403 });
    }

    return NextResponse.json({ data });
}

/*
export async function POST(request: Request) {
    return Response.json({ data: DATA })
}*/
