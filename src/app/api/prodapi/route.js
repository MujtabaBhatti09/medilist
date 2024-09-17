import { getmyprods, myprods } from "../../prodmod";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json()
        if (data) {
            const prod = await myprods(data)
            return NextResponse.json({
                message: "Data Posted Successfully!",
                status: 200,
                prod
            })
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return NextResponse.json({
            error: error.message,
            status: 401
        })
    }
}

export async function GET() {
    try {
        const medicines = await getmyprods()
        return NextResponse.json({
            message: "Data Fetched Successfully",
            status: 200,
            medicines
        })
    } catch (error) {
        console.log('====================================');
        console.log(error)
        console.log('====================================');
        return NextResponse.json({
            error: error.message,
            status: 401
        })
    }
}