import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import Skeleton from "../skeleton/Skeleton";

const setContent = (process, Component, data) => {
    switch(process){
        case 'waiting':
            return <Skeleton/>
        case 'error':
            return <ErrorMessage/>
        case 'loading': 
            return <Loader/>
        case 'confirmed':
            return <Component data={data}/>
        default: 
            throw new Error('Unexpected process state')
    }
}

export default setContent