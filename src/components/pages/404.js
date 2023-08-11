import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
const Page404 = () => {
    return(
        <>
            <ErrorMessage/>
            <p style={{'text-align': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>This page is now available</p>
            <Link to="/" style={{'display': 'block', 'text-align': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}}>Back to home page</Link>
        </>
    )
}

export default Page404