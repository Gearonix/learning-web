

export const getServerSideProps = (context : any) => {
    return {
        props : {
            test : context.query
        }
    }

}






const User = (props : any) => {
    console.log(props)
}



export default User
