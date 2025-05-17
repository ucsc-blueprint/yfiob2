"use client";

import {Suspense} from "react";
import {LoginUser} from "./LoginUser";

export default function Page(){
    return(
        <Suspense fallback={
            <div>Loading Login Page...</div>
        }>
            <LoginUser/>
        </Suspense>
    );
}