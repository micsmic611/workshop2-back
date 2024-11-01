import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Drawer, AppBar, Toolbar, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function EmployeePage() {
  return <div>ข้อมูลพนักงาน</div>;
}

export default EmployeePage;
