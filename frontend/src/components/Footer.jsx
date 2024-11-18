import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
import { Container } from '@mui/material';

function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-primary mt-12 p-8">
        <Container>
        <h2 className="text-white text-center">SheMatters</h2>
        <p className="text-white text-center">© 2023 SheMatters. All rights reserved.</p>
        <div>
            <ul className="flex justify-center space-x-4">
                <li><a href="#" className="text-white hover:text-primaryHover transition duration-300 ease-in-out">About</a></li>
                <li><a href="#" className="text-white hover:text-primaryHover transition duration-300 ease-in-out">Contact</a></li>
                <li><a href="#" className="text-white hover:text-primaryHover transition duration-300 ease-in-out">Terms & Conditions</a></li>
                <li><a href="#" className="text-white hover:text-primaryHover transition duration-300 ease-in-out">Privacy Policy</a></li>
                <li><a href="#" className="text-white hover:text-primaryHover transition duration-300 ease-in-out">FAQ</a></li>
            </ul>
        </div>
        <div>
            <ul className="flex justify-center space-x-4">
                <li><a href="#" className="text-white hover:text-primaryHover transition duration-300 ease-in-out"><i class="fa-brands fa-facebook"></i></a></li>
                <li><a href="#" className="text-white hover:text-primaryHover transition duration-300 ease-in-out"><i class="fa-brands fa-instagram"></i></a></li>
                <li><a href="#" className="text-white hover:text-primaryHover transition duration-300 ease-in-out"><i class="fa-brands fa-twitter"></i></a></li>
            </ul>
        </div>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default Footer