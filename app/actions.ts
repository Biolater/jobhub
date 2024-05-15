'use server'

import { cookies } from 'next/headers';

export default async function action(value: boolean) {
    cookies().set("isLoggedIn", `${value}`);
};