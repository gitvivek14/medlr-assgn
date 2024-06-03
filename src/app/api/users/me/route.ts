import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { getDataFromToken } from '@/helpers/getDatafromtoken';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
    try {
        const userid = await getDataFromToken(request);
        const user = await User.findOne({ _id: userid }).select('-password');
        if (!user) {
            return NextResponse.json({
                message: 'User not found',
            }, { status: 404 });
        }
        return NextResponse.json({
            message: 'User found',
            data: user,
        }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: 'Failed to fetch user data',
            error: error.message,
        }, { status: 500 });
    }
}
