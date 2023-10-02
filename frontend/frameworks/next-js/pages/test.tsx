import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from "next/router";

const Test = () => {
    const router = useRouter()
    return <div>
        <Head>
            <title>testTOTTOTO</title>
        </Head>
        test
        <button onClick={() => router.push('/',undefined,{shallow: true})}>to_main</button>
    </div>
}


export default Test
