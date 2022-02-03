/*import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    backgroundColor: transparent,
    border: none,
    outline: none,
    cursor: pointer,
  },
  on: {
    color: black,
  },
  off: {
    color: gray,
  },
}));*/


import styled from 'styled-components';
  
export const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 5vh;
   font-size: 20px;
`
export const Radio = styled.input`
   display: none;
`
export const Rating = styled.div`
   cursor: pointer;
`
