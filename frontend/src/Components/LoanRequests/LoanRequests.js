import React,{useState,useEffect} from 'react';
import axios from 'axios';
import style from './LoanRequests.module.css';
import Card from './Card';
import { useSnackbar } from 'notistack';

const LoanRequests = () => {

  const [dataArr, setDataArr] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
    useEffect(()=>{
      Promise.resolve(
        axios.get(
          "https://apis.opdevelopers.live/api/getloans"
        )
      ).then((res) => {
          console.log(res)
          setDataArr(res.data.loans)
        })
        .catch((error) => {
          console.log(error.response.data.message);
          enqueueSnackbar("Some error occured. Please try again later", {
            variant: 'error',
          });
        })   
    },[])
  return (
    <>
      <div className={style.container}>
        {(dataArr==null) ? <h2 className={style.heading}>Currently there is no loan requests!</h2>:
        dataArr.map((currentData)=>{
          return <Card key={currentData.amount+currentData.tenure+currentData.rate+Math.random()} data={currentData}/>
        })}
        
      </div>
    </>
  );
}

export default LoanRequests;