import React from 'react'
import './HelloPage.css'
import HelloPageCanvas from '../ModelView/HelloPageCanvas';
import StarCanvas from '../ModelView/StarCanvas';
import { motion } from 'framer-motion';
import HelloPageSideView from '../ModelView/HelloPageSideView';
import DiscardClothes from './DiscardClothes';
function HelloPage() {
 
    return (
      <div className="relative min-h-[200vh] bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 overflow-hidden"> 
      <div className="hello-page-container relative min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 overflow-hidden">
        <div
      // Animation duration
       className='hello-page-Text'>
      <HelloPageSideView/>
        </div>

        <div className='hello-page-Canvas'>
        <HelloPageCanvas/>
        </div>
        
      </div>
      <DiscardClothes/>
      </div>
    )
 
}

export default HelloPage
