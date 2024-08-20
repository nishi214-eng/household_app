import { useState, useEffect }  from 'react';
import { db } from '../../firebase';
import CommonDialog from '../CommonDialog';
import DateSelector from '../DateSelector'
import { doc, getDocs, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { Button, TextField, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles
} from '@material-ui/core'
import 'react-tabs/style/react-tabs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
