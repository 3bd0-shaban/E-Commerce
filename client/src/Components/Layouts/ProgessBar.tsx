'use client';
import { FC, useState } from 'react'
import NextNProgress from 'nextjs-progressbar';
import { Router } from 'next/router';
import NProgress from 'nprogress';

// @import 'node_modules/nprogress/nprogress.css';

const ProgessBar: FC = ({ }) => {
    // const [Loading, setLoading] = useState<Boolean>(false)
    // Router.events.on("routeChangeStart", (url) => {
    //     console.log('started')
    //     setLoading(true);
    // })
    // Router.events.on("routeChangeComplete", (url) => {
    //     console.log('ended')
    //     setLoading(false);
    // })


    return (
        <NextNProgress />
    )

}

export default ProgessBar