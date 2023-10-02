import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Image from "next/image";
import wrapper, {AppDispatch, AppState} from "../store/store";
import { setName, someThunk } from '../store/reducer';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { GetServerSideProps } from 'next'
import {useRouter} from "next/router";

// export const getStaticProps = async () => {
//   // https://jsonplaceholder.typicode.com/users
//   const response = await fetch(`${process.env.API}/hello`)
//   const data = await response.json()
//   return {props: {data}}
// }

export const getServerSideProps : GetServerSideProps = wrapper.getServerSideProps((store: any) => async () => {
  try{
    await store.dispatch(setName('testDISPATCHED'))
  }
  catch{

  }
  return {
    props: {
    }
  }
})


const Index = ({store}: any) => {
  const name = useSelector((state : AppState) => state.tests.test)
  const data = useSelector((state : AppState) => state.tests.data)
  console.log(data)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const changeState = () => {
    dispatch(setName('vchanged'))
  }
  console.log(process.env.NODE_ENV)

  return router.isFallback ? <div>loading...</div> : <><div className={styles.main}>Index</div>
    <Link href={'/test'}>
      <button>test</button>
    </Link>
    <Image src={'/exploid.png'} alt={''} width={100} height={100} priority={true}/>
    {[1,2,3].map((i,idx) => <Link href={`/users/${i}`} key={idx}>hi ${i}</Link>)}
    <button onClick={changeState}>change</button>
    <h2>{name}</h2>
    <button onClick={() => dispatch(someThunk())}>run thunk</button>
    <p>
      {JSON.stringify(data)}
    </p>
    </>
}



export default Index
