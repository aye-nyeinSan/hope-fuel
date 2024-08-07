import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import React,{useState} from 'react'
import { generateClient } from 'aws-amplify/api';
import { listApps } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
const client = generateClient();

import CheckPayment from './CheckPayment';

const OpenCloseForm = ({status}) => {
   const [checkStatus, setCheckStatus] = useState(status === "enable" ? 1 : 0);
  async function handleOnClick(event)
  {
    let checked = event.target.checked;
    const newStatus = checked ? 1 : 0; //true = 1, false = 0
     setCheckStatus(newStatus);
  }
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={checkStatus === 1} onChange={handleOnClick} />
          }
          label="Form Open/Close"
        />
        <CheckPayment checkStatus={checkStatus} />
      </FormGroup>
    </>
  );
}

export default OpenCloseForm